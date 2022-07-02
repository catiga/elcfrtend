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
                                    v-model="search.dateStart"
                                    label="开始日期"
                                    single-line
                                    hide-details
                                    readonly
                                    v-on="on"
                                    clearable
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="search.dateStart"
                                @input="menuTimeStart = false"></v-date-picker>
                    </v-menu>
                    <v-menu
                            v-model="menuTimeEnd"
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
                                    v-model="search.dateEnd"
                                    label="结束日期"
                                    single-line
                                    hide-details
                                    readonly
                                    v-on="on"
                                    clearable
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="search.dateEnd"
                                @input="menuTimeEnd = false"></v-date-picker>
                    </v-menu>
                    <v-spacer></v-spacer>
                    <v-btn color="success" dark class="mb-2" @click="initialize">搜索</v-btn>
                    <v-btn color="primary" dark class="mb-2" @click="create">新建</v-btn>
                    <v-btn color="error" dark class="mb-2" @click="dialogDeleteBatch = true">批量删除</v-btn>
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
                            class="elevation-1 projectmgr-container-list"
                    >
                        <template v-slot:headers="props">
                            <tr>
                                <th>
                                    <v-checkbox
                                            :input-value="props.all"
                                            :indeterminate="props.indeterminate"
                                            primary
                                            hide-details
                                            @click.stop="toggleAll"
                                    ></v-checkbox>
                                </th>
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
                                <td width="50">
                                    <v-checkbox
                                            :input-value="props.selected"
                                            primary
                                            hide-details
                                    ></v-checkbox>
                                </td>
                                <td>{{ props.item.title }}</td>
                                <td>{{ JSON.parse(props.item.topo_method)[0]['head']['name'] }}</td>
                                <td width="130">{{ props.item.a_time | formateTime }}</td>
                                <td>
                                    <span v-if="props.item.computing==0">创建</span>
                                    <span v-if="props.item.computing==1">计算中</span>
                                    <span v-if="props.item.computing==2">计算成功</span>
                                    <span v-if="props.item.computing==3">计算失败</span>
                                </td>
                                <td class="text-xs-right" width="170">
                                    <v-btn v-if="props.item.computing!=2" fab small color="success" @click="reCompute(props.item)">
                                        重算
                                    </v-btn>
                                    <v-btn v-if="props.item.computing!=1" fab small color="error" @click="deleteItem(props.item)">
                                        删除
                                    </v-btn>
                                    <v-btn v-if="props.item.computing==1" fab small color="error" @click="refreshItem(props.item)">
                                        刷新
                                    </v-btn>
                                </td>
                                <td class="text-xs-right">
                                    <v-btn v-if="props.item.computing==2" fab small color="success" @click="handlePreview(props.item)">
                                        计算<br/>数据
                                    </v-btn>
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
        <v-dialog v-model="dialogEdit" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">风险评估结果</span>
                </v-card-title>
                <v-card-text>
                    <v-form wrap ref="form" v-model="valid" lazy-validation>
                        <v-container grid-list-md>
                            <!-- <v-layout wrap> -->
                                <v-flex xs12>
                                    <v-text-field label="负荷削减概率"
                                        v-model="editedItem.mfs"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="期望负荷削减频次（次/年）"
                                        v-model="editedItem.eo"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="	期望缺供电量（MWh/年）"
                                        v-model="editedItem.mhvs"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="潮流安全裕度"
                                        v-model="editedItem.mlvs"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="电压上限安全裕度"
                                        v-model="editedItem.ehvv"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="电压下限安全裕度"
                                        v-model="editedItem.elvv"></v-text-field>
                                </v-flex>
                            <!-- </v-layout> -->
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialogEdit = false">关闭</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="290">
            <v-card>
                <v-card-title class="headline">提示：</v-card-title>
                <v-card-text>确定删除计算任务吗?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="closeDialogDelete">取消</v-btn>
                    <v-btn color="blue darken-1" flat @click="saveDelete">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDeleteBatch" max-width="290">
            <v-card>
                <v-card-title class="headline">提示：</v-card-title>
                <v-card-text>确定要批量删除选中工程吗?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="closeDialogDeleteBatch">取消</v-btn>
                    <v-btn color="blue darken-1" flat @click="saveDeleteBatch">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogRecompute" max-width="290">
            <v-card>
                <v-card-title class="headline">提示：</v-card-title>
                <v-card-text>确定重新执行计算任务吗?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialogRecompute = false">取消</v-btn>
                    <v-btn color="blue darken-1" flat @click="confirmCompute">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- 弹窗 -->
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
                                <v-text-field label="作业名称*"
                                    :rules="[rules.required]"
                                    v-model="editedItem.title"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea
                                    label="备注"
                                    v-model="editedItem.info"
                                ></v-textarea>
                            </v-flex>
                            <!-- </v-layout> -->
                        </v-container>
                        <small>*代表必填信息</small>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat>关闭</v-btn>
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
    import {
        getModelPagination,
        postModel,
        putModelById,
        deleteModelById,
        deleteModelByIds,
        loadComputeResult
    } from '../../../../api/compute_risk'
    import {app, remote, shell} from 'electron'
    import moment from 'moment'

    const pageMenus = require('../../../../context/pageMenu')

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
                    {text: '作业名称', value: 'title', align: 'left', sortable: true},
                    {text: '拓扑作业方案', value: 'info', align: 'left', sortable: false},
                    {text: '创建时间', value: 'a_time', align: 'left', sortable: true},
                    {text: '状态', value: 'computing', align: 'left', sortable: true},
                    {text: '操作', value: 'id', align: 'right', sortable: false},
                    {text: '计算数据', value: 'id', align: 'right', sortable: false}
                ],
                noDataMessage: '',
                search: {
                    dateStart: '',
                    dateEnd: ''
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
                dialogRecompute: false,

                editedItem: {
                    title: '',
                    method: '',
                    allow_err: '',
                    iterate_limit: 1,
                    info: ''
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
                
                // 操作提示
                snackbar: false,
                snackbarMsg: '',
                // 导出路径
                userDataPath: '',
                exportPath: '',
                method_items: [{label:'牛拉法', code:'method_cow'}, {label:'误差法', code:'method_err'}],
                err_items: [{label:'是', code:'yes'}, {label:'否', code:'no'}]
            }
        },
        computed: { 
            formTitle() {
                return this.editedIndex === -1 ? '新建潮流作业' : '编辑潮流作业'
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
            handlePreview(item) {
                loadComputeResult(item.id).then(result => {
                    this.editedItem = result.data[0]
                    console.log(this.editedItem)
                    this.dialogEdit = true
                }).catch(err => {

                })
            },
            create() {
                this.$router.push('/projectMgr/task/risk/add')
            },
            openItem(item) {
                if (item.is_import === 0) {
                    this.snackbar = true
                    this.snackbarMsg = '请先导入工程数据'
                    return
                }
                remote.getGlobal('sharedObject').openedProject = item
            },
            toggleAll() {
                if (this.selected.length) this.selected = []
                else this.selected = this.desserts.slice()
            },

            changeSort(column) {
                if (this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy = column
                    this.pagination.descending = false
                }
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
                // 日期范围判断
                if (this.search.dateStart && this.search.dateEnd) {
                    if (moment(this.search.dateStart).isAfter(moment(this.search.dateEnd))) {
                        this.snackbar = true
                        this.snackbarMsg = 'Please select the correct date range'
                        return
                    }
                }

                this.showNoData = false
                this.loading = true

                // 排序是可以没有的，如果想强制至少一列总是被排序的，
                // 而不是在升序（sorted ascending）/降序（sorted descending）/不排序（unsorted）的状态之间切换请添加 must-sort = true
                const {sortBy, descending, page, rowsPerPage} = this.pagination

                let whereAttrs = {
                    dateStart: this.search.dateStart,
                    dateEnd: this.search.dateEnd,
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

            editItem(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogEdit = true
            },

            deleteItem(item) {
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
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

            saveDeleteBatch() {
                const ids = this.selected.map(item => item.id)
                if (!ids || ids.length === 0) {
                    this.snackbarMsg = '请选择要删除的工程'
                    this.snackbar = true
                    return
                }
                deleteModelByIds(ids).then(result => {
                    if (result.code === 200) {
                        this.submitResult = true
                    } else {
                        this.submitResult = false
                    }
                    this.closeDialogDeleteBatch()
                    // 显示结果
                    this.snackbar = true
                    // 每次操作成功后，重新获取数据
                    this.initialize()
                }).catch(err => {
                    this.closeDialogDeleteBatch()
                    this.submitResult = false
                    // 显示结果
                    this.snackbar = true
                    // 每次操作成功后，重新获取数据
                    this.initialize()
                })
            },

            saveEdit() {
                let currentProject = remote.getGlobal('sharedObject').openedProject
                if (!currentProject) {
                    this.snackbar = true
                    this.snackbarMsg = '请先选择打开工程'
                    this.loading = false
                    return
                }
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


            reCompute(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogRecompute = true
            },
            confirmCompute() {
                console.log(this.editedItem)
                this.dialogRecompute = false
                this.$http.post(`http://127.0.0.1:8081/api/task/compute/risk/${this.editedItem.id}`, {
                    headers: {}
                }).catch((error) => {
                    this.snackbar = true
                    this.snackbarMsg = '请检查计算服务启动状态'
                    this.submitResult = false
                }).then((response) => {
                    if(response.status != 200) {
                        this.snackbar = true
                        this.snackbarMsg = '计算服务状态异常'
                        this.submitResult = false
                    } else {
                        if(response.data.errno === 0) {
                            this.snackbar = true
                            this.snackbarMsg = '风险评估计算任务成功'
                            this.submitResult = true
                        } else {
                            this.snackbar = true
                            this.snackbarMsg = response.data.errmsg
                            this.submitResult = false
                        }
                    }
                })
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
// .projectmgr-container-list {
    .title-area {
        font-size: 20px;
        display: block;
        font-weight: bold;
    }
    .v-btn--floating .v-btn__content {
        height: auto !important;    
    }
// }
</style>
