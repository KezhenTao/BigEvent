$(function () {
    initEditor()
    getAllCates();

    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)


    function getAllCates() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                let htmlStr = template('tpl-cates', res)
                $('[name=cate_id]').html(htmlStr)

                // 一定要调用form.render方法 因为是动态添加进去的数据
                layui.form.render()
            }
        })
    }
})