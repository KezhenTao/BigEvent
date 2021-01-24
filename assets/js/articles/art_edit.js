$(function () {
    let id = location.search.substr(4)
    let baseUrl = 'http://api-breakingnews-web.itheima.net'
    initCates()
    initArtInfo()
    initEditor()


    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
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
            fd.append('Id', id)
            editArticle(fd)
        })

    })

    function editArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/edit',
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

    function initCates() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                let htmlStr = template('tpl-cates', res)
                $('[name=cate_id]').html(htmlStr)
            }
        })
    }

    function initArtInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/article/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }
                $image.cropper('destroy').attr('src', baseUrl + res.data.cover_img).cropper(options)
                layui.form.val('art-form', res.data)
            }
        })
    }
})