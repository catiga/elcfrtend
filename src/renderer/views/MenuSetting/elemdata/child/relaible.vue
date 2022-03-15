<template>
    <v-layout row>
        <v-flex xs12 d-flex>
            <v-card>
                <v-card-text>
                    <div>元件可靠线参数</div>
                    <v-data-table
                        :headers="headers"
                        :items="desserts"
                    >
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.code }}</td>
                            <td>{{ props.item.shixiao }}</td>
                            <td>{{ props.item.time }}</td>
                            <td><v-btn fab dark small color="primary">
                                <v-icon dark @click="handleEdit(props.item)">edit</v-icon>
                            </v-btn></td>
                        </template>
                        <template v-slot:no-data>
                            <v-alert :value="true" color="error" icon="warning">
                                暂无数据 :(
                            </v-alert>
                        </template>
                    </v-data-table>

                    <!-- 弹窗 -->
                    <v-dialog max-width="500" v-model="showEditDialog" persistent>
                        <v-card>
                            <!--对话框的标题-->
                            <v-toolbar dense dark>
                                <v-toolbar-title>编辑</v-toolbar-title>
                            </v-toolbar>
                            <!--对话框的内容，表单-->
                            <v-card-text>
                                <!-- 表单 -->
                                <v-form
                                    ref="form"
                                    v-model="editValid"
                                    lazy-validation
                                    class="work-form"
                                >
                                    <v-select v-model="editForm.select" label="支路类型">
                                        <option v-for="(item, index) in typeList" :key="index" :value="item.id">{{item.name}}</option>
                                    </v-select>
                                    <v-text-field
                                        v-model="editForm.code"
                                        :rules="[v => !!v || '必填']"
                                        label="失效率（次/年）"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="editForm.code"
                                        :rules="[v => !!v || '必填']"
                                        label="修复时间（h）"
                                    ></v-text-field>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn text @click="showEditDialog = false" color="success">确定</v-btn>
                                        <v-btn text @click="showEditDialog = false">取消</v-btn>
                                    </v-card-actions>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-dialog>

                </v-card-text>
            </v-card>            
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                {
                    text: '支路类型',
                    align: 'start',
                    sortable: false,
                    value: 'code',
                },
                { text: '失效率（次/年）', sortable: false, value: 'shixiao' },
                { text: '修复时间（h）', sortable: false, value: 'time' },
                { text: '操作', sortable: false },
            ],
            desserts: [
                {
                    code: 'AC1201',
                    shixiao: '12',
                    time: '25',
                },
                {
                    code: 'AC1202',
                    shixiao: '12',
                    time: '25',
                },
            ],
            // 编辑
            editValid: true,
            showEditDialog: false,
            editForm: {
                code: '',
                select: ''
            },
            typeList: [
                { id: 1, name: 'type1' },
                { id: 2, name: 'type2' },
                { id: 3, name: 'type3' },
            ]
        }
    },
    methods: {
        // 编辑
        handleEdit() {
            this.showEditDialog = true
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
<style lang="scss">
.v-btn--floating .v-btn__content {
    height: auto !important;    
}
</style>
