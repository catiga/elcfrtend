<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-card-title class="text-h3">拓扑重构方案图</v-card-title>
                <!-- <v-card-text> -->
                    <canvas id="canvas" height="300" width="300"></canvas>
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
            window.requestAnimationFrame(this.draw);
        },
        draw() {
            console.log('这里执行了')
            var ctx = document.getElementById('canvas').getContext('2d');
            ctx.globalCompositeOperation = 'destination-over';
            ctx.clearRect(0,0,300,300); // clear canvas

            // 圆圈 01 + 文字
            ctx.beginPath();
            ctx.lineWidth = 6
            ctx.strokeStyle = 'white';
            ctx.arc(40, 40, 20, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.font = "12px serif"; // 字体大小
            ctx.fillStyle = '#ffffff';
            ctx.fillText("我是圆圈01", 14, 80);

            // 圆圈 02 + 文字
            ctx.beginPath();
            ctx.lineWidth = 6
            ctx.strokeStyle = 'white';
            ctx.arc(240, 40, 20, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.font = "12px serif"; // 字体大小
            ctx.fillStyle = '#ffffff';
            ctx.fillText("我是圆圈02", 214, 80);

            // 圆圈 03 + 文字
            ctx.beginPath();
            ctx.lineWidth = 6
            ctx.strokeStyle = 'white';
            ctx.arc(240, 240, 20, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.font = "12px serif"; // 字体大小
            ctx.fillStyle = '#ffffff';
            ctx.fillText("我是圆圈03", 214, 280);

            // 连接线 1-2
            ctx.beginPath();
            ctx.lineWidth = 3
            ctx.moveTo(60, 40);
            ctx.lineTo(220, 40);
            ctx.closePath();
            ctx.strokeStyle = "white";
            ctx.stroke();

            // 连接线 1-3
            ctx.beginPath();
            ctx.lineWidth = 3
            ctx.moveTo(60, 40);
            ctx.lineTo(220, 230);
            ctx.closePath();
            ctx.strokeStyle = "white";
            ctx.stroke();
            window.requestAnimationFrame(this.draw);
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
