<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-card-text class="work-form">
                    
                    <!-- 登陆表单 -->
                    <div class="text-h3">个人信息修改</div>
                    <v-form
                        ref="loginForm"
                        v-model="loginValid"
                        lazy-validation
                    >
                        <v-text-field
                            v-model="loginForm.name"
                            :rules="nameRules"
                            label="账户名称"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="loginForm.info"
                            :rules="infoRules"
                            label="账户信息"
                            required
                        ></v-text-field>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="handleSaveCurrent" color="success">保存</v-btn>
                            <!--
                            <v-btn text @click="resetValidation">取消</v-btn>
                            -->
                        </v-card-actions>
                    </v-form>

                    <!-- 登陆成功之后 -->
                    <div class="text-h3" v-if="currentUser.type=='00'">用户信息管理</div>
                    <div class="user-box row-flex row-flex-start" v-if="currentUser.type=='00'">
                        <div>
                            <v-toolbar dark>用户信息管理</v-toolbar>
                            <select multiple="multiple" class="multiple-select" v-model="parentValue">
                                <option v-for="(item, index) in userList" :key="index" :value="item.id">{{item.name}}</option>
                            </select>
                        </div>
                        <div class="btn-group">
                            <v-dialog
                                v-model="addDialog"
                                persistent
                                max-width="400"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" color="success">添加</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title class="text-h3">新建用户</v-card-title>
                                    <v-card-text>
                                        <v-form
                                            ref="addForm"
                                            lazy-validation
                                            class="pd-8"
                                        >
                                            <v-text-field
                                                v-model="addForm.user"
                                                :rules="useNameRules"
                                                label="登录名"
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="addForm.password"
                                                :rules="passwordRules"
                                                label="密码"
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="addForm.name"
                                                :rules="useNameRules"
                                                label="用户名"
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="addForm.info"
                                                :rules="useNameRules"
                                                label="用户信息"
                                            ></v-text-field>
                                        </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn text @click="addDialog = false">取消</v-btn>
                                        <v-btn text @click="saveUser" color="success">保存</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            
                            <v-btn>删除</v-btn>
                        </div>
                    </div>
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
import { modifyInfo, getAll} from '../../../../api/user'

const electron = require('electron');
const remote = electron.remote;

export default {
    data() {
        let isConfirmPassword = (value) => {
            return this.addForm.password === value;
        };
        return {
            snackbar: false,
            snackbarMsg: '',
            submitResult: false,

            // 登陆
            parentValue: [
                {id:'00', name:'管理员'},
                {id:'10', name:'普通用户'}
            ],
            currentUser: remote.getGlobal('sharedObject').loginedUser,
            loginValid: true,
            loginForm: {
                name: '',
                info: ''
            },
            
            nameRules: [
                v => !!v || '请输入账户名称',
                v => (v && v.length <= 10) || '长度不能小于10'
            ],
            infoRules: [
                v => !!v || '请输入账户信息'
            ],
            // 用户管理
            userList: [],
            addDialog: false,
            addForm: {
                name: '',
                user: '',
                info: '',
                password: ''
            },
            useNameRules: [
                v => !!v || '请输入用户信息'
            ],
            passwordRules: [
                v => !!v || '请输入密码',
                v => (v && v.length <= 6) || '长度不能小于6'
            ],
            repasswordRules: [
                v => !isConfirmPassword(v) || '确保新旧密码一样',
            ]
        }
    },
    mounted() {
        console.log('currentUser', this.currentUser)
        this.loginForm.name = this.currentUser.name
        this.loginForm.info = this.currentUser.info
        this.getAllUsers()
    },
    methods: {
        getAllUsers() {
            getAll().then(result => {
                if (result.code === 200) {
                    this.userList = result.data
                }
            })
        },
        handleSaveCurrent() {
            if(this.$refs.loginForm.validate()) {
                modifyInfo(this.currentUser.id, this.loginForm)
            }
        },
        resetValidation () {
            this.$refs.loginForm.resetValidation()
        },
        saveUser() {
            console.log(this.addForm)
            console.log('开始保存', this.$refs.addForm.validate())
            if(this.$refs.addForm.validate()) {
                modifyInfo(0, this.addForm).then(result => {
                    this.addDialog = false
                    if(result.code === 200) {
                        this.submitResult = true
                        this.snackbar = true
                        this.getAllUsers()
                    } else {
                        this.submitResult = true
                        this.snackbarMsg = '保存失败'
                        this.snackbar = true
                    }
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.work-form {
    width: 600px;
    margin: 20px auto 40px;
}
.row-flex {
    display: flex;
    align-items: center;
}
.row-flex-start {
    align-items: flex-start;
}
.text-h3 {
    font-size: 16px;
    font-weight: bold;
}
.multiple-select {
    width: 240px;
    height: 160px;
    outline: none;
    border: 1px solid #666;
    border-top: none;
    box-sizing: border-box;
    padding: 10px;
}
.user-box {
    margin: 20px 0 0 0;
}
.btn-group {
    width: 100px;
    margin: 0 0 0 20px;
}
</style>
