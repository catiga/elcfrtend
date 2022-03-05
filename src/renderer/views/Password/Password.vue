<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-card-title>
                    <span class="headline">修改密码</span>
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
                                <v-flex xs12>
                                    <v-text-field
                                            v-model="name"
                                            label="用户"
                                            required
                                            disabled
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                            v-model="password1"
                                            :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                            :rules="[rules.required, rules.min]"
                                            :type="show1 ? 'text' : 'password'"
                                            name="input-10-1"
                                            label="旧密码*"
                                            hint="At least 6 characters"
                                            counter
                                            @click:append="show1 = !show1"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                            v-model="password2"
                                            :append-icon="show2 ? 'visibility' : 'visibility_off'"
                                            :rules="[rules.required, rules.min]"
                                            :type="show2 ? 'text' : 'password'"
                                            name="input-10-1"
                                            label="新密码*"
                                            hint="At least 6 characters"
                                            counter
                                            @click:append="show2 = !show2"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*代表必填项</small>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click="saveEdit">保存</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
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

    import {ipcRenderer} from 'electron'
    import {putModelById, getModelWhere} from '../../../api/user'

    export default {
        data() {
            return {
                // 表单相关
                valid: true,
                show1: false,
                show2: false,
                name: 'admin',
                password1: '',
                password2: '',
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 5) || 'Name must be less than 10 characters'
                ],
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 6 || 'Min 6 characters',
                    emailMatch: () => ('The email and password you entered don\'t match')
                },
                // 操作提示
                submitResult: false,
                snackbar: false,
                snackbarMsg: ''
            }
        },

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },
        watch: {
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

        },
        methods: {
            saveEdit() {
                if (this.$refs.form.validate()) {
                    // 查找对象
                    getModelWhere({userId: this.name, password: this.password1}).then(result => {
                        if (result.code === 200 && result.data.length) {
                            const model = result.data[0]
                            putModelById(model.id, {userId: this.name, password: this.password2}).then(result => {
                                if (result.code === 200) {
                                    this.submitResult = true

                                    // 重新登录
                                    ipcRenderer.send('openLoginWindow')
                                } else {
                                    this.submitResult = false
                                }
                                this.snackbar = true
                            }).catch(err => {
                                this.submitResult = false
                                this.snackbar = true
                                this.snackbarMsg = err.message
                            })
                        } else {
                            this.submitResult = false
                            this.snackbar = true
                            this.snackbarMsg = '旧密码检查失败'
                        }
                    }).catch(err => {
                        this.submitResult = false
                        this.snackbar = true
                        this.snackbarMsg = err.message
                    })
                }
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

    .v-card__actions {
        padding-bottom: 16px;
    }
</style>
