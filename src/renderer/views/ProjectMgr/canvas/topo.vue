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

import { remote } from 'electron'
export default {
    data() {
        return {
            sun:new Image(),
            moon:new Image(),
            earth:new Image()
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
        loadProjectParams(currentProject).then(result => {
            console.log('获取到的检修决策中心节点数据', result)
        }).catch(err => {

        })
        console.log('检修方案id', this.$route.query.overhaul_id)

        // const canvas = document.getElementById('canvas');
        // const ctx = canvas.getContext('2d');

        // ctx.beginPath();
        // ctx.arc(100,75,50,0,2*Math.PI);
        // ctx.stroke();

        // ctx.fillStyle = 'green';
        // ctx.fillRect(10, 10, 150, 100);
        this.init()
    },
    methods: {
        init(){
            this.draw()
            // window.requestAnimationFrame();
        },
        draw() {
            console.log('这里执行了')
            var ctx = document.getElementById('canvas').getContext('2d');
            ctx.globalCompositeOperation = 'destination-over';
            ctx.clearRect(0,0,300,300); // clear canvas

            // 圆
            this.drawCircle(ctx, 40, 40, 20, '圆圈01')
            this.drawCircle(ctx, 240, 140, 20, '圆圈02')
            this.drawCircle(ctx, 240, 240, 20, '圆圈03')
            this.drawCircle(ctx, 40, 240, 20, '圆圈04')

            // 线
            this.drawLine(ctx, 40, 40, 240, 140)
            this.drawLine(ctx, 40, 40, 240, 240, true)
            this.drawLine(ctx, 240, 140, 40, 240, true)

            
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
            ctx.lineWidth = 3
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
