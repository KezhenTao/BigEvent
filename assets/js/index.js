$(function () {
    let layer = layui.layer
    getUserInfo()

    $('#btnLogout').on('click', function (e) {
        layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token');
            location.href = 'login.html'
            // 关闭confirm询问框
            layer.close(index);
        });

    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message, { icon: 2, time: 1000 })
            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(data) {
    let name = data.nickname || data.username
    $('#welcome').html(`欢迎 ${name}`);
    if (data.user_pic) {
        $('.text-avatar').hide();
        $('.layui-nav-img').attr('src', data.userpic).show()
    } else {
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}