<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-card-title class="text-h3">拓扑重构方案图</v-card-title>
                <canvas id="canvas"></canvas>
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
            console.log('获取到的检修决策数据', result)
        }).catch(err => {

        })
        console.log('检修方案id', this.$route.query.overhaul_id)

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'green';
        ctx.fillRect(10, 10, 150, 100);
    },
    methods: {
        
    }
}
</script>
<style type="text/css" lang="scss" scoped>
.work-form {
    width: 600px;
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
