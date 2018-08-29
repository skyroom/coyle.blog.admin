<template>
<div>
    <Form :model="modifyForm" :label-width="80" ref="modifyForm" :rules="modifyFormRule">
        <FormItem label="标题" prop="title">
            <Input v-model="modifyForm.title" placeholder="请输入文章标题"></Input>
        </FormItem>
        <FormItem label="文章简介" prop="short">
            <Input v-model="modifyForm.short" placeholder="请输入文章简介"></Input>
        </FormItem>
        <FormItem label="文章内容" prop="content">
            <mavon-editor ref="md" v-model="modifyForm.content" @imgAdd="$imgAdd" placeholder="请输入文章内容" />
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit">提交</Button>
            <Button @click="handleBack" style="margin-left: 8px">返回</Button>
        </FormItem>
    </Form>
</div>
</template>

<script>
import {
    mapMutations,
    mapActions
} from 'vuex';
import Vue from 'vue';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import axios from '@/libs/axios'

Vue.use(mavonEditor);

export default {
    name: 'articlesList',
    data() {
        return {
            mode: '',
            modifyForm: {
                title: '',
                short: '',
                content: '',
                // tag: '',
                createdAt: '',
            },
            modifyFormRule: {
                title: [{
                    required: true,
                    message: '文章标题不能为空',
                    trigger: 'blur'
                }],
                short: [{
                    required: true,
                    message: '文章简介不能为空',
                    trigger: 'blur'
                }],
                content: [{
                    required: true,
                    message: '文章内容不能为空',
                    trigger: 'blur'
                }],
            },
        }
    },
    computed: {},
    methods: {
        ...mapActions([
            'addArticle',
            'editArticle',
            'getArticleList',
        ]),
        // 绑定@imgAdd event
        $imgAdd(pos, $file) {
            // 第一步.将图片上传到服务器.
            var formdata = new FormData();
            formdata.append('file', $file);
            axios({
                url: '/blog/back/upload',
                method: 'post',
                data: formdata,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then((data) => {
                console.log('url is ', data.data);
                // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                // $vm.$img2Url 详情见本页末尾
                this.$refs.md.$img2Url(pos, data.data);
            })
        },
        handleBack() {
            this.$router.go(-1);
        },
        handleSubmit() {
            console.log(this.modifyForm);
            this.$refs['modifyForm'].validate((valid) => {
                if (valid) {
                    if (this.mode === 'add') {
                        this.addArticle(this.modifyForm)
                            .then((data) => {
                                if (data.code == 200) {
                                    this.$router.go(-1);
                                } else {
                                    this.$Notice.error({
                                        title: data.msg
                                    });
                                }
                            });
                    } else if (this.mode === 'edit') {
                        console.log('this.modifyForm is', this.modifyForm);
                        this.editArticle({
                                id: this.$route.params.id,
                                data: this.modifyForm
                            })
                            .then((data) => {
                                if (data.code == 200) {
                                    this.$router.go(-1);
                                } else {
                                    this.$Notice.error({
                                        title: data.msg
                                    });
                                }
                            });
                    }
                } else {
                    this.$Notice.error({
                        title: '您的输入有误'
                    });
                }
            })

        },
        getArticleListHandle(data) {
            this.getArticleList(data)
                .then((data) => {
                    this.$set(this.modifyForm, 'title', data.data[0].title);
                    this.$set(this.modifyForm, 'short', data.data[0].short);
                    this.$set(this.modifyForm, 'content', data.data[0].content);
                    this.$set(this.modifyForm, 'createdAt', data.data[0].createdAt);
                })
                .catch(() => {
                    this.$Notice.error({
                        title: err.msg || err
                    });
                });
        },
    },
    mounted() {
        if (this.$route.params.id) {
            this.$set(this, 'mode', 'edit');
            this.getArticleListHandle({
                id: this.$route.params.id
            });
        } else {
            this.$set(this, 'mode', 'add');
        }
    }
}
</script>

<style lang="less">
.add-button {
    margin-bottom: 20px;
}
</style>
