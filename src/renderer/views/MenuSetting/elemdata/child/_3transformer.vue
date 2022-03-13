<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-card-title>
                    <v-menu
                            single-line
                            v-model="menuTimeStart"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    style="width: 50px;margin-left: 15px;"
                                    v-model="search.ps_name"
                                    label="并联电容电抗w名称"
                                    single-line
                                    hide-details
                                    v-on="on"
                                    clearable
                            ></v-text-field>
                        </template>
                    </v-menu>
                    <v-spacer></v-spacer>
                    <v-btn color="success" dark class="mb-2" @click="initialize">搜索</v-btn>
                    <v-btn :loading="importing" :disabled="importing" color="error" @click="saveTable">保存</v-btn>
                </v-card-title>
                <v-card-text class="pt-0 title font-weight-bold">
                    <v-data-table
                            v-model="selected"
                            :headers="headers"
                            :items="desserts"
                            :total-items="totalDesserts"
                            :pagination.sync="pagination"
                            :loading="loading"
                            select-all
                            item-key="id"
                            class="elevation-1"
                    >
                        <template v-slot:headers="props">
                            <tr>
                                <th
                                        v-for="(header, index) in props.headers"
                                        :key="header.text"
                                        :class="['column sortable',
                                            pagination.descending ? 'desc' : 'asc',
                                            header.value === pagination.sortBy ? 'active' : '',
                                            index === props.headers.length -1 ? 'text-xs-right' : 'text-xs-left'
                                            ]"
                                        @click="header.sortable && changeSort(header.value)"
                                >
                                    <v-icon small v-if="header.sortable">arrow_upward</v-icon>
                                    {{ header.text }}
                                </th>
                            </tr>
                        </template>
                        <template v-slot:items="props">
                            <tr :active="props.selected" @click="props.selected = !props.selected">
                                <td>
                                    <v-text-field
                                    v-model="props.item.ps_name"
                                    single-line
                                    hide-details
                                    @blur="saveValue(props.item)"
                                    ></v-text-field>
                                </td>
                                <td>
                                    <v-text-field
                                    v-model="props.item.stat_type"
                                    single-line
                                    hide-details
                                    @blur="saveValue(props.item)"
                                    ></v-text-field>
                                </td>
                                <td>
                                    <v-text-field
                                    v-model="props.item.zone_no"
                                    single-line
                                    hide-details
                                    @blur="saveValue(props.item)"
                                    ></v-text-field>
                                </td>
                                <td width="50">
                                    <v-checkbox
                                            :input-value="props.selected"
                                            primary
                                            hide-details
                                    ></v-checkbox>
                                </td>
                            </tr>
                        </template>
                        <template v-slot:no-data>
                            <v-alert :value="showNoData" color="error" icon="warning">
                                {{noDataMessage ? noDataMessage : 'Sorry, nothing to display here :('}}
                            </v-alert>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-flex>
        
        <v-dialog v-model="dialogDelete" max-width="290">
            <v-card>
                <v-card-title class="headline">提示：</v-card-title>
                <v-card-text>确定删除工程吗?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="closeDialogDelete">取消</v-btn>
                    <v-btn color="blue darken-1" flat @click="saveDelete">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
    import { getModelPagination, saveStatData } from '../../../../../api/station/moline'
    import Excel from 'exceljs'
    
    import moment from 'moment'
    import fs from 'fs-extra'

    const electron = require('electron');
    const remote = electron.remote;

    export default {
        filters: {
            formateTime: function(oldvalue) {
                return moment(oldvalue).format('YYYY-MM-DD HH:mm')
            }
        },
        data() {
            return {
                // 表格相关
                loading: true,
                showNoData: false,
                totalDesserts: 0,
                desserts: [],
                headers: [
                    {text: '并联电容电抗w名称', value: 'ps_name', align: 'left', sortable: true},
                    {text: '并联电容电抗w类型', value: 'stat_type', align: 'left', sortable: true},
                    {text: '区域编号', value: 'zone_no', align: 'left', sortable: true},
                    {text: '有效位', value: 'id', align: 'right', sortable: false},
                ],
                noDataMessage: '',
                search: {
                    ps_name: ''
                },
                pagination: {
                    sortBy: 'a_time'
                },
                selected: [],
                dialogDeleteBatch: false,
                exporting: false,
                importing: false,
                menuTimeStart: false,
                menuTimeEnd: false,
                // 表单相关
                menuTime: false,
                dialogDelete: false,
                dialogEdit: false,
                valid: true,
                submitResult: false,
                editedIndex: -1,

                editedItem: {
                    // categoryId: '',
                    // type: '',
                    // assetsId: '',
                    // remark: '',
                    // createdAt: '',
                    // amountOfMoney: '',

                    title: '',
                    info: '',
                },

                defaultItem: {
                    categoryId: '',
                    type: '',
                    assetsId: '',
                    remark: '',
                    createdAt: '',
                    amountOfMoney: '',
                },
                rules: {
                    required: value => !!value || '必填项不可为空.',
                },
                assetsList: [],
                categoryList: [],
                typeList: [{text: 'Income', value: 'i'}, {text: 'Expenditure', value: 'e'}],
                // 操作提示
                snackbar: false,
                snackbarMsg: '',
                // 导出路径
                userDataPath: '',
                exportPath: '',
            }
        },
        computed: {
        },
        watch: {
            pagination: {
                handler() {
                    this.initialize()
                },
                deep: true
            },
            // dialogEdit: {
            //     handler(val) {
            //         val || this.closeDialogEdit()
            //     }
            // },
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
            this.initialize()
        },
        methods: {
            changeSort(column) {
                if (this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy = column
                    this.pagination.descending = false
                }
            },

            initialize() {
                this.showNoData = false
                this.loading = true

                // 排序是可以没有的，如果想强制至少一列总是被排序的，
                // 而不是在升序（sorted ascending）/降序（sorted descending）/不排序（unsorted）的状态之间切换请添加 must-sort = true
                const {sortBy, descending, page, rowsPerPage} = this.pagination

                let whereAttrs = {
                    ps_name: this.search.ps_name
                }
                const filterFun = (o => {
                    let check1, check2 = false

                    if (whereAttrs.dateStart) {
                        if (new Date(o.createdAt) >= new Date(whereAttrs.dateStart)) {
                            check1 = true
                        }
                    } else {
                        check1 = true
                    }

                    if (whereAttrs.dateEnd) {
                        if (new Date(o.createdAt) <= new Date(whereAttrs.dateEnd)) {
                            check2 = true
                        }
                    } else {
                        check2 = true
                    }

                    // 模糊查询
                    return check1 && check2
                })

                getModelPagination(this.pagination, whereAttrs, filterFun).then(result => {
                    console.log('result', result)
                    if (result.code === 200) {
                        let items = result.data.list
                        const total = result.data.total

                        // 表关联
                        if (items) {
                            items.forEach(item => {
                                this.categoryList.some(itemCategory => {
                                    if (item.categoryId === itemCategory.value) {
                                        item.categoryName = itemCategory.text
                                        return true
                                    }
                                })

                                this.assetsList.some(itemAssets => {
                                    if (item.assetsId === itemAssets.value) {
                                        item.assetsName = itemAssets.text
                                        return true
                                    }
                                })
                            })
                        }

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

            saveValue(item) {
                console.log('item', item)
                saveStatData(item)
            },

            closeDialogEdit() {
                // 重新设置验证结果
                this.valid = true
                this.dialogEdit = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            closeDialogDelete() {
                this.dialogDelete = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            closeDialogDeleteBatch() {
                this.dialogDeleteBatch = false
            },

            saveDelete() {
                deleteModelById(this.editedItem.id).then(result => {
                    if (result.code === 200) {
                        this.submitResult = true
                    } else {
                        this.submitResult = false
                    }
                    this.closeDialogDelete()
                    // 显示结果
                    this.snackbar = true
                    // 每次操作成功后，重新获取数据
                    this.initialize()
                }).catch(err => {
                    this.closeDialogDelete()
                    this.submitResult = false
                    // 显示结果
                    this.snackbar = true
                    // 每次操作成功后，重新获取数据
                    this.initialize()
                })
            },

            

            saveTable() {
                if (this.$refs.form.validate()) {
                    // 格式化
                    this.editedItem.amountOfMoney = parseFloat(this.editedItem.amountOfMoney)
                    if (this.editedIndex > -1) {
                        putModelById(this.editedItem.id, this.editedItem).then(result => {
                            if (result.code === 200) {
                                this.submitResult = true
                            } else {
                                this.submitResult = false
                            }
                            this.closeDialogEdit()
                            // 显示结果
                            this.snackbar = true
                            // 每次操作成功后，重新获取数据
                            this.initialize()
                        }).catch(err => {
                            this.closeDialogEdit()
                            this.submitResult = false
                            // 显示结果
                            this.snackbar = true
                            this.snackbarMsg = err.message
                            // 每次操作成功后，重新获取数据
                            this.initialize()
                        })
                    } else {
                        postModel(this.editedItem).then(result => {
                            if (result.code === 200) {
                                this.submitResult = true
                            } else {
                                this.submitResult = false
                            }
                            this.closeDialogEdit()
                            // 显示结果
                            this.snackbar = true
                            // 每次操作成功后，重新获取数据
                            this.initialize()
                        }).catch(err => {
                            this.closeDialogEdit()
                            this.submitResult = false
                            // 显示结果
                            this.snackbar = true
                            this.snackbarMsg = err.message
                            // 每次操作成功后，重新获取数据
                            this.initialize()
                        })
                    }
                }
            },
        }
    }
</script>

<style scoped>
    .v-sheet--offset {
        top: -15px;
        left: 15px;
        position: relative;
        align-items: center;
        justify-content: center;
        display: flex;
    }
</style>
<style type="text/css" lang="scss">
    .v-btn--floating .v-btn__content {
        height: auto !important;    
    }
</style>
