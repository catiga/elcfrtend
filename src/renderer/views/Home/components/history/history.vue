<template>
    <v-layout class="mt-3">
        <v-flex d-flex class="pa-0">
            <v-card
            >
                <v-sheet
                        class="v-sheet--offset mx-auto pa-2"
                        color="orange"
                        elevation="12"
                        max-width="calc(100% - 32px)"
                >
                    <h1>最近工程</h1>
                    <span>最近操作的工程列表</span>
                </v-sheet>
                <v-card-text class="pt-0 title font-weight-bold">
                    <v-data-table
                            hide-actions
                            :headers="headers"
                            :items="desserts"
                    >
                        <template v-slot:items="props">
                            <td>{{ props.item.title }}</td>
                            <td>{{ props.item.info }}</td>
                            <td>{{ props.item.a_time | formateTime }}</td>
                            <td>
                                <v-btn v-if="props.item.is_import==1" fab small color="error" @click="openItem(props.item)">打开</v-btn>
                            </td>
                        </template>
                    </v-data-table>
                    <v-btn
                            block
                            class="mt-3"
                            depressed
                            round
                            @click="loadMore"
                            :disabled="noMoreData"
                    >
                        load more
                    </v-btn>
                </v-card-text>
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
        getModelPagination
    } from '../../../../../api/projectMgr'
    import moment from 'moment'
    import {remote} from 'electron'

    export default {
        filters: {
            formateTime: function(oldvalue) {
                return moment(oldvalue).format('YYYY-MM-DD HH:mm')
            }
        },
        name: "list",
        data() {
            return {
                headers: [
                    {text: '工程名称', sortable: false, value: 'assetsName'},
                    {text: '工程说明', sortable: false, value: 'categoryName'},
                    {text: '创建时间', sortable: false, value: 'amountOfMoney'},
                    {text: '操作', value: 'id', align: 'right', sortable: false}
                ],
                pagination: {
                    sortBy: 'a_time',
                    descending: true,
                    page: 1,
                    rowsPerPage: 10
                },
                desserts: [],
                assetsList: [],
                categoryList: [],
                totalDesserts: 0,
                noMoreData: false,

                snackbar: false,
                snackbarMsg: '',
                submitResult: false
            }
        },
        mounted() {
            this.initialize()
        },
        methods: {
            initialize() {
                getModelPagination(this.pagination).then(result => {
                    if (result.code === 200) {
                        let items = result.data.list
                        const total = result.data.total

                        // setTimeout(() => {
                        this.loading = false
                        this.desserts = items
                        this.totalDesserts = total
                        // }, 1000)
                    } else {
                        this.loading = false
                        this.showNoData = true
                        this.noDataMessage = result.message
                    }
                }).catch(err => {
                    this.loading = false
                    this.showNoData = true
                    this.noDataMessage = err.message
                })
            },
            loadMore() {
                this.pagination.page += 1
                this.initialize()
            },
            openItem(item) {
                if (item.is_import === 0) {
                    this.snackbar = true
                    this.snackbarMsg = '请先导入工程数据'
                    return
                }
                remote.getGlobal('sharedObject').openedProject = item
                this.snackbar = true
                this.snackbarMsg = '操作成功'
                this.submitResult = true
            },
        }
    }
</script>

<style scoped>
    .v-sheet--offset {
        top: -15px;
        position: relative;
    }
</style>
