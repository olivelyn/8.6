require(['jquery', 'scroll', 'hand'], function($, scroll, hand) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            console.log(res[1])
            var zhu = $('#box').html();
            var two = hand.compile(zhu);
            var html = two(res[1]);
            $('.box').html(html)
        }

    })
    var sco = new scroll('.list')



})