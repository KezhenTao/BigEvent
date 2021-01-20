$(function () {
    $('#goReg').on('click', function (e) {
        $(this).parents('.login').hide().next().show()
    });

    $('#goLogin').on('click', function (e) {
        $(this).parents('.register').hide().prev().show()
    })
})