// 每次调用ajax请求是都会调用这个函数
// 形参可以接收到请求的配置参数
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    if (options.url.indexOf('my') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') };
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = 'login.html'
        }
    }
})