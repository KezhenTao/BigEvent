$(function () {
    let data = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    };

    initList()
    function initList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
})

