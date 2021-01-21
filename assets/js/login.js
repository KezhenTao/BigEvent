$(function () {
    let baseUrl = 'http://api-breakingnews-web.itheima.net'
    $('#goReg').on('click', function (e) {
        $(this).parents('.login').hide().next().show()
    });

    $('#goLogin').on('click', function (e) {
        $(this).parents('.register').hide().prev().show()
    })

    // 通过layui创建form选项 layui是通过引入layui.js后就可以使用 与引入jQuery.js可以使用$一样
    let form = layui.form;
    // 通过layui.verify方法来自定义验证规则 参数是对象形式
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        username: [/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/, '用户名必须4到15位,且不能出现空格与特殊字符'],
        repwd: function (value, item) {
            if (value !== $('#pwd').val()) {
                return "两次输入的密码不一致"
            }
        }
    })

    // 监听注册表单的提交时间
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        let username = $(this).find('[name=username]').val()
        let password = $(this).find('[name=password]').val()
        $.post('/api/reguser', { username, password }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message, {
                    icon: 2,
                    time: 2000
                });
            }
            layer.msg(res.message, {
                icon: 1,
                time: 2000
            }, function () {
                $('#goLogin').click()
            });
        })
    })

    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 2,
                        time: 2000
                    });
                }
                layer.msg(res.message, {
                    icon: 1,
                    time: 2000
                }, function () {
                    localStorage.setItem('token', res.token)
                    location.href = 'index.html'
                });

            }
        })
    })
})