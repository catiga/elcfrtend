<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-card-title class="text-h3">拓扑重构方案图</v-card-title>
                <v-card-text>
                    <canvas id="canvas" class="work-form" style="border: 25px solid rgba(0, 0, 0, 0);"></canvas>
                </v-card-text>
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
            console.log('这里初始化了')
            this.sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
            console.log('这里初始化了1')
            this.moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
            console.log('这里初始化了2')
            this.earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
            window.requestAnimationFrame(this.draw);
        },
        draw() {
            console.log('这里执行了')
            var ctx = document.getElementById('canvas').getContext('2d');
            ctx.globalCompositeOperation = 'destination-over';
            ctx.clearRect(0,0,300,300); // clear canvas
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.strokeStyle = 'rgba(0,153,255,0.4)';
            ctx.save();
            ctx.translate(150,150);
            // Earth
            var time = new Date();
            ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
            ctx.translate(105,0);
            ctx.fillRect(0,-12,50,24); // Shadow
            ctx.drawImage(this.earth,-12,-12);
            // Moon
            ctx.save();
            ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
            ctx.translate(0,28.5);
            ctx.drawImage(this.moon,-3.5,-3.5);
            ctx.restore();
            ctx.restore();
            ctx.beginPath();
            ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
            ctx.stroke();
            ctx.drawImage(this.sun,0,0,300,300);
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
