<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-sheet
                        class="v-sheet--offset pa-2"
                        color="orange"
                        elevation="12"
                        width="60"
                        height="60"
                >
                    <v-icon large>assignment</v-icon>
                </v-sheet>
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
                    <v-btn color="primary" dark class="mb-2" @click="dialogEdit = true">新建工程</v-btn>
                    <v-btn color="error" dark class="mb-2" @click="dialogDeleteBatch = true">批量删除</v-btn>
                    <!-- <v-btn :loading="importing" :disabled="importing" color="error" @click="importLocalFile">导入</v-btn> -->
                    <!--
                    <v-btn :loading="exporting" :disabled="exporting" color="purple" @click="exportLocalFile">导出</v-btn>
                    -->
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
                            :class="['elevation-1']"
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
                                <td>{{ props.item.id }}</td>
                                <td>{{ props.item.title }}</td>
                                <td>{{ props.item.info }}</td>
                                <td width="130">{{ props.item.a_time | formateTime }}</td>
                                <td class="text-xs-right" width="180">
                                    <v-btn fab small color="success" @click="editItem(props.item)">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-btn fab small color="error" @click="deleteItem(props.item)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </td>

                                <td class="text-xs-right">
                                    <v-btn v-if="props.item.is_import==0" fab big :loading="importing" :disabled="importing" color="success" @click="importLocalFile1(props.item)">基础库</v-btn>
                                    <v-btn v-if="props.item.is_import==0" fab big :loading="importing" :disabled="importing" color="success" @click="importLocalFile2(props.item)">潮流<br/>作业</v-btn>
                                    <v-btn v-if="props.item.is_import==0" fab big :loading="importing" :disabled="importing" color="success" @click="importLocalFile3(props.item)">潮流<br/>结果</v-btn>
                                    <v-btn v-if="props.item.is_import==0" fab big :loading="importing" :disabled="importing" color="success" @click="importLocalFile4(props.item)">一次<br/>主线</v-btn>
                                    <v-btn v-if="props.item.is_import==0" fab big :loading="importing" :disabled="importing" color="success" @click="importLocalFile5(props.item)">元件<br/>可靠</v-btn>
                                    <v-btn v-if="props.item.is_import==1" fab small color="error" @click="openItem(props.item)">打开</v-btn>
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
                            <v-layout wrap>
                                <!--
                                <v-flex xs12>
                                    <v-select
                                            :items="assetsList"
                                            item-text="text"
                                            item-value="value"
                                            label="Assets*"
                                            :rules="[rules.required]"
                                            v-model="editedItem.assetsId"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select
                                            :items="typeList"
                                            item-text="text"
                                            item-value="value"
                                            label="Type*"
                                            :rules="[rules.required]"
                                            v-model="editedItem.type"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <v-autocomplete
                                            v-model="editedItem.categoryId"
                                            :items="categoryList"
                                            label="Category*"
                                            :rules="[rules.required]"
                                            persistent-hint
                                    >
                                    </v-autocomplete>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="AmountOfMoney*"
                                                  prefix="$"
                                                  type="number"
                                                  step="0.1"
                                                  min="0"
                                                  :rules="[rules.required]"
                                                  v-model="editedItem.amountOfMoney"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-menu
                                            v-model="menuTime"
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
                                                    v-model="editedItem.createdAt"
                                                    label="Time*"
                                                    :rules="[rules.required]"
                                                    readonly
                                                    v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="editedItem.createdAt"
                                                       @input="menuTime = false"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Remark"
                                                  v-model="editedItem.remark"></v-text-field>
                                </v-flex>
                                -->

                                <v-flex xs12>
                                    <v-text-field label="名称*"
                                        :rules="[rules.required]"
                                        v-model="editedItem.title"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="说明*"
                                        :rules="[rules.required]"
                                        v-model="editedItem.info"></v-text-field>
                                </v-flex>
                                
                                <v-flex xs12>
                                    <el-upload
                                            class="upload-demo"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            multiple
                                            :on-exceed="handleExceed"
                                            :file-list="fileList">
                                        <!--<el-button size="small" type="primary">点击上传</el-button>-->
                                        <v-btn color="blue darken-1">Upload</v-btn>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*代表必填信息</small>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="closeDialogEdit">关闭</v-btn>
                    <v-btn color="blue darken-1" flat @click="saveEdit">保存</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
        getModelExport,
        postModel,
        putModelById,
        deleteModelById,
        deleteModelByIds
    } from '../../../api/projectMgr'

    import {
        getModelAll as getCategoryAll,
        getModelWhere as getCategoryWhere,
        postModel as postCategory
    } from '../../../api/category'
    import {getModelAll as getAssetsAll} from '../../../api/assets'
    import Excel from 'exceljs'
    import {app, remote, shell} from 'electron'
    import moment from 'moment'
    import fs from 'fs-extra'
    import db from '../../../datastore/index_mysql'

    const pageMenus = require('../../../context/pageMenu')

    export default {
        filters: {
            formateTime: function(oldvalue) {
                return moment(oldvalue).format('YYYY-MM-DD HH:mm')
            }
        },
        data() {
            return {
                fileList: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }],
                // 表格相关
                loading: true,
                showNoData: false,
                totalDesserts: 0,
                desserts: [],
                headers: [
                    {text: '工程名称', value: 'title', align: 'left', sortable: true},
                    {text: '工程说明', value: 'info', align: 'left', sortable: false},
                    {text: '创建时间', value: 'a_time', align: 'left', sortable: true},
                    {text: '操作', value: 'id', align: 'right', sortable: false},
                    {text: '工程数据', value: 'id', align: 'right', sortable: false}
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
            this.getUserDataPath()
            Promise.all([this._getCategoryAll(), this._getAssetsAll()]).then(result => {
                this.initialize()
            })
        },
        methods: {
            getUserDataPath() {
                const APP = process.type === 'renderer' ? remote.app : app
                this.userDataPath = APP.getPath('userData')
                this.exportPath = this.userDataPath + '/export'
            },
            openItem(item) {
                if (item.is_import === 0) {
                    this.snackbar = true
                    this.snackbarMsg = '请先导入工程数据'
                    return
                }
                remote.getGlobal('sharedObject').openedProject = item
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {

            },
            beforeRemove(file, fileList) {

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
                    dateEnd: this.search.dateEnd
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

            exportLocalFile() {
                // 日期范围判断
                if (this.search.dateStart && this.search.dateEnd) {
                    if (moment(this.search.dateStart).isAfter(moment(this.search.dateEnd))) {
                        this.snackbar = true
                        this.snackbarMsg = 'Please select the correct date range'
                        return
                    }
                }

                this.exporting = true

                // 创建一个文件
                const workbook = new Excel.Workbook()
                workbook.creator = 'Me'
                workbook.lastModifiedBy = 'Her'
                workbook.created = new Date()
                workbook.modified = new Date()

                // 创建一个工作组
                let sheet = workbook.addWorksheet('Export Data Sheet')

                // 设置默认行高
                sheet.properties.defaultRowHeight = 20;

                // 创建列
                sheet.getRow(1).values = ['Detail', , 'AssetsName', 'CategoryName', 'CreatedAt', 'Remark']
                sheet.getRow(2).values = ['Type', 'AmountOfMoney', 'AssetsName', 'CategoryName', 'CreatedAt', 'Remark']

                // 设置表头样式
                const colorHeader = 'FFDB8B89'
                const rowHeader1 = sheet.getRow(2)
                rowHeader1.eachCell((cell, rowNumber) => {
                    sheet.getColumn(rowNumber).alignment = {vertical: 'middle', horizontal: 'center'}
                    sheet.getColumn(rowNumber).font = {size: 12, family: 2, bold: true}
                    sheet.getColumn(rowNumber).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {argb: colorHeader}
                    }
                    sheet.getColumn(rowNumber).border = {
                        top: {style: 'thin'},
                        left: {style: 'thin'},
                        bottom: {style: 'thin'},
                        right: {style: 'thin'}
                    }
                })

                // 冻结行
                sheet.views = [{
                    state: 'frozen', ySplit: 2, activeCell: 'A1'
                }]

                // 合并单元格
                sheet.mergeCells('A1:B1')
                sheet.mergeCells('C1:C2')
                sheet.mergeCells('D1:D2')
                sheet.mergeCells('E1:E2')
                sheet.mergeCells('F1:F2')

                // 添加数据项定义
                sheet.columns = [
                    {key: 'type', width: 30},
                    {key: 'amountOfMoney', width: 30},
                    {key: 'assetsName', width: 30},
                    {key: 'categoryName', width: 30},
                    {key: 'createdAt', width: 30},
                    {key: 'remark', width: 60},
                ]

                // 获取数据
                this._getModelExport().then(result => {
                    console.log(result)
                    // 创建行
                    sheet.addRows(result.data)

                    // 创建文件及文件夹
                    const dir = this.exportPath
                    const fileName = moment(new Date()).format('YYYYMMDDHHMMSS') + 'Export.xlsx'
                    const fullPath = dir + '/' + fileName

                    // 如果没有目录则创建
                    fs.ensureDir(dir).then(() => {
                        // 写文件
                        workbook.xlsx.writeFile(fullPath).then(() => {
                            this.exporting = false

                            // 在文件管理器中显示给定的文件,如果可以,'选中'该文件
                            shell.showItemInFolder(dir)
                            // 播放哔哔的声音
                            shell.beep()

                            // 打开文件
                            shell.openItem(fullPath)
                        })
                    }).catch(err => {
                        this.snackbar = true
                        this.snackbarMsg = 'Failed to create folder'
                    })
                }).catch(err => {
                    this.snackbar = true
                    this.snackbarMsg = err.message
                })
            },

            importLocalFile1(dataitem) {
                console.log('数据:'+JSON.stringify(dataitem));
                // console.log('数据:'+db.query);
                let proj_id = dataitem.id

                this.importing = true

                // 弹出文件选择框
                remote.dialog.showOpenDialog({
                    // title: '请选择需要导入的文件',
                    defaultPath: this.exportPath,
                    // buttonLabel: '确认',
                    // 过滤
                    filters: [
                        {name: 'xlsx', extensions: ['xlsx']}
                    ],
                    // 包含功能
                    properties: ['openFile']
                }).then((result) => {
                    // console.log('-----回调-----');
                    // console.log(result);
                    // console.log('是否取消:'+result.canceled+'文件路径:'+result.filePaths);
                    if(!result.canceled){
                        // 读取文件
                        const workbook = new Excel.Workbook()
                        workbook.xlsx.readFile(result.filePaths[0]).then(() => {
                            // 重新结构化数据
                            let data_moline = []
                            let data_acline = []
                            let data_tw_transformer = []
                            let data_threew_transformer = []
                            let data_alternator = []

                            // 获取工作表
                            const moline = workbook.getWorksheet(6);//母线表
                            const acline = workbook.getWorksheet(8);//交流线表
                            const tw_transformer = workbook.getWorksheet(11);//两绕组变压器表
                            const threew_transformer = workbook.getWorksheet(11);//三绕组变压器表
                            const alternator = workbook.getWorksheet(12);//发电机表
                            // 母线表
                            moline.eachRow(function (row, rowNumber) {
                                // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values))
                                // 去掉两行表头
                                if (rowNumber > 2) {
                                    // 重新组织数据，excel无论单元格还是行都是从1开始的
                                    const model = {
                                        proj_id: proj_id,
                                        code: row.values[1],
                                        bus_name: row.values[2],
                                        phy_pos: row.values[3],
                                        zone_no: row.values[4],
                                        ps_name: row.values[5],
                                        base_kv: row.values[6],
                                        vmax_kv: row.values[7],
                                        vmin_kv: row.values[8],
                                        sc1_mva: row.values[9],
                                        sc3_mva: row.values[10],
                                        hasnode: row.values[11],
                                        bustype: row.values[12],
                                        dispname: row.values[13],
                                        a_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                    }

                                    data_moline.push(model)
                                }
                            })

                            // 交流线表
                            acline.eachRow(function (row,rowNumber){
                                if (rowNumber > 2) {
                                    // 重新组织数据，excel无论单元格还是行都是从1开始的
                                    const model = {
                                        proj_id: proj_id,
                                        l_name: row.values[6],
                                        j_name: row.values[7],
                                        r1: row.values[12],
                                        x1: row.values[13],
                                        b1_half: row.values[14],
                                        rate_ka: row.values[19],
                                        up_limit: row.values[20],
                                        type: row.values[22],
                                        a_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                    }

                                    data_acline.push(model)
                                }
                            })

                            // 两晓表
                            tw_transformer.eachRow(function (row,rowNumber){
                                if (rowNumber > 2) {
                                    // 重新组织数据，excel无论单元格还是行都是从1开始的
                                    const model = {
                                        proj_id: proj_id,
                                        l_name: row.values[6],
                                        j_name: row.values[7],
                                        v0_tap1: row.values[32],
                                        v0_tap2: row.values[38],
                                        a_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                    }

                                    data_tw_transformer.push(model)
                                }
                            })

                            // 三晓表
                            threew_transformer.eachRow(function (row,rowNumber){
                                if (rowNumber > 2) {
                                    // 重新组织数据，excel无论单元格还是行都是从1开始的
                                    const model = {
                                        proj_id: proj_id,
                                        name_1: row.values[8],
                                        name_2: row.values[9],
                                        name_3: row.values[10],
                                        tap1: row.values[55],
                                        tap2: row.values[61],
                                        tap3: row.values[67],
                                        up_limit: row.values[36],
                                        a_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                    }

                                    data_threew_transformer.push(model)
                                }
                            })

                            // 发电机表
                            alternator.eachRow(function (row,rowNumber){
                                if (rowNumber > 2) {
                                    // 重新组织数据，excel无论单元格还是行都是从1开始的
                                    const model = {
                                        proj_id: proj_id,
                                        id_name: row.values[3],
                                        a_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                    }

                                    data_alternator.push(model)
                                }
                            })

                            // 业务处理
                            // console.log(data)
                            this._importData1(data_moline,data_acline,data_tw_transformer,data_threew_transformer,data_alternator).then(result => {
                                if (result.code === 200) {
                                    this.submitResult = true
                                    this.importing = false
                                    this.snackbar = true
                                    this.snackbarMsg = 'Successfully imported'

                                    // 刷新所有列表
                                    Promise.all([this._getCategoryAll(), this._getAssetsAll()]).then(result => {
                                        this.initialize()
                                    })
                                }
                            }).catch(err => {
                                this.submitResult = false
                                this.importing = false
                                this.snackbar = true
                                this.snackbarMsg = err.message
                            })
                        })
                    }else{
                        console.log('-----取消-----');
                    }

                    this.importing = false
                })
                .catch((err) => {
                    console.log('-----异常取消-----');
                    console.log(err);
                })
            },

            _importData1(data_moline,data_acline,data_tw_transformer,data_threew_transformer,data_alternator) {
                return new Promise((resolve, reject) => {
                    try {
                        if(data_moline.length > 0){//母线
                            
                            let p_id = data_moline[0].proj_id

                            data_moline.forEach(item => {
                                // console.log('item:'+JSON.stringify(item));
                                let proj_id = item.proj_id
                                let code = item.code
                                let bus_name = item.bus_name
                                let phy_pos = item.phy_pos
                                let zone_no = item.zone_no
                                let ps_name = item.ps_name
                                let base_kv = item.base_kv
                                let vmax_kv = item.vmax_kv
                                let vmin_kv = item.vmin_kv
                                let sc1_mva = item.sc1_mva
                                let sc3_mva = item.sc3_mva
                                let hasnode = item.hasnode
                                let bustype = item.bustype
                                let dispname = item.dispname
                                let a_time = item.a_time
                                let sql = `INSERT INTO p_moline_info (code, bus_name, phy_pos, zone_no, ps_name, base_kv, vmax_kv, vmin_kv, sc1_mva, sc3_mva, hasnode, bustype, dispname, proj_id, flag, a_time) VALUES ('${code}', '${bus_name}', '${phy_pos}', '${zone_no}', '${ps_name}', '${base_kv}', '${vmax_kv}', '${vmin_kv}', '${sc1_mva}', '${sc3_mva}', '${hasnode}', '${bustype}', '${dispname}', '${proj_id}', 0, '${a_time}')`;
    
                                // 插入主表
                                db.query(sql, function(err, values, fields) {
                                 })
                            })
                        }

                        if(data_acline.length > 0){//交流线
                             
                            let p_id = data_acline[0].proj_id

                            data_acline.forEach(item => {
                                console.log('data_acline:'+JSON.stringify(item));                            

                                let proj_id = item.proj_id
                                let l_name = item.l_name
                                let j_name = item.j_name
                                let r1 = item.r1
                                let x1 = item.x1
                                let b1_half = item.b1_half
                                let rate_ka = item.rate_ka
                                let up_limit = item.up_limit
                                let type = item.type
                                let a_time = item.a_time

                                let sql = `INSERT INTO p_acline_info (proj_id, l_name, j_name, r1, x1, b1_half, rate_ka, up_limit, type, flag, a_time) VALUES (${proj_id}, '${l_name}', '${j_name}', '${r1}', '${x1}', '${b1_half}', '${rate_ka}', '${up_limit}', '${type}', 0, '${a_time}')`;

                                // 插入主表
                                db.query(sql, function(err, values, fields) {
                                 })
                            })
                        }

                        if(data_tw_transformer.length > 0){//两晓
                            
                            let p_id = data_tw_transformer[0].proj_id

                            data_tw_transformer.forEach(item => {
                                console.log('data_tw_transformer:'+JSON.stringify(item));                            

                                let proj_id = item.proj_id
                                let l_name = item.l_name
                                let j_name = item.j_name
                                let v0_tap1 = item.v0_tap1
                                let v0_tap2 = item.v0_tap2
                                let a_time = item.a_time

                                let sql = `INSERT INTO p_tw_transformer_info (proj_id, l_name, j_name, v0_tap1, v0_tap2, flag, a_time) VALUES (${proj_id}, '${l_name}', '${j_name}', '${v0_tap1}', '${v0_tap2}', 0, '${a_time}')`;
                                console.log(sql);

                                // 插入主表
                                db.query(sql, function(err, values, fields) {
                                 })
                            })
                        }

                        if(data_threew_transformer.length > 0){//三晓
                            
                            let p_id = data_threew_transformer[0].proj_id

                            data_threew_transformer.forEach(item => {
                                console.log('data_threew_transformer:'+JSON.stringify(item));                            

                                let proj_id = item.proj_id
                                let name_1 = item.name_1
                                let name_2 = item.name_2
                                let name_3 = item.name_3
                                let tap1 = item.tap1
                                let tap2 = item.tap2
                                let tap3 = item.tap2
                                let up_limit = item.up_limit
                                let a_time = item.a_time

                                let sql = `INSERT INTO p_threew_transformer_info (proj_id, name_1, name_2, name_3, tap1, tap2, tap3, flag, a_time) VALUES (${proj_id}, '${name_1}', '${name_2}', '${name_3}', '${tap1}', '${tap2}', '${tap3}', 0, '${a_time}')`;
    
                                // 插入主表
                                db.query(sql, function(err, values, fields) {
                                    console.log(err)
                                 })
                            })
                        }

                        if(data_alternator.length > 0){//发电机表
                            
                            let p_id = data_alternator[0].proj_id

                            data_alternator.forEach(item => {
                                console.log('data_alternator:'+JSON.stringify(item));                            

                                let proj_id = item.proj_id
                                let id_name = item.id_name
                                let a_time = item.a_time

                                let sql = `INSERT INTO p_alternator_info (proj_id, id_name, flag, a_time) VALUES (${proj_id}, '${id_name}', 0, '${a_time}')`;
    
                                // 插入主表
                                db.query(sql, function(err, values, fields) {
                                 })
                            })
                        }

                        resolve({
                            code: 200
                        })
                    } catch (err) {
                        return reject({
                            code: 400,
                            message: err.message
                        })
                    }
                })
            },

            importLocalFile2(dataitem) {
                console.log('数据:'+JSON.stringify(dataitem));
                // console.log('数据:'+db.query);
                let proj_id = dataitem.id

                this.importing = true

                // 弹出文件选择框
                remote.dialog.showOpenDialog({
                    // title: '请选择需要导入的文件',
                    defaultPath: this.exportPath,
                    // buttonLabel: '确认',
                    // 过滤
                    filters: [
                        {name: 'xlsx', extensions: ['xlsx']}
                    ],
                    // 包含功能
                    properties: ['openFile']
                }).then((result) => {
                    // console.log('-----回调-----');
                    // console.log(result);
                    // console.log('是否取消:'+result.canceled+'文件路径:'+result.filePaths);
                    if(!result.canceled){
                        // 读取文件
                        const workbook = new Excel.Workbook()
                        workbook.xlsx.readFile(result.filePaths[0]).then(() => {
                            // 重新结构化数据
                            let data_acline_trend = []
                            let data_alternator_trend = []
                            let data_load_trend = []

                            // 获取工作表
                            const acline_trend = workbook.getWorksheet(8);//交流线表
                            const alternator_trend = workbook.getWorksheet(11);//发电机表
                            const load_trend = workbook.getWorksheet(12);//负荷表

                            // 交流线表
                            acline_trend.eachRow(function (row, rowNumber) {
                                // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values))
                                // 去掉两行表头
                                if (rowNumber > 2) {
                                    // 重新组织数据，excel无论单元格还是行都是从1开始的
                                    let model = {
                                        proj_id: proj_id,
                                        id_name: row.values[2],
                                        valid: row.values[3],
                                        a_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                    }

                                    data_acline_trend.push(model)
                                }
                            })

                            // 发电机表
                            alternator_trend.eachRow(function (row,rowNumber){
                                if (rowNumber > 2) {
                                    // 重新组织数据，excel无论单元格还是行都是从1开始的
                                    const model = {
                                        proj_id: proj_id,
                                        id_name: row.values[2],
                                        valid: row.values[3],
                                        v0: row.values[8],
                                        angle: row.values[9],
                                        qmax: row.values[10],
                                        qmin: row.values[11],
                                        pmax: row.values[12],
                                        pmin: row.values[13],
                                        a_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                    }

                                    data_alternator_trend.push(model)
                                }
                            })

                            // 负荷表
                            load_trend.eachRow(function (row,rowNumber){
                                if (rowNumber > 2) {
                                    // 重新组织数据，excel无论单元格还是行都是从1开始的
                                    const model = {
                                        proj_id: proj_id,
                                        id_name: row.values[2],
                                        pl: row.values[7],
                                        ql: row.values[8],
                                        a_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                    }

                                    data_load_trend.push(model)
                                }
                            })

                            // 业务处理
                            // console.log(data)
                            this._importData2(data_acline_trend,data_alternator_trend,data_load_trend).then(result => {
                                if (result.code === 200) {
                                    this.submitResult = true
                                    this.importing = false
                                    this.snackbar = true
                                    this.snackbarMsg = 'Successfully imported'

                                    // 刷新所有列表
                                    Promise.all([this._getCategoryAll(), this._getAssetsAll()]).then(result => {
                                        this.initialize()
                                    })
                                }
                            }).catch(err => {
                                this.submitResult = false
                                this.importing = false
                                this.snackbar = true
                                this.snackbarMsg = err.message
                            })
                        })
                    }else{
                        console.log('-----取消-----');
                    }

                    this.importing = false
                })
                .catch((err) => {
                    console.log('-----异常取消-----');
                    console.log(err);
                })
            },

            _importData2(data_acline_trend,data_alternator_trend,data_load_trend) {
                return new Promise((resolve, reject) => {
                    try {
                        if(data_acline_trend.length > 0){//交流线
                            
                            let p_id = data_acline_trend[0].proj_id

                            data_acline_trend.forEach(item => {
                                console.log('item:'+JSON.stringify(item));
                                let proj_id = item.proj_id
                                let id_name = item.id_name
                                let valid = item.valid
                                let a_time = item.a_time
                                let sql = `INSERT INTO p_acline_trend_info (proj_id, id_name, valid, flag, a_time) VALUES (${proj_id}, '${id_name}', ${valid}, 0, '${a_time}')`;
                                console.log(sql);
                                // 插入主表
                                db.query(sql, function(err, values, fields) {
                                 })
                            })
                        }

                        if(data_alternator_trend.length > 0){//发电机线
                             
                            let p_id = data_alternator_trend[0].proj_id

                            data_alternator_trend.forEach(item => {
                                console.log('data_alternator_trend:'+JSON.stringify(item));                            

                                let proj_id = item.proj_id
                                let id_name = item.id_name
                                let valid = item.valid
                                let v0 = item.v0
                                let angle = item.angle
                                let qmax = item.qmax
                                let qmin = item.qmin
                                let pmax = item.pmax
                                let pmin = item.pmin
                                let a_time = item.a_time

                                let sql = `INSERT INTO p_alternator_trend_info (proj_id, id_name, valid, v0, angle, qmax, qmin, pmax, pmin, flag, a_time) VALUES (${proj_id}, '${id_name}', '${valid}', '${v0}', '${angle}', '${qmax}', '${qmin}', '${pmax}', '${pmin}', 0, '${a_time}')`;
                                console.log(sql);
                                // 插入主表
                                db.query(sql, function(err, values, fields) {
                                 })
                            })
                        }

                        if(data_load_trend.length > 0){//负荷表
                            
                            let p_id = data_load_trend[0].proj_id

                            data_load_trend.forEach(item => {
                                console.log('data_load_trend:'+JSON.stringify(item));                            

                                let proj_id = item.proj_id
                                let id_name = item.id_name
                                let pl = item.pl
                                let ql = item.ql
                                let a_time = item.a_time

                                let sql = `INSERT INTO p_load_trend_info (proj_id, id_name, pl, ql, flag, a_time) VALUES (${proj_id}, '${id_name}', '${pl}', '${ql}', 0, '${a_time}')`;
                                console.log(sql);

                                // 插入主表
                                db.query(sql, function(err, values, fields) {
                                 })
                            })
                        }

                        resolve({
                            code: 200
                        })
                    } catch (err) {
                        return reject({
                            code: 400,
                            message: err.message
                        })
                    }
                })
            },

            importLocalFile3(dataitem) {
                console.log('数据:'+JSON.stringify(dataitem));
                // console.log('数据:'+db.query);
                let proj_id = dataitem.id

                this.importing = true

                // 弹出文件选择框
                remote.dialog.showOpenDialog({
                    // title: '请选择需要导入的文件',
                    defaultPath: this.exportPath,
                    // buttonLabel: '确认',
                    // 过滤
                    filters: [
                        {name: 'xlsx', extensions: ['xlsx']}
                    ],
                    // 包含功能
                    properties: ['openFile']
                }).then((result) => {
                    // console.log('-----回调-----');
                    // console.log(result);
                    // console.log('是否取消:'+result.canceled+'文件路径:'+result.filePaths);
                    if(!result.canceled){
                        // 读取文件
                        const workbook = new Excel.Workbook()
                        workbook.xlsx.readFile(result.filePaths[0]).then(() => {
                            // 重新结构化数据
                            let data_alternator_result = []
                            let data_tw_transformer_result = []
                            let data_threew_transformer_result = []

                            // 获取工作表
                            const alternator_result = workbook.getWorksheet(1);//发电机
                            const tw_transformer_result = workbook.getWorksheet(2);//两绕组变压器结果报表
                            const threew_transformer_result = workbook.getWorksheet(3);//三绕组变压器结果报表

                            // 发电机表
                            alternator_result.eachRow(function (row, rowNumber) {
                                // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values))
                                // 去掉两行表头
                                if (rowNumber > 3) {
                                    // 重新组织数据，excel无论单元格还是行都是从1开始的
                                    let model = {
                                        proj_id: proj_id,
                                        alternator_name: row.values[1],
                                        moline_name: row.values[2],
                                        type: row.values[3],
                                        active_power_generation: row.values[4],
                                        reactive_power_generation: row.values[5],
                                        a_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                    }

                                    data_alternator_result.push(model)
                                }
                            })

                            // 两绕组变压器结果报表
                            tw_transformer_result.eachRow(function (row,rowNumber){
                                if (rowNumber > 3) {
                                    // 重新组织数据，excel无论单元格还是行都是从1开始的
                                    const model = {
                                        proj_id: proj_id,
                                        name: row.values[1],
                                        j_cmx: row.values[2],
                                        c_active_power_generation: row.values[3],
                                        c_reactive_power_generation: row.values[4],
                                        a_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                    }

                                    data_tw_transformer_result.push(model)
                                }
                            })

                            // 负荷表
                            threew_transformer_result.eachRow(function (row,rowNumber){
                                if (rowNumber > 3) {
                                    // 重新组织数据，excel无论单元格还是行都是从1开始的
                                    const model = {
                                        proj_id: proj_id,
                                        name: row.values[1],
                                        side_bus1: row.values[2],
                                        side_bus2: row.values[3],
                                        side_bus3: row.values[4],
                                        active_power_generation1: row.values[5],
                                        reactive_power_generation1: row.values[6],
                                        active_power_generation2: row.values[7],
                                        reactive_power_generation2: row.values[8],
                                        active_power_generation3: row.values[9],
                                        reactive_power_generation3: row.values[10],
                                        a_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                    }

                                    data_threew_transformer_result.push(model)
                                }
                            })

                            // 业务处理
                            // console.log(data)
                            this._importData3(data_alternator_result,data_tw_transformer_result,data_threew_transformer_result).then(result => {
                                if (result.code === 200) {
                                    this.submitResult = true
                                    this.importing = false
                                    this.snackbar = true
                                    this.snackbarMsg = 'Successfully imported'

                                    // 刷新所有列表
                                    Promise.all([this._getCategoryAll(), this._getAssetsAll()]).then(result => {
                                        this.initialize()
                                    })
                                }
                            }).catch(err => {
                                this.submitResult = false
                                this.importing = false
                                this.snackbar = true
                                this.snackbarMsg = err.message
                            })
                        })
                    }else{
                        console.log('-----取消-----');
                    }

                    this.importing = false
                })
                .catch((err) => {
                    console.log('-----异常取消-----');
                    console.log(err);
                })
            },

            _importData3(data_alternator_result,data_tw_transformer_result,data_threew_transformer_result) {
                return new Promise((resolve, reject) => {
                    try {
                        if(data_alternator_result.length > 0){//发电机
                            
                            let p_id = data_alternator_result[0].proj_id

                            data_alternator_result.forEach(item => {
                                // console.log('item:'+JSON.stringify(item));
                                let proj_id = item.proj_id
                                let alternator_name = item.alternator_name
                                let moline_name = item.moline_name
                                let type = item.type
                                let active_power_generation = item.active_power_generation
                                let reactive_power_generation = item.reactive_power_generation
                                let a_time = item.a_time
                                let sql = `INSERT INTO p_alternator_result_info (proj_id, alternator_name, moline_name, type, active_power_generation, reactive_power_generation, flag, a_time) VALUES (${proj_id}, '${alternator_name}', '${moline_name}', '${type}', '${active_power_generation}', '${reactive_power_generation}', 0, '${a_time}')`;
                                // console.log(sql);
                                // 插入主表
                                db.query(sql, function(err, values, fields) {
                                 })
                            })
                        }

                        if(data_tw_transformer_result.length > 0){//两绕组变压器
                             
                            let p_id = data_tw_transformer_result[0].proj_id

                            data_tw_transformer_result.forEach(item => {
                                console.log('data_tw_transformer_result:'+JSON.stringify(item));                            

                                let proj_id = item.proj_id
                                let name = item.name
                                let j_cmx = item.j_cmx
                                let c_active_power_generation = item.c_active_power_generation
                                let c_reactive_power_generation = item.c_reactive_power_generation
                                let a_time = item.a_time

                                let sql = `INSERT INTO p_tw_transformer_result_info (proj_id, name, j_cmx, c_active_power_generation, c_reactive_power_generation, flag, a_time) VALUES (${proj_id}, '${name}', '${j_cmx}', '${c_active_power_generation}', '${c_reactive_power_generation}', 0, '${a_time}')`;
                                console.log(sql);
                                // 插入主表
                                db.query(sql, function(err, values, fields) {
                                 })
                            })
                        }

                        if(data_threew_transformer_result.length > 0){//负荷表
                            
                            let p_id = data_threew_transformer_result[0].proj_id

                            data_threew_transformer_result.forEach(item => {
                                // console.log('data_threew_transformer_result:'+JSON.stringify(item));                            

                                let proj_id = item.proj_id
                                let name = item.name
                                let side_bus1 = item.side_bus1
                                let side_bus2 = item.side_bus2
                                let side_bus3 = item.side_bus3
                                let active_power_generation1 = item.active_power_generation1
                                let reactive_power_generation1 = item.reactive_power_generation1
                                let active_power_generation2 = item.active_power_generation2
                                let reactive_power_generation2 = item.reactive_power_generation2
                                let active_power_generation3 = item.active_power_generation3
                                let reactive_power_generation3 = item.reactive_power_generation3
                                let a_time = item.a_time

                                let sql = `INSERT INTO p_threew_transformer_result_info (proj_id, name, side_bus1, side_bus2, side_bus3, active_power_generation1, reactive_power_generation1, active_power_generation2, reactive_power_generation2, active_power_generation3, reactive_power_generation3,flag,a_time) VALUES (${proj_id}, '${name}', '${side_bus1}', '${side_bus2}', '${side_bus3}', '${active_power_generation1}', '${reactive_power_generation1}', '${active_power_generation2}', '${reactive_power_generation2}', '${active_power_generation3}', '${reactive_power_generation3}', 0, '${a_time}')`;
                                // console.log(sql);

                                // 插入主表
                                db.query(sql, function(err, values, fields) {
                                 })
                            })
                        }

                        resolve({
                            code: 200
                        })
                    } catch (err) {
                        return reject({
                            code: 400,
                            message: err.message
                        })
                    }
                })
            },

            importLocalFile4(dataitem) {
                console.log('数据:'+JSON.stringify(dataitem));
                // console.log('数据:'+db.query);
                let proj_id = dataitem.id

                this.importing = true

                // 弹出文件选择框
                remote.dialog.showOpenDialog({
                    // title: '请选择需要导入的文件',
                    defaultPath: this.exportPath,
                    // buttonLabel: '确认',
                    // 过滤
                    filters: [
                        {name: 'xlsx', extensions: ['xlsx']}
                    ],
                    // 包含功能
                    properties: ['openFile']
                }).then((result) => {
                    // console.log('-----回调-----');
                    // console.log(result);
                    // console.log('是否取消:'+result.canceled+'文件路径:'+result.filePaths);
                    if(!result.canceled){
                        // 读取文件
                        const workbook = new Excel.Workbook()
                        workbook.xlsx.readFile(result.filePaths[0]).then(() => {
                            // 重新结构化数据
                            let data_component_branch_result = []

                            // 获取工作表
                            const component_branch = workbook.getWorksheet(1);//元件支路表

                            // 发电机表
                            component_branch.eachRow(function (row, rowNumber) {
                                // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values[2]))
                                let names = row.values[2];
                                let name = names;
                                if(names instanceof Array){
                                    for(let i = 0;i < names.length;i++){
                                        name += names[i].text 
                                    }
                                }
                                // 去掉两行表头
                                if (rowNumber > 1) {
                                    // 重新组织数据，excel无论单元格还是行都是从1开始的
                                    let model = {
                                        proj_id: proj_id,
                                        serial_number: row.values[1],
                                        name: name,
                                        first_node: row.values[3],
                                        last_node: row.values[4],
                                        type: row.values[5],
                                        run_state: row.values[6],
                                        a_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                    }

                                    data_component_branch_result.push(model)
                                }
                            })

                            // 业务处理
                            // console.log(data)
                            this._importData4(data_component_branch_result).then(result => {
                                if (result.code === 200) {
                                    this.submitResult = true
                                    this.importing = false
                                    this.snackbar = true
                                    this.snackbarMsg = 'Successfully imported'

                                    // 刷新所有列表
                                    Promise.all([this._getCategoryAll(), this._getAssetsAll()]).then(result => {
                                        this.initialize()
                                    })
                                }
                            }).catch(err => {
                                this.submitResult = false
                                this.importing = false
                                this.snackbar = true
                                this.snackbarMsg = err.message
                            })
                        })
                    }else{
                        console.log('-----取消-----');
                    }

                    this.importing = false
                })
                .catch((err) => {
                    console.log('-----异常取消-----');
                    console.log(err);
                })
            },

            _importData4(data_component_branch_result) {
                return new Promise((resolve, reject) => {
                    try {
                        if(data_component_branch_result.length > 0){//发电机
                            
                            let p_id = data_component_branch_result[0].proj_id

                            data_component_branch_result.forEach(item => {
                                // console.log('item:'+JSON.stringify(item));
                                let proj_id = item.proj_id
                                let serial_number = item.serial_number
                                let name = item.name
                                let first_node = item.first_node
                                let last_node = item.last_node
                                let type = item.type
                                let run_state = item.run_state
                                let a_time = item.a_time

                                let sql = `INSERT INTO p_component_branch_info (proj_id, serial_number, name, first_node, last_node, type, run_state, flag, a_time) VALUES (${proj_id}, '${serial_number}', '${name}', '${first_node}', '${last_node}', '${type}','${run_state}', 0, '${a_time}')`;

                                // 插入主表
                                db.query(sql, function(err, values, fields) {
                                 })
                            })
                        }

                        resolve({
                            code: 200
                        })
                    } catch (err) {
                        return reject({
                            code: 400,
                            message: err.message
                        })
                    }
                })
            },

            importLocalFile5(dataitem) {
                console.log('数据:'+JSON.stringify(dataitem));
                // console.log('数据:'+db.query);
                let proj_id = dataitem.id

                this.importing = true

                // 弹出文件选择框
                remote.dialog.showOpenDialog({
                    // title: '请选择需要导入的文件',
                    defaultPath: this.exportPath,
                    // buttonLabel: '确认',
                    // 过滤
                    filters: [
                        {name: 'xlsx', extensions: ['xlsx']}
                    ],
                    // 包含功能
                    properties: ['openFile']
                }).then((result) => {
                    // console.log('-----回调-----');
                    // console.log(result);
                    // console.log('是否取消:'+result.canceled+'文件路径:'+result.filePaths);
                    if(!result.canceled){
                        // 读取文件
                        const workbook = new Excel.Workbook()
                        workbook.xlsx.readFile(result.filePaths[0]).then(() => {
                            // 重新结构化数据
                            let data_component_reliability_result = []

                            // 获取工作表
                            const component_reliability = workbook.getWorksheet(1);//元件可靠性
                            console.log(workbook);
    
                            // 元件可靠性
                            component_reliability.eachRow(function (row, rowNumber) {
                                // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values))
                                // 去掉两行表头
                                if (rowNumber > 1) {
                                    // 重新组织数据，excel无论单元格还是行都是从1开始的
                                    let model = {
                                        proj_id: proj_id,
                                        branch_type: row.values[1],
                                        failure_rate: row.values[2],
                                        repair_time: row.values[3],
                                        a_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                    }

                                    data_component_reliability_result.push(model)
                                }
                            })

                            // 业务处理
                            // console.log(data)
                            this._importData5(data_component_reliability_result).then(result => {
                                if (result.code === 200) {
                                    this.submitResult = true
                                    this.importing = false
                                    this.snackbar = true
                                    this.snackbarMsg = 'Successfully imported'

                                    // 刷新所有列表
                                    Promise.all([this._getCategoryAll(), this._getAssetsAll()]).then(result => {
                                        this.initialize()
                                    })
                                }
                            }).catch(err => {
                                this.submitResult = false
                                this.importing = false
                                this.snackbar = true
                                this.snackbarMsg = err.message
                            })
                        })
                    }else{
                        console.log('-----取消-----');
                    }

                    this.importing = false
                })
                .catch((err) => {
                    console.log('-----异常取消-----');
                    console.log(err);
                })
            },

            _importData5(data_component_reliability_result) {
                return new Promise((resolve, reject) => {
                    try {
                        if(data_component_reliability_result.length > 0){//发电机
                            
                            let p_id = data_component_reliability_result[0].proj_id

                            data_component_reliability_result.forEach(item => {
                                // console.log('item:'+JSON.stringify(item));
                                let proj_id = item.proj_id
                                let branch_type = item.branch_type
                                let failure_rate = item.failure_rate
                                let repair_time = item.repair_time
                                let a_time = item.a_time

                                let sql = `INSERT INTO p_component_reliability_info (proj_id, branch_type, failure_rate, repair_time, flag, a_time) VALUES (${proj_id}, '${branch_type}', '${failure_rate}', '${repair_time}', 0, '${a_time}')`;

                                // 插入主表
                                db.query(sql, function(err, values, fields) {
                                 })
                            })
                        }

                        resolve({
                            code: 200
                        })
                    } catch (err) {
                        return reject({
                            code: 400,
                            message: err.message
                        })
                    }
                })
            },

            _getModelExport() {
                return new Promise((resolve, reject) => {
                    try {
                        let whereAttrs = {
                            dateStart: this.search.dateStart,
                            dateEnd: this.search.dateEnd
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

                        getModelExport(filterFun).then(result => {
                            // if (result.code === 200 && result.data.length) {
                            // 可以导出空的
                            if (result.code === 200) {
                                let items = result.data

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

                                        if (item.type === 'i') {
                                            item.type = 'Income'
                                        } else {
                                            item.type = 'Expenditure'
                                        }
                                    })
                                }

                                resolve({
                                    code: 200,
                                    data: items
                                })
                            }
                        }).catch(err => {
                            return reject({
                                code: 400,
                                message: err.message
                            })
                        })
                    } catch (err) {
                        return reject({
                            code: 400,
                            message: err.message
                        })
                    }
                })
            },

            _getCategoryAll() {
                getCategoryAll().then(result => {
                    if (result.code === 200) {
                        this.categoryList = result.data.map(item => {
                            return {text: item.category, value: item.id}
                        })
                    }
                })
            },

            _getAssetsAll() {
                getAssetsAll().then(result => {
                    if (result.code === 200) {
                        this.assetsList = result.data.map(item => {
                            return {text: item.assetsName, value: item.id}
                        })
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
.projectmgr-container-list {
    ::v-deep .v-btn--floating .v-btn__content {
        height: auto !important;    
    }
}
</style>
