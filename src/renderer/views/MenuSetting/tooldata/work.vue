<template>
    <v-layout>
        <div class="work-container">
            <!-- 标题 -->
            <div class="title">作业定义</div>
            <!-- 表单 -->
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="work-form"
            >
                <div class="row-flex">
                    <v-text-field
                        v-model="workForm.name"
                        :rules="nameRules"
                        label="作业名称"
                        required
                    ></v-text-field>

                    <!--
                    <v-dialog
                        v-model="dialog"
                        persistent
                        max-width="400"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" color="primary">新建</v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="text-h3">新建</v-card-title>
                            <v-card-text>
                                <v-form
                                    ref="form"
                                    v-model="addvalid"
                                    lazy-validation
                                    class="pd-8"
                                >
                                    <v-text-field
                                        v-model="addForm.name"
                                        label="Name"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="addForm.name"
                                        label="Name"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn text @click="dialog = false">取消</v-btn>
                                <v-btn text @click="dialog = false" color="success">保存</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    -->
                </div>

                <v-select
                    v-model="workForm.base_kv"
                    :items="vol_items"
                    item-text="base_kv"
                    item-value="base_kv"
                    :rules="[v => !!v || '请选择电压等级']"
                    label="检修电压等级"
                    @change="selKv"
                    required
                ></v-select>
                <v-autocomplete
                    v-model="workForm.station_name"
                    :items="bus_items"
                    item-text="bus_name"
                    item-value="bus_name"
                    :rules="[v => !!v || '请选择检修厂站']"
                    label="检修厂站选择"
                    @change="selBus"
                    required
                ></v-autocomplete>

                <v-select
                    v-model="workForm.station_enum"
                    :items="station_enum"
                    item-text="text"
                    item-value="val"
                    :rules="[v => !!v || '是否需要站内故障枚举']"
                    label="仅进行站内故障枚举"
                    required
                ></v-select>
                
                <v-list-tile>
                    <v-list-tile-content>
                        <v-btn class="error" large @click="save">保存</v-btn>
                    </v-list-tile-content>
                </v-list-tile>
            </v-form>
        </div>

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
import {ipcRenderer, app, remote, shell} from 'electron'
import {
    loadProjectParams,
    saveProjectParams,
    loadVolItems,
    loadBusItems
} from '../../../../api/work/manager'
export default {
    data() {
        return {
            valid: true,
            addvalid: true,
            dialog: false,
            workForm: { // 表单提交数据
                name: '',
                base_kv: '',
                station_code: '',
                station_name: '',
                station_enum: ''
            },
            addForm: {},

            // 操作提示
            submitResult: false,
            snackbar: false,
            snackbarMsg: '',

            bus_items: [],
            vol_items: [],
            station_enum: [
                {val:"1", text:"是"},
                {val:"0", text:"否"}
            ],

            nameRules: [
                name => !!name || '请输入作业名称',
                name => (name && name.length <= 3) || '请输入作业名称',
            ]
        }
    },
    mounted() {
        let currentProject = remote.getGlobal('sharedObject').openedProject
        if (!currentProject) {
            this.snackbar = true
            this.snackbarMsg = '请先选择打开工程'
            return
        }
        loadProjectParams(currentProject).then(result => {
            if(result.code === 200 && result.data && result.data.length>0) {
                this.workForm.name = result.data[0]['name']
                this.workForm.station_code = result.data[0]['station_code']
                this.workForm.station_name = result.data[0]['station_name']
                this.workForm.base_kv = result.data[0]['base_kv']
                this.workForm.station_enum = "" + result.data[0]['in_station']
                console.log("对表单的肤质：", this.workForm)
                this.selKv(this.workForm.base_kv)
            }
        }).catch(err => {
            this.submitResult = false
            this.snackbar = true
            this.snackbarMsg = err.message
        })
        this.kvItemData()
        if (process.env.NODE_ENV === 'production') {
            //this.getAutoStartValue()
        }
    },
    methods: {
        selBus(bus_name) {
            for(let x in this.bus_items) {
                if(this.bus_items[x].bus_name === bus_name) {
                    this.workForm.station_code = this.bus_items[x].code
                    this.workForm.station_name = this.bus_items[x].bus_name
                }
            }
        },
        selKv(item) {
            loadBusItems(item).then(result => {
                if(result.code === 200) {
                    this.bus_items = result.data
                    this.workForm.base_kv = item
                }
            })
        },
        kvItemData() {
            let currentProject = remote.getGlobal('sharedObject').openedProject
            if (!currentProject) {
                this.snackbar = true
                this.snackbarMsg = '请先选择打开工程'
                return
            }
            loadVolItems(currentProject).then(result => {
                console.log('result===', result)
                if(result.code === 200) {
                    this.vol_items = result.data
                }
            })
        },
        save() {
            let currentProject = remote.getGlobal('sharedObject').openedProject
            if (!currentProject) {
                this.snackbar = true
                this.snackbarMsg = '请先选择打开工程'
                return
            }
            if(!this.workForm.base_kv) {
                this.snackbar = true
                this.snackbarMsg = '请选择检修电压等级'
                return
            }
            if(!this.workForm.station_name) {
                this.snackbar = true
                this.snackbarMsg = '请选择检修厂站'
                return
            }
            saveProjectParams(currentProject, this.workForm).then(result => {
                if (result.code === 200) {
                    this.snackbarMsg = '操作成功'
                    this.submitResult = true

                    let taskObj = result.data[0]
                    console.log('taskObj', taskObj)
                    this.$http.post(`http://127.0.0.1:8081/api/task/compute/${taskObj.id}`,  {
                        headers: {}
                    }).catch(function(error) {
                        console.log(error)
                    }).then(function(response) {
                        console.log(response)
                    })
                } else {
                    this.snackbarMsg = '操作失败'
                    this.submitResult = false
                }
                this.snackbar = true
            }).catch(err => {
                this.submitResult = false
                this.snackbar = true
                this.snackbarMsg = err.message
            })
        }
    }
}
</script>

<style type="text/css" lang="scss" scoped>
.work-container {
    align-self: start;
    width: 100%;
    .title {
        font-size: 16px;
        font-weight: bold;
    }
    .work-form {
        width: 600px;
        margin: 20px auto 40px;
        .row-flex {
            display: flex;
            align-items: center;
        }
    }
}
.text-h3 {
    font-size: 20px;
    font-weight: bold;
}
</style>
<style type="text/css" lang="scss">
::v-deep .v-btn--floating .v-btn__content {
    height: auto !important;    
}
</style>
