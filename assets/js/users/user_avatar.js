$(function () {
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

    $('#btnChooseImage').on('click', function (e) {
        e.preventDefault();
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        let newImage = URL.createObjectURL(e.target.files[0])
        console.log(newImage);

        $image.cropper('destroy').attr('src', newImage).cropper(options)
    })

    $('#btnUpload').on('click', function (e) {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 2, time: 1000 })
                }

                layui.layer.msg(res.message, { icon: 1, time: 1000 }, function () {
                    window.parent.getUserInfo()
                })
            }
        })
    })
})