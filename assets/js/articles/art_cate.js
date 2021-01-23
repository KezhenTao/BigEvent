$(function () {
    initCat()

    let addIndex = null;
    let editIndex = null;
    $('#btnAddCate').on('click', function (e) {
        addIndex = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-addCate').html()
        });
    })

    $('body').on('submit', '#addCateForm', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                layui.layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                    initCat()
                    layui.layer.close(addIndex)
                })
            }
        })
    })

    $('tbody').on('click', '#btnEdit', function (e) {
        editIndex = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-editCate').html()
        });
        let id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }

                layui.form.val('editForm', res.data)
            }
        })
    })

    $('body').on('submit', '#editCateForm', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                layui.layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                    layui.layer.close(editIndex)
                    initCat()
                })
            }
        })
    })

    $('tbody').on('click', '#btnDel', function (e) {
        e.preventDefault()
        let id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                    }
                    layui.layer.msg(res.message, { icon: 1, time: 1000 }, function () {

                        layer.close(index);
                        initCat()
                    })
                }
            })

        });
    })
})


function initCat() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message, { icon: 2, time: 1000 })
            }
            let htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr)
        }
    })
}