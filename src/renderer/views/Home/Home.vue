<template>
    <v-layout row wrap>
        <v-flex d-flex sm12>
            <v-layout row wrap>
                <v-flex >
                    <v-layout row wrap>
                        <v-flex d-flex
                                xs12>
                            <StatsIcon></StatsIcon>
                        </v-flex>
                        <v-flex d-flex
                                xs12>
                            <History></History>
                        </v-flex>

                        <!--
                        <v-flex d-flex
                                xs12>
                            <v-card>
                                <v-card-title class="pb-0">
                                    <span class="title font-weight-light">当月统计</span>
                                </v-card-title>
                                <v-card-text class="pt-0">
                                    <StatsCurve></StatsCurve>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        -->
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>
        <!--
        <v-flex d-flex sm5>
            <v-card>
                <v-card-title class="pb-0">
                    <span class="title font-weight-light">提醒</span>
                </v-card-title>
                <v-card-text>
                    <Todo></Todo>
                </v-card-text>
            </v-card>
        </v-flex>
        -->
    </v-layout>
</template>

<script>

    import StatsIcon from './components/statsIcon/statsIcon'
    import Todo from './components/todo/todo'
    import History from './components/history/history'
    import StatsCurve from './components/statsCurve/statsCurve'

    export default {
        components: {
            StatsIcon,
            StatsCurve,
            Todo,
            History
        },
        data: () => ({
            dialogAdd: false
        }),
        mounted() {
            this.$http.post(`http://127.0.0.1:8081/index`, {
                headers: {}
            }).catch(function(error) {
                        console.log('输出报错', error)
                    }).then(function(response) {
                        console.log(response)
                    })
        },
        methods:{

        }
    }
</script>

<style>

</style>
