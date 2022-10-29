<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-card-title>
                    <!--
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
                                label="交流线名称"
                                single-line
                                hide-details
                                v-on="on"
                                clearable
                            ></v-text-field>
                        </template>
                    </v-menu>
                    -->
                    <v-spacer></v-spacer>
                    <!--
                    <v-btn color="success" dark class="mb-2" @click="initialize">搜索</v-btn>
                    -->
                    <v-btn color="info" dark class="mb-2" @click="handleCreate">新建</v-btn>
                </v-card-title>
                <v-card-text class="pt-0 title font-weight-bold">
                    <v-data-table
                        :headers="headers"
                        :items="desserts"
                        :pagination.sync="pagination"
                        :total-items="totalDesserts"
                        class="elevation-1"
                    >
                        <template v-slot:items="props">
                        <td class="text-xs-left">
                            <v-text-field v-model="props.item.fbranch"/>
                        </td>
                        <td class="text-xs-left">
                            <v-text-field v-model="props.item.tbranch"/>
                        </td>
                        <td class="text-xs-left">
                            <v-text-field v-model="props.item.bla_3"/>
                        </td>
                        <td class="text-xs-left">
                            <v-text-field v-model="props.item.bla_4"/>
                        </td>
                        <td class="text-xs-left">
                            <v-text-field v-model="props.item.bla_5"/>
                        </td>
                        <td class="text-xs-left">
                            <v-text-field v-model="props.item.bla_6"/>
                        </td>
                        <td class="text-xs-left">
                            <v-text-field v-model="props.item.bla_11"/>
                        </td>
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

        <!-- 新增编辑 -->
        <v-dialog v-model="dialogEdit" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form
                        wrap
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-container grid-list-md>
                            <!-- <v-layout wrap> -->
                                <v-flex xs12>
                                    <v-text-field label="首端节点*"
                                        :rules="[rules.required]"
                                        v-model="addForm.fbranch"></v-text-field>
                                </v-flex>
                                
                                <v-flex xs12>
                                    <v-text-field label="尾端节点*"
                                        :rules="[rules.required]"
                                        v-model="addForm.tbranch"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="电阻p.u.*"
                                        :rules="[rules.required]"
                                        v-model="addForm.bla_3"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="电抗p.u.*"
                                        :rules="[rules.required]"
                                        v-model="addForm.bla_4"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="电纳p.u.*"
                                        :rules="[rules.required]"
                                        v-model="addForm.bla_5"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="额定容量MW*"
                                        :rules="[rules.required]"
                                        v-model="addForm.bla_6"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select
                                        :items="items"
                                        item-text="lable"
                                        item-value="id"
                                        label="状态*"
                                        v-model="addForm.bla_11"
                                        :rules="[rules.required]"
                                    ></v-select>
                                </v-flex>
                            <!-- </v-layout> -->
                        </v-container>
                        <small>*代表必填信息</small>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="handleSaveForm">保存</v-btn>
                    <v-btn color="blue darken-1" flat @click="handleCancelFomr">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import { getModelPagination, saveStatData,delData } from '../../../../../api/station/acline'
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
                    {text: '首端节点', value: 'fbranch', align: 'left', sortable: false},
                    {text: '尾端节点', value: 'tbranch', align: 'left', sortable: false},
                    {text: '电阻p.u.', value: 'bla_3', align: 'left', sortable: false},
                    {text: '电抗p.u.', value: 'bla_4', align: 'left', sortable: false},
                    {text: '电纳p.u', value: 'bla_5', align: 'left', sortable: false},
                    {text: '额定容量MW', value: 'bla_6', align: 'left', sortable: false},
                    {text: '状态', value: 'bla_11', align: 'left', sortable: false}
                ],
                noDataMessage: '',
                search: {
                    ps_name: ''
                },
                pagination: {
                    sortBy: 'nsla_index'
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
                // 新增编辑
                dialogEdit: false,
                editedIndex: -1, 
                addForm: {

                },
                items: [{lable:'Foo', id:1},{lable:'Foo1', id:2},{lable:'Foo2', id:3},{lable:'Foo3', id:4}]
            }
        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? '新建工程' : '编辑工程'
            },
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
                // if (this.pagination.sortBy === column) {
                //     this.pagination.descending = !this.pagination.descending
                // } else {
                //     this.pagination.sortBy = column
                //     this.pagination.descending = false
                // }
            },

            initialize() {
                //判断工程
                let currentProject = remote.getGlobal('sharedObject').openedProject
                if (!currentProject) {
                    this.snackbar = true
                    this.snackbarMsg = '请先选择打开工程'
                    this.loading = false
                    return
                }
                this.showNoData = false
                this.loading = true

                // 排序是可以没有的，如果想强制至少一列总是被排序的，
                // 而不是在升序（sorted ascending）/降序（sorted descending）/不排序（unsorted）的状态之间切换请添加 must-sort = true
                const {sortBy, descending, page, rowsPerPage} = this.pagination

                let whereAttrs = {
                    ps_name: this.search.ps_name,
                    proj_id: currentProject.id
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
                delData(this.delItem).then(result => {
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
                    this.delItem = {}
                }).catch(err => {
                    this.closeDialogDelete()
                    this.submitResult = false
                    // 显示结果
                    this.snackbar = true
                    // 每次操作成功后，重新获取数据
                    this.initialize()
                    this.delItem = {}
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

            // 编辑
            handleEditItem(item) {
                this.dialogEdit = true
                console.log(item);
                this.addForm = item;
            },
            // 删除
            handleDeleteItem(item) {
                this.dialogDelete = true
                this.delItem = item;
            },
            // 新建弹窗
            handleCreate() {
                this.dialogEdit = true
            },
            // 添加表单
            handleSaveForm() {

                if (this.$refs.form.validate()) {
                    // 格式化
                    // this.editedItem.amountOfMoney = parseFloat(this.editedItem.amountOfMoney)
                    saveStatData(this.addForm).then(result => {
                        if (result.code === 200) {
                            this.submitResult = true
                        } else {
                            this.submitResult = false
                        }
                        this.dialogEdit = false
                        // 显示结果
                        this.snackbar = true
                        // 每次操作成功后，重新获取数据
                        this.initialize()
                        this.addForm = {};
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

            },
            // 取消表单
            handleCancelFomr() {
                this.dialogEdit = false
            }
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
