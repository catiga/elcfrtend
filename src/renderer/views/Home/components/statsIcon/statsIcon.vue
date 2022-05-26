<template>
    <v-layout class="mt-3">
        <v-flex :key="key" v-for="(item, key) in stats">
            <v-card
            >
                <v-sheet
                        class="v-sheet--offset"
                        :color="item.color"
                        elevation="12"
                        width="80"
                        height="80"

                >
                    <v-layout fill-height>
                        <v-flex d-flex align-center text-xs-center>
                            <v-icon x-large color="white">{{item.icon}}</v-icon>
                        </v-flex>
                    </v-layout>
                </v-sheet>
                <span class="money font-weight-bolod display-1">{{item.value}}</span>
                <v-card-text class="pt-0 title font-weight-bold">
                    {{item.text}}
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>

</template>

<script>
    import {
        countForStat
    } from '../../../../../api/projectMgr'
    export default {
        name: "statsIcon",
        data: () => ({
            stats: [
                {
                    id: 'total_project_num',
                    icon: 'equalizer',
                    value: '0',
                    text: '工程总量',
                    color: 'black'
                },
                {
                    icon: 'equalizer',
                    value: '0',
                    text: '作业总量',
                    color: 'black'
                },
                {
                    icon: 'equalizer',
                    value: '0',
                    text: '计算中任务',
                    color: 'orange'
                }
            ]
        }),
        mounted() {
            countForStat().then(result => {
                console.log('result===', result)
                if (result.code === 200) {
                    this.stats[0].value = result.data.t_num
                    this.stats[2].value = result.data.rp_num
                }
            }).catch(err => {

            })
        },
    }
</script>

<style scoped>
    .v-sheet--offset {
        top: -15px;
        left: 15px;
    }

    .money {
        position: absolute;
        top: 0;
        right: 0;
        padding: 15px;
    }
</style>
