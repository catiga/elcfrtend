<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <!--<v-list three-line subheader>-->
                <!--<v-subheader>-->
                <!--User Controls-->
                <!--</v-subheader>-->
                <!--<v-list-tile>-->
                <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>Content filtering</v-list-tile-title>-->
                <!--<v-list-tile-sub-title>-->
                <!--Set the content filtering level to restrict appts that can be download-->
                <!--</v-list-tile-sub-title>-->
                <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
                <!--<v-list-tile>-->
                <!--<v-list-tile-content>-->
                <!--<v-list-tile-title>Password</v-list-tile-title>-->
                <!--<v-list-tile-sub-title>-->
                <!--Require password for purchase or use password to restrict purchase-->
                <!--</v-list-tile-sub-title>-->
                <!--</v-list-tile-content>-->
                <!--</v-list-tile>-->
                <!--</v-list>-->
                <!--<v-divider></v-divider>-->
                <v-list three-line subheader>
                    <v-subheader>
                        UserData
                    </v-subheader>
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>Show User data path</v-list-tile-title>
                            <v-list-tile-sub-title>
                                <a href="javascript:;" @click="openFile(userDataPath)">{{userDataPath}}</a>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
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
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-btn class="error" large @click="logout">logout</v-btn>
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
    import pkg from '../../../../package'
    import moment from 'moment'
    import fs from 'fs-extra'

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
            // ????????????
            submitResult: false,
            snackbar: false,
            snackbarMsg: ''
        }),
        watch: {
            snackbar: {
                handler(val) {
                    if (!val) {
                        // ????????????????????????
                        this.submitResult = false
                        this.snackbarMsg = ''
                    }
                }
            }
        },
        destroyed() {
            // ??????????????????
            ipcRenderer.removeAllListeners('getAutoStartValue')
        },
        mounted() {
            this.getUserDataPath()
            if (process.env.NODE_ENV === 'production') {
                this.getAutoStartValue()
            }
        },
        methods: {
            getUserDataPath() {
                const APP = process.type === 'renderer' ? remote.app : app
                this.userDataPath = APP.getPath('userData')
                this.backupPath = this.userDataPath + '/backup'
                this.exportPath = this.userDataPath + '/export'
            },
            openFile(path) {
                // ??????????????????????????????????????????,????????????,'??????'?????????
                shell.showItemInFolder(path)
                // ?????????????????????
                shell.beep()
                // ?????????????????????????????????????????????
                // shell.openItem(path)
            },
            backup() {
                this.backuping = true
                const backupFileName = moment(new Date()).format('YYYYMMDDHHMMSS') + 'Backup.json'

                // ???????????????????????????
                fs.ensureDir(this.backupPath).then(() => {
                    // ????????????
                    fs.copy(this.userDataPath + '/' + this.dbFileName, this.backupPath + '/' + backupFileName)
                        .then(() => {
                            this.backuping = false
                            this.snackbar = true
                            this.submitResult = true
                            this.snackbarMsg = 'Backup succeeded'
                        })
                        .catch(err => {
                            this.backuping = false
                            this.snackbar = true
                            this.submitResult = false
                            this.snackbarMsg = 'Backup failed'
                        })
                }).catch(err => {
                    this.backuping = false
                    this.snackbar = true
                    this.submitResult = false
                    this.snackbarMsg = 'Failed to create folder'
                })
            },
            recovery() {
                this.recovering = true

                // ?????????????????????
                remote.dialog.showOpenDialog({
                    // title: '??????????????????????????????',
                    defaultPath: this.backupPath,
                    // buttonLabel: '??????',
                    // ??????
                    filters: [
                        {name: 'json', extensions: ['json']}
                    ],
                    // ????????????
                    properties: ['openFile']
                }, (filepaths, bookmarks) => {
                    if (filepaths) {
                        // ???????????????
                        fs.remove(this.userDataPath + '/' + this.dbFileName).then(() => {
                            // ????????????
                            fs.copy(filepaths[0], this.userDataPath + '/' + this.dbFileName)
                                .then(() => {
                                    this.recovering = false
                                    this.snackbar = true
                                    this.submitResult = true
                                    this.snackbarMsg = 'Recovering succeeded'

                                    // ????????????
                                    remote.app.relaunch()
                                    // remote.app.quit()
                                    remote.app.exit()
                                })
                                .catch(err => {
                                    this.recovering = false
                                    this.snackbar = true
                                    this.submitResult = false
                                    this.snackbarMsg = 'Recovering failed'
                                })
                        }).catch(err => {
                            this.recovering = false
                            this.snackbar = true
                            this.submitResult = false
                            this.snackbarMsg = 'Error deleting old files'
                        })
                    } else {
                        this.recovering = false
                    }
                })
            },
            changeAutoStart() {
                if (this.autoStart) {
                    this.enableAutoStart()
                } else {
                    this.disableAutoStart()
                }
            },
            getAutoStartValue() {
                // ????????????????????????
                ipcRenderer.send('getAutoStartValue')
                ipcRenderer.on('getAutoStartValue', (event, result) => {
                    this.autoStart = result
                    // ?????????watch??????
                    this.$watch('autoStart', this.changeAutoStart)
                })
            },
            enableAutoStart() {
                // ??????????????????
                ipcRenderer.send('enableAutoStart')
            },
            disableAutoStart() {
                // ??????????????????
                ipcRenderer.send('disableAutoStart')
            },
            logout() {
                // this.$store.dispatch('FedLogOut')
                // ipcRenderer.send('loggedOut')
                ipcRenderer.send('openLoginWindow')
            }
        }
    }
</script>

<style scoped>

</style>
