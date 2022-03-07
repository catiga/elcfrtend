<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-list three-line subheader>
                    <v-subheader>基准值修正</v-subheader>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>基准容量</v-list-tile-title>
                            <v-list-tile-sub-title>
                                <v-text-field
                                        v-model="benchValue"
                                        label="当前基准值容量"
                                        required
                                ></v-text-field>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <!--
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>Show data backup path</v-list-tile-title>
                            <v-list-tile-sub-title>
                                <a href="javascript:;" @click="openFile(backupPath)">{{backupPath}}</a>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>Show export files path</v-list-tile-title>
                            <v-list-tile-sub-title>
                                <a href="javascript:;" @click="openFile(exportPath)">{{exportPath}}</a>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-list three-line subheader>
                    <v-subheader>General</v-subheader>
                    <v-list-tile href="javascript:;">
                        <v-list-tile-action>
                            <v-btn fab dark small color="primary" :disabled="backuping" :loading="backuping"
                                   @click="backup">
                                <v-icon dark>cloud_download</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Backup data</v-list-tile-title>
                            <v-list-tile-sub-title>It is recommended to back up weekly</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile href="javascript:;">
                        <v-list-tile-action>
                            <v-btn fab dark small color="primary" :disabled="recovering" :loading="recovering"
                                   @click="recovery">
                                <v-icon dark>history</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Recovery data</v-list-tile-title>
                            <v-list-tile-sub-title>It is recommended to back up data before recovery</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile href="javascript:;">
                        <v-list-tile-action>
                            <v-checkbox v-model="notifications" readonly></v-checkbox>
                        </v-list-tile-action>
                        <v-list-tile-content @click="notifications = !notifications">
                            <v-list-tile-title>Notifications</v-list-tile-title>
                            <v-list-tile-sub-title>Notify me about updates to apps or games that i downloaded
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile href="javascript:;">
                        <v-list-tile-action>
                            <v-checkbox v-model="autoStart"></v-checkbox>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Auto Start</v-list-tile-title>
                            <v-list-tile-sub-title>Boot automatically</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    -->

                    <v-list-tile>
                        <v-list-tile-content>
                            <v-btn class="error" large @click="save">保存</v-btn>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>

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
        </v-flex>
    </v-layout>
</template>

<script type="text/ecmascript-6">
    import {ipcRenderer, app, remote, shell} from 'electron'
    import pkg from '../../../../../package'

    import {
        loadProjectParams,
        saveProjectParams
    } from '../../../../api/projectMgr'

    export default {
        data: () => ({
            autoStart: false,
            notifications: true,
            showErrorSetting: false,
            backuping: false,
            recovering: false,
            userDataPath: '',
            backupPath: '',
            exportPath: '',
            dbFileName: `/${pkg.name}_lowdb.json`,
            // 操作提示
            submitResult: false,
            snackbar: false,
            snackbarMsg: '',

            benchValue: 0
        }),
        watch: {
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
        destroyed() {
            // 移除事件监听
            ipcRenderer.removeAllListeners('getAutoStartValue')
        },
        mounted() {
            let currentProject = remote.getGlobal('sharedObject').openedProject
            if (!currentProject) {
                this.snackbar = true
                this.snackbarMsg = '请先选择打开工程'
                return
            }
            loadProjectParams(currentProject).then(result => {
                console.log(result)
                if(result.code === 200) {
                    for (let x in result.data) {
                        if (result.data[x].param_k === 'bench_value') {
                            this.benchValue = result.data[x].param_v
                        }
                    }
                }
            }).catch(err => {
                this.submitResult = false
                this.snackbar = true
                this.snackbarMsg = err.message
            })
            if (process.env.NODE_ENV === 'production') {
                //this.getAutoStartValue()
            }
        },
        methods: {
            save() {
                let currentProject = remote.getGlobal('sharedObject').openedProject
                if (!currentProject) {
                    this.snackbar = true
                    this.snackbarMsg = '请先选择打开工程'
                    return
                }

                // this.$store.dispatch('FedLogOut')
                // ipcRenderer.send('loggedOut')
                //ipcRenderer.send('openLoginWindow')
                saveProjectParams(currentProject, {bench_value: this.benchValue}).then(result => {
                    if (result.code === 200) {
                        this.submitResult = true
                    } else {
                        this.submitResult = false
                    }
                    this.snackbarMsg = '操作成功'
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

<style scoped>

</style>
