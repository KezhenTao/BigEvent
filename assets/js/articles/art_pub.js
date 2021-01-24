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

    $('#btnChoose').on('click', function (e) {
        e.preventDefault()
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        if (e.target.files.length === 0) {
            return layui.layer.msg('没有选择封面', { time: 1000 })
        }
        let file = e.target.files[0]
        let newImage = URL.createObjectURL(file);
        $('#image').cropper('destroy').attr('src', newImage).cropper(options)
        console.log(newImage);
    })


    let state;
    $('#btnPub').on('click', function () {
        state = '已发布'
    })

    $('#btnSaveDraft').on('click', function () {
        state = '草稿'
    })

    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        let fd = new FormData($(this)[0]);
        fd.append('state', state)
        $('#image').cropper('getCroppedCanvas', {
            width: 400,
            height: 200
        }).toBlob(function (Blob) {
            fd.append('cover_img', Blob)
            publishArticle(fd)
        })

    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }

                layui.layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                    location.href = 'art_list.html'
                })
            }
        })
    }

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