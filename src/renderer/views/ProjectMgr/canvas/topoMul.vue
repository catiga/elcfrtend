<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-card-title class="text-h3">拓扑重构方案图</v-card-title>
                <!-- <v-card-text> -->
                    <canvas id="canvas" style="border: 1px solid #ffffff;display:block;margin:80px auto;" width="1200" height="700"></canvas>
                <!-- </v-card-text> -->
            </v-card>
        </v-flex>
        <v-snackbar
                v-model="snackbar"
                right
                top
                :color="submitResult ? 'success' : 'error'"
        >
            {{ snackbarMsg}}
            <v-btn
                    flat
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-layout>
</template>

<script>
import {
    loadProjectParams,
    saveProjectParams,
    loadVolItems,
    loadBusItems
} from '../../../../api/work/manager'

import {
    loadComputeResult,
    getTopoResultByOverhaulId,
    getTopoResultByTaskId
} from '../../../../api/compute_overhaul'

import { remote } from 'electron'
export default {
    data() {
        return {
            // 操作提示
            snackbar: false,
            snackbarMsg: '',
            submitResult: false,

            sun:new Image(),
            moon:new Image(),
            earth:new Image(),

            topoTask: 0,
            selectCaseOutput: 0,
            topoResult: 0,

            centerPoint: {},
            aroundPoints: [],
            pointsWithPos: []
        }
    },
    watch: {
        submitResult: {
            handler(val) {
                if (val) {
                    this.snackbarMsg = this.snackbarMsg ? this.snackbarMsg : '操作成功'
                } else {
                    this.snackbarMsg = this.snackbarMsg ? this.snackbarMsg : '操作失败'
                }
            }
        },
        snackbar: {
            handler(val) {
                if (!val) {
                    // 重置结果显示相关
                    this.submitResult = false
                    this.snackbarMsg = ''
                }
            }
        }
    },
    mounted() {
        let currentProject = remote.getGlobal('sharedObject').openedProject
        if (!currentProject) {
            this.snackbar = true
            this.snackbarMsg = '请先选择打开工程'
            this.loading = false
            return
        }
        console.log(this.$route)
        this.topoTask = this.$route.params.task
        this.selectCaseOutput = this.$route.params.caseOutput.name
        loadProjectParams(currentProject).then(result => {
            console.log('获取到的检修决策中心节点数据', result)
            if(result.code==200) {
                this.centerPoint = {data:result.data[0], x:600, y:350}
            }
            if(this.centerPoint) {
                this.init()
            } else {
                this.submitResult = false
                // 显示结果
                this.snackbar = true
                this.snackbarMsg = '请先定义检修作业'
            }
        }).catch(err => {

        })
    },
    methods: {
        init(){
            // this.aroundPoints
            let node_list = this.topoTask.node_list
            node_list = node_list ? node_list.split(";") : []
            for(let x in node_list) {
                let node_name = node_list[x].split(',')[1]
                //增加替重逻辑，同时增加数量
                let need_append = true
                for(let y in this.aroundPoints) {
                    let eq_node_name = this.aroundPoints[y].node_name
                    if(eq_node_name == node_name) {
                        this.aroundPoints[y].num++
                        need_append = false
                        break
                    }
                }
                if(need_append) {
                    this.aroundPoints.push({node_name: node_name, num: 1, type:1})
                }
            }
            getTopoResultByTaskId(this.topoTask.id).then(topodata => {
                if(topodata.code==200) {
                    this.topoResult = topodata.data[0]
                    let interrup_nodes_counterbusname = topodata.data[0]['interrup_nodes_counterbusname']
                    if(interrup_nodes_counterbusname) {
                        interrup_nodes_counterbusname = interrup_nodes_counterbusname.split(',')
                        for(let x in this.aroundPoints) {
                            let tmp = this.aroundPoints[x]
                            for(let y in interrup_nodes_counterbusname) {
                                if(tmp.node_name==interrup_nodes_counterbusname[y]) {
                                    console.log('这里重新设置了节点')
                                    tmp.type = 0
                                }
                            }
                        }
                        console.log(this.aroundPoints)
                    }
                }
                this.draw()
            }).catch(err=> {
                //直接画
                this.draw()
            })
        },
        computePos(i, len, height, interval) {
            let div = len / 2
            let centerX = this.centerPoint.x
            let centerY = this.centerPoint.y
            return [600 - (div - i) * interval, height]
        },
        draw() {
            var ctx = document.getElementById('canvas').getContext('2d');
            ctx.globalCompositeOperation = 'destination-over';
            ctx.clearRect(0,0,300,300); // clear canvas
            //画检修场站中心圆点
            this.drawCircle(ctx, this.centerPoint.x, this.centerPoint.y, 20, this.centerPoint.data.station_name)

            // 这里把所有场站分成上下两行的数组，数组里面是名字，坐标的对象
            let upArray = [], downArray = []
            let div = parseInt(this.aroundPoints.length/2)
            for(let i=0; i<div; i++) {
                let xy = this.computePos(i, div, 160, 200)
                upArray.push({data:this.aroundPoints[i], x:xy[0], y:xy[1]})
            }
            for(let i=div; i<this.aroundPoints.length; i++) {
                let xy = this.computePos(Math.abs(div - i), div, 540, 200)
                downArray.push({data:this.aroundPoints[i], x:xy[0], y:xy[1]})
            }
            this.pointsWithPos.push(...upArray)
            this.pointsWithPos.push(...downArray)
            for(let x in upArray) {
                let num = upArray[x].data.num
                this.drawCircle(ctx, upArray[x].x, upArray[x].y, 20, upArray[x].data.node_name + ':' + num)
                let totalWidth = (num - 1) * 8
                for(let i=0; i<num; i++) {
                    let offset = i*8 - totalWidth
                    if(upArray[x].data.type==1) {
                        this.drawLine(ctx, upArray[x].x + offset, upArray[x].y, this.centerPoint.x + offset, this.centerPoint.y)
                    } else {
                        this.drawLine(ctx, upArray[x].x + offset, upArray[x].y, this.centerPoint.x + offset, this.centerPoint.y, true)
                    }
                }
            }
            for(let x in downArray) {
                let num = downArray[x].data.num
                this.drawCircle(ctx, downArray[x].x, downArray[x].y, 20, downArray[x].data.node_name + ':' + num)
                let totalWidth = (num - 1) * 8
                for(let i=0; i<num; i++) {
                    let offset = i*8 - totalWidth
                    if(downArray[x].data.type==1) {
                        this.drawLine(ctx, downArray[x].x + offset, downArray[x].y, this.centerPoint.x + offset, this.centerPoint.y)
                    } else {
                        this.drawLine(ctx, downArray[x].x + offset, downArray[x].y, this.centerPoint.x + offset, this.centerPoint.y, true)
                    }
                    
                }
            }
            this.getBestOutput().then(bestArray => {
                console.log('找到了对应的方案红线数据对', bestArray)
                for(let x in bestArray) {
                    let p = bestArray[x]
                    console.log('x.p0==', p.p0)
                    console.log('x.p1==', p.p1)
                    this.drawLine(ctx, p.p0.x, p.p0.y, p.p1.x, p.p1.y, false, "red")
                }
            })
        },
        /**
         * 绘制圆圈
         * @param {ctx} 绘制上下文
         * @param {x} 圆 x 坐标
         * @param {y} 圆 y 坐标
         * @param {r} 圆半径
         * @param {text} 圆对应的文案
         */
        drawCircle(ctx, x, y, r, text) {
            // 外圈
            ctx.beginPath();
            ctx.setLineDash([0, 0]);
            ctx.lineWidth = 2
            ctx.strokeStyle = 'white';
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.font = "12px serif"; // 字体大小
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = "center";
            ctx.fillText(text, x,  y + r + 20);

            // 中间圆 (遮住圆心连线露出来的白线)
            ctx.beginPath();
            ctx.lineWidth = Math.ceil(r/3)
            ctx.strokeStyle = '#424242';
            ctx.arc(x, y, r - 2 , 0, 2 * Math.PI);
            ctx.stroke();

            // 内圈
            ctx.beginPath();
            ctx.lineWidth = 2
            ctx.strokeStyle = 'white';
            ctx.arc(x, y, r - Math.floor(r/3) , 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = '#424242';
            ctx.fill()
        },

        /**
         * 绘制线
         * @param {ctx} 绘制上下文
         * @param {x1} 圆1 x1 坐标
         * @param {y1} 圆1 y1 坐标
         * @param {x2} 圆2 x2 坐标
         * @param {y2} 圆2 y2 坐标
         */
        drawLine(ctx, x1, y1, x2, y2, danshed = false, color="white") {
            if(color=='red') {
                console.log(x1, y1, x2, y2, '需要画红线的坐标')
            }
            ctx.beginPath();
            ctx.lineWidth = 1
            if (!danshed) { 
                ctx.setLineDash([0, 0]);
            } else {// 如果是虚线
                ctx.setLineDash([5, 5]);
            }
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = color;
            ctx.stroke();
        },
        getBestOutput() {
            return new Promise((resolve, reject) => {
                let allOutput = this.topoResult.case_output
                allOutput = allOutput.split('|')
                let outputHead = allOutput[0].split(';')[0].split(',')
                let index = -1
                for(let x in outputHead) {
                    if(outputHead[x]==this.selectCaseOutput) {
                        index = x
                        break
                    }
                }
                console.log('索引数字', index, allOutput)
                let bestArray = []
                for(let i=1; i<allOutput.length; i++) {
                    let tmpS = allOutput[i].split(';')
                    let node1 = tmpS[0].split(',')[index]
                    let node2 = tmpS[1].split(',')[index]

                    let p0, p1
                    for(let x in this.pointsWithPos) {
                        if(this.pointsWithPos[x].data.node_name==node1) {
                            p0 = this.pointsWithPos[x]
                        } else if(this.pointsWithPos[x].data.node_name==node2) {
                            p1 = this.pointsWithPos[x]
                        }
                    }
                    bestArray.push({p0:p0, p1:p1})
                }
                resolve(bestArray)
            }).catch(err => {
            })
        }
    }
}
</script>
<style type="text/css" lang="scss" scoped>
.work-form {
    width: 1200px;
    height: 900px;
    margin: 20px auto 40px;
}
.row-flex {
    display: flex;
    align-items: center;
}
.row-flex-start {
    align-items: flex-start;
}
.text-h3 {
    font-size: 16px;
    font-weight: bold;
}
.multiple-select {
    width: 240px;
    height: 200px;
    outline: none;
    border: 1px solid #666;
}
.multiple-center {
    width: 100px;
}
.label-title {
    font-size: 20px;
    color: hsla(0,0%,100%,0.7);
    margin: 12px 0 0 0;
}
.flex.sm6 {
    max-width: 100% !important;
}
</style>
