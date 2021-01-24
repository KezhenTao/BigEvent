$(function () {

    let data = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    };

    initCates()
    initList()

    $('#btnFilter').on('click', function (e) {
        data.cate_id = $('[name=cate_id]').val()
        data.state = $('[name=state]').val()
    })

    $('#filter-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPageBox(res.total)
            }
        })
    })

    $('tbody').on('click', '.btnDel', function (e) {
        let length = $('.btnDel').length
        let id = $(this).attr('data-id')
        layui.layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                    }
                    layui.layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                        if (length === 1) {
                            data.pagenum !== 1 ? data.pagenum = data.pagenum - 1 : data.pagenum
                        }
                        initList()
                    })
                }
            })

            layer.close(index);
        });
    })

    // 定义美化时间格式的过滤器
    template.defaults.imports.dateFormat = function (date) {
        let dt = new Date(date)
        let y = dt.getFullYear()
        let m = padZero(dt.getMonth())
        let d = padZero(dt.getDate())
        let h = padZero(dt.getHours())
        let M = padZero(dt.getMinutes())
        let s = padZero(dt.getSeconds())

        return `${y}-${m}-${d} ${h}:${M}:${s}`
    }

    // 补零
    function padZero(data) {
        return data < 10 ? `0${data}` : data
    }

    function initList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPageBox(res.total)
            }
        })
    }

    function renderPageBox(total) {
        layui.laypage.render({
            elem: 'pageBox',
            count: total,
            limit: data.pagesize,
            curr: data.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候出发jump回调函数
            jump: function (obj, first) {
                // obj里包含了当前laypage里的最新参数
                data.pagenum = obj.curr
                data.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    initList()
                }
            }
        });
    }

    function initCates() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                let htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                layui.form.render()
            }
        })
    }
})

