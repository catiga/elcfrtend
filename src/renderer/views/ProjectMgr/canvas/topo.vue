<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-card-title class="text-h3">拓扑重构方案图</v-card-title>
                <!-- <v-card-text> -->
                    <canvas id="canvas" style="border: 1px solid #ffffff;display:block;margin:0 auto;" width="1000" height="600"></canvas>
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
    saveOverhaulTask,
    loadTopoMethod
} from '../../../../api/compute_overhaul'

import {
    loadProjectParams,
    saveProjectParams,
    loadVolItems,
    loadBusItems
} from '../../../../api/work/manager'

import {
    getTopoDataByTask,
    loadComputeResult
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

            overhaul_id: 0,

            centerPoint: {},
            aroundPoints: []
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
        this.overhaul_id = this.$route.query.overhaul_id
        loadProjectParams(currentProject).then(result => {
            console.log('获取到的检修决策中心节点数据', result)
            if(result.code==200) {
                this.centerPoint = {data:result.data[0], x:500, y:300}
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
        console.log('检修方案id', this.$route.query.overhaul_id)
    },
    methods: {
        init(){
            getTopoDataByTask(this.overhaul_id).then(result => {
                if(result.code!=200) {
                    this.submitResult = false
                    // 显示结果
                    this.snackbar = true
                    this.snackbarMsg = result.message
                } else {
                    console.log('获取到的拓扑数据', result)
                    // this.aroundPoints
                    let node_list = result.data[0].node_list
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
                            this.aroundPoints.push({node_name: node_name, num: 1})
                        }
                    }
                    this.draw()
                }
            }).catch(err => {

            })
        },
        computePos(i, len, height, interval) {
            let div = len / 2
            let centerX = this.centerPoint.x
            let centerY = this.centerPoint.y
            return [500 - (div - i) * interval, height]
        },
        draw() {
            console.log('this.aroundPoints', this.aroundPoints)
            var ctx = document.getElementById('canvas').getContext('2d');
            ctx.globalCompositeOperation = 'destination-over';
            ctx.clearRect(0,0,300,300); // clear canvas
            console.log('this.centerPoint', this.centerPoint)
            //画检修场站中心圆点
            this.drawCircle(ctx, this.centerPoint.x, this.centerPoint.y, 20, this.centerPoint.data.station_name)

            // 这里把所有场站分成上下两行的数组，数组里面是名字，坐标的对象
            let upArray = [], downArray = []
            let odd = this.aroundPoints.length%2
            let div = parseInt(this.aroundPoints.length/2)
            console.log('div===', div)
            let index = 0
            for(let i=0; i<div; i++) {
                let xy = this.computePos(i, div, 160, 150)
                upArray.push({data:this.aroundPoints[i], x:xy[0], y:xy[1]})
            }
            for(let i=div; i<this.aroundPoints.length; i++) {
                let xy = this.computePos(Math.abs(div - i), div, 440, 150)
                downArray.push({data:this.aroundPoints[i], x:xy[0], y:xy[1]})
            }
            console.log('upArray', upArray)
            console.log('downArray', downArray)

            for(let x in upArray) {
                let num = upArray[x].data.num
                this.drawCircle(ctx, upArray[x].x, upArray[x].y, 20, upArray[x].data.node_name + ':' + num)
                let totalWidth = (num - 1) * 8
                for(let i=0; i<num; i++) {
                    let offset = i*8 - totalWidth
                    this.drawLine(ctx, upArray[x].x + offset, upArray[x].y, this.centerPoint.x + offset, this.centerPoint.y)        
                }
            }
            for(let x in downArray) {
                let num = downArray[x].data.num
                this.drawCircle(ctx, downArray[x].x, downArray[x].y, 20, downArray[x].data.node_name + ':' + num)
                let totalWidth = (num - 1) * 8
                for(let i=0; i<num; i++) {
                    let offset = i*8 - totalWidth
                    this.drawLine(ctx, downArray[x].x + offset, downArray[x].y, this.centerPoint.x + offset, this.centerPoint.y)        
                }
            }

            
            // 圆
            // this.drawCircle(ctx, 40, 40, 20, '圆圈01')
            // this.drawCircle(ctx, 240, 140, 20, '圆圈02')
            // this.drawCircle(ctx, 240, 240, 20, '圆圈03')
            // this.drawCircle(ctx, 40, 240, 20, '圆圈04')

            // 线
            // this.drawLine(ctx, 40, 40, 240, 140)
            // this.drawLine(ctx, 40, 40, 240, 240, true)
            // this.drawLine(ctx, 240, 140, 40, 240, true)

            
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
        drawLine(ctx, x1, y1, x2, y2, danshed) {
            ctx.beginPath();
            ctx.lineWidth = 1
            if (!danshed) { 
                ctx.setLineDash([0, 0]);
            } else {// 如果是虚线
                ctx.setLineDash([5, 5]);
            }
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = "white";
            ctx.stroke();
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
