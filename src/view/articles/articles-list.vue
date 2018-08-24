<template>
<div>
    <Table border :columns="columns" :data="tableData"></Table>
</div>
</template>

<script>
import {
    mapMutations,
    mapActions
} from 'vuex';

const columns = [{
            title: 'Name',
            key: 'name',
            render: (h, params) => {
                return h('div', [
                    h('Icon', {
                        props: {
                            type: 'person'
                        }
                    }),
                    h('strong', params.row.name)
                ]);
            }
        },
        {
            title: 'Age',
            key: 'age'
        },
        {
            title: 'Address',
            key: 'address'
        },
        {
            title: 'Action',
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
                    }, 'View'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.remove(params.index)
                            }
                        }
                    }, 'Delete')
                ]);
            }
        }
    ];

    const tableData = [{
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park'
        },
        {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park'
        },
        {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park'
        },
        {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park'
        }
    ]

export default {
    name: 'articlesList',
    data() {
        return {
            columns,
            tableData,
        }
    },
    computed: {
        tagNavList() {
            return this.$store.state.article.articleList;
        },
    },
    methods: {
        ...mapActions([
            'getArticleList'
        ]),
    },
    mounted() {
        this.getArticleList();
    }
}
</script>

<style>

</style>
