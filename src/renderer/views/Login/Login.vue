<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height grid-list-md>
                <v-card
                        dark
                        class="mt-3 mx-auto"
                        max-width="300"
                        width="300"
                >
                    <v-sheet
                            style="-webkit-user-select: none;-webkit-app-region: drag"
                            class="v-sheet--offset mx-auto text-xs-center pa-2"
                            color="orange"
                            elevation="12"
                            max-width="calc(100% - 32px)"
                    >
                        <h2 class="">电网安全评估及过渡方案智能决策平台</h2>
                        <!--
                        <v-flex>
                            <v-btn small flat icon>
                                <v-icon>filter_1</v-icon>
                            </v-btn>
                            <v-btn small flat icon>
                                <v-icon>filter_2</v-icon>
                            </v-btn>
                            <v-btn small flat icon>
                                <v-icon>filter_3</v-icon>
                            </v-btn>
                        </v-flex>
                        -->
                    </v-sheet>

                    <v-card-text class="px-4">
                        <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                        >
                            <v-text-field
                                    v-model="name"
                                    :counter="10"
                                    :rules="nameRules"
                                    label="用户"
                                    required
                            ></v-text-field>

                            <v-text-field
                                    v-model="password"
                                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                    :rules="[rules.required, rules.min]"
                                    :type="show1 ? 'text' : 'password'"
                                    name="input-10-1"
                                    label="密码"
                                    hint="At least 6 characters"
                                    counter
                                    @click:append="show1 = !show1"
                            ></v-text-field>

                            <v-btn
                                    flat
                                    block
                                    color="orange"
                                    class="mt-4"
                                    @click="validate"
                                    :loading="loadingSubmit"
                            >
                                登录
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>

                <v-snackbar
                        v-model="ShowLoginErrMsg"
                        color="error"
                >
                    {{ loginErrMsg }}
                </v-snackbar>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import {ipcRenderer} from 'electron'
    import {login} from '~/api/user'

    export default {
        data: () => ({
            loadingSubmit: false,
            valid: true,
            show1: false,
            ShowLoginErrMsg: false,
            loginErrMsg: '',
            name: 'admin',
            password: '123456',
            nameRules: [
                v => !!v || '请输入用户名',
                v => (v && v.length <= 5) || '用户名小于10个字符'
            ],
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 6 || 'Min 6 characters',
                emailMatch: () => ('The email and password you entered don\'t match')
            }
        }),
        methods: {
            validate() {
                this.loadingSubmit = true
                if (this.$refs.form.validate()) {
                    setTimeout(()=> {
                        login({name: this.name, password: this.password}).then(result =>{
                            if(result) {
                                ipcRenderer.send('openMainWindow', result)
                            } else {
                                this.loadingSubmit = false
                                this.loginErrMsg = '用户或密码错误'
                                this.ShowLoginErrMsg = true
                            }
                        }).catch(err => {
                            this.loginErrMsg = err
                            this.ShowLoginErrMsg = true
                        })
                    }, 1000)
                } else {
                    this.loadingSubmit = false
                }
            }
        }
    }
</script>

<style scoped>
    .v-sheet--offset {
        top: -24px;
        position: relative;
    }

    .v-input {
        height: 70px;
    }

    .theme--light.application {
        background: none;
    }

    .container {
        padding: 10px;
    }
</style>
