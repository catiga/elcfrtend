<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-card-text class="work-form">
                    
                    <!-- 登陆表单 -->
                    <div class="text-h3">管理员登录</div>
                    <v-form
                        ref="loginForm"
                        v-model="loginValid"
                        lazy-validation
                        
                    >
                        <v-text-field
                            v-model="loginForm.acount"
                            :rules="nameRules"
                            label="管理员账户"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="loginForm.password"
                            :rules="passwordRules"
                            label="管理员密码"
                            required
                        ></v-text-field>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="handleLogin" color="success">确定</v-btn>
                            <v-btn text @click="resetValidation">取消</v-btn>
                        </v-card-actions>
                    </v-form>

                    <!-- 登陆成功之后 -->
                    <div class="text-h3">用户信息管理</div>
                    <div class="user-box row-flex row-flex-start">
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
                                            ref="form"
                                            lazy-validation
                                            class="pd-8"
                                        >
                                            <v-text-field
                                                v-model="addForm.name"
                                                :rules="useNameRules"
                                                label="新建用户"
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="addForm.password"
                                                :rules="passwordRules"
                                                label="密码"
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="addForm.repassword"
                                                :rules="repasswordRules"
                                                label="确认密码"
                                            ></v-text-field>
                                        </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn text @click="addDialog = false">取消</v-btn>
                                        <v-btn text @click="addDialog = false" color="success">保存</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            
                            <v-btn>删除</v-btn>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data() {
        let isConfirmPassword = (value) => {
            return this.addForm.password === value;
        };
        return {
            // 登陆
            loginValid: true,
            loginForm: {
                acount: '',
                password: ''
            },
            nameRules: [
                v => !!v || '请输入账号',
                v => (v && v.length <= 10) || '长度不能小于10'
            ],
            passwordRules: [
                v => !!v || '请输入密码'
            ],
            // 用户管理
            userList: [
                { id: 1, name: '用户1' },
                { id: 2, name: '用户2' },
                { id: 3, name: '用户3' },
            ],
            addDialog: false,
            addForm: {
                name: '',
                password: '',
                repassword: ''
            },
            useNameRules: [
                v => !!v || '请输入用户名',
                v => (v && v.length <= 10) || '长度不能小于10'
            ],
            passwordRules: [
                v => !!v || '请输入密码',
                v => (v && v.length <= 10) || '长度不能小于10'
            ],
            repasswordRules: [
                v => !isConfirmPassword(v) || '确保新旧密码一样',
            ]
        }
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate()
        },
        resetValidation () {
            this.$refs.loginForm.resetValidation()
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
