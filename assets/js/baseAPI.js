// 每次调用ajax请求是都会调用这个函数
// 形参可以接收到请求的配置参数
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})