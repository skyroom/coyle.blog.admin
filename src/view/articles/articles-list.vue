<template>
<div>
    <Button class="add-button" type="info" @click="addArticleHandle">添加文章</Button>
    <Table border :columns="columns" :data="articleList" :loading="loading"></Table>
</div>
</template>

<script>
import {
  mapMutations,
  mapActions
} from 'vuex'

const columns = [{
  title: '文章标题',
  key: 'title'
},
{
  title: '文章简介',
  key: 'short'
},
{
  title: '创建时间',
  key: 'createdAt'
},
{
  title: '操作',
  key: 'action',
  width: 150,
  align: 'center',
  render: (h, params) => {
    return h('div', [
      h('Button', {
        props: {
          type: 'primary',
          size: 'small'
        },
        style: {
          marginRight: '5px'
        },
        on: {
          click: () => {
            this.show(params.index)
          }
        }
      }, '编辑'),
      h('Button', {
        props: {
          type: 'error',
          size: 'small'
        },
        on: {
          click: () => {
            this.remove(params)
          }
        }
      }, '删除')
    ])
  }
}
]

export default {
  name: 'articlesList',
  data () {
    return {
      loading: true,
      columns: [{
        title: '文章标题',
        key: 'title'
      },
      {
        title: '文章简介',
        key: 'short'
      },
      {
        title: 'Action',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h, params) => {
          console.log('this is ', this)
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.show(params.index)
                }
              }
            }, '编辑'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.remove(params)
                }
              }
            }, '删除')
          ])
        }
      }
      ]
    }
  },
  computed: {
    articleList () {
      return this.$store.state.article.articleList
    }
  },
  methods: {
    ...mapActions([
      'getArticleList'
    ]),
    addArticleHandle () {
      this.$router.push('/article/add')
    },
    remove () {
      this.$Modal.confirm({
        title: '确定要删除此篇文章吗？',
        loading: true,
        onOk: () => {
          console.log('点击确认')
        }
      })
    },
    getArticleListHandle () {
      this.getArticleList()
        .then(() => {
          this.$set(this, 'loading', false)
        })
        .catch((err) => {
          this.$Notice.error({ title: err.msg || err })
        })
    }
  },
  mounted () {
    this.getArticleListHandle()
  }
}
</script>

<style lang="less">
.add-button {
    margin-bottom: 20px;
}
</style>
