/**
 * app js
 */
function changeCurrency(code){
    var url = '/ajax/set-currency';
    $.getJSON(url, {currency:code}, function(json){
        location.reload();
    });
}

$(function() {
    var $menu = $('nav#menu-mobile'),
        $html = $('#header, #header');
    /*
     $menu.mmenu({
     dragOpen: true
     });
     */
    $menu.mmenu({
        extensions      : [ 'widescreen', 'theme-white', 'effect-slide' ],
        searchfield     : true,
        counters        : true,
        slidingSubmenus : false
    });

    $(document).on('change', '#currency_code', function(){
        changeCurrency($(this).val());
    });

    $(document).on('click', '.currency-list a[data-code], .currency-list-mobile a[data-code]', function(){
        changeCurrency($(this).data('code'));
    });
});

$(document).ready(function(){
    // currency
    $.getJSON('/ajax/get-currency-area', function(json){
        if (json.error) {
            // 
        } else {
            $('#currency-area').html(json.result);
        }
    })
    //cart num
    $.getJSON('/cart/info', function(json){
        if (json.error) {
            // 
        } else {
            var num = json.result.num;
            $('#cart-num').html(num);
            $('#cart-num-mobile').html(num);
        }
    });

});

var loadingMask = {
    open : function() {
        var text = "Loading...";
        if (arguments.length > 0) {
            text = arguments[0];
        }

        $('#loading-text').html(text);
        $('#loading-mask').show();
    },
    close : function() {
        $('#loading-mask').hide();
    },
    fadeOut : function() {
        $('#loading-mask').fadeOut();
    }
};

var countdown = {
    interval : null,
    show : true,
    endTime : 0,
    start : function(endTime) {
        if (countdown.interval) {
            clearInterval(countdown.interval);
        }

        this.endTime = endTime;
        countdown.interval = setInterval(countdown.flush, 1000);
    },
    flush : function() {
        if (countdown.show) {
            $('.countdown-sep').css('visibility', 'hidden');
        } else {
            $('.countdown-sep').css('visibility', '');
        }

        countdown.show = !countdown.show;
        // current time
        var d = new Date(), t = countdown.endTime - parseInt(d.getTime() / 1000);
        var days, hurs, mins;
        if (isNaN(t) || t < 60) {
            days = '00';
            hurs = '00';
            mins = '00';
            $('.countdown-sep').css('visibility', '');
            if (countdown.interval) {
                clearInterval(countdown.interval);
            }
        } else {
            // 
            days = Math.floor(t / 60 / 60 / 24);
            hurs = Math.floor(t / 60 / 60 % 24);
            mins = Math.floor(t / 60 % 60);

            if (days > 99) {
                days = 99;
            }
            if (days.toString().length == 1) {
                days = '0' + days;
            }

            if (hurs.toString().length == 1) {
                hurs = '0' + hurs;
            }

            if (mins.toString().length == 1) {
                mins = '0' + mins;
            }
        }

        $('.countdown-day').html(days);
        $('.countdown-hour').html(hurs);
        $('.countdown-min').html(mins);
    }
};

var modalDialog = {
    timer : null,
    pop : function(text) {
        $('#modal-content').html(text);
        if (arguments.length > 1) {
            // auto close
            if (this.timer) {
                clearTimeout(this.timer);
            }

            this.timer = setTimeout(function(){modalDialog.close();}, arguments[1]);
        }

        $('#modal-dialog').fadeIn();
    },
    close : function() {
        // clear timer
        if (this.timer) {
            clearTimeout(this.timer);
        }

        // clsoe
        $('#modal-dialog').fadeOut();
    }
};

var adPoper = {
    init : function(){
        $('#ad-poper-btn-close').on('click', function(){adPoper.close();return false;});
        $('#btn-pop-continue').on('click', function(){adPoper.close();return false;});
        $('.pop-ad').on('click', function(){adPoper.show();return false;});
        $('#ad-poper .ad-the-code[data-code]').on('click', function(){
            var val = $(this).data('code');
            if ($('#coupon-code').length > 0){
                $('#coupon-code').val(val);
                $('#coupon-code-mobile').val(val);
                $('#code-container-mobile').show();
                adPoper.close();
            }
        });
        $('#ad-poper').on('click', function(){
            return false;
        });
    },
    show : function(){
        $("#ad-poper").show();
        $('body').one('click tap', function(){
            adPoper.close();
        });
    },
    close : function(){
        //console.log('close');
        $("#ad-poper").fadeOut('fast');
    }
};

$(document).ready(function(){
    $('#btn-chat-closed').click(function(){
        $(this).hide();
        $('#btn-chat-opened').parent().show().animate({left: '+190px'}, "slow");
    });
    $('#btn-chat-opened').click(function(){
        $('#btn-chat-opened').parent().hide();
        $('#btn-chat-closed').show();
    });

    $('#btn-search-dropdown').on('click', function () {
        $('#search-area').slideToggle('fast');
    });

    $(window).scroll(function(){
        if ($(this).scrollTop() > 200) {
            $('#top-scroll').fadeIn();
        } else {
            $('#top-scroll').fadeOut();
        }
    });
    // scroll-to-top animate
    $('#top-scroll').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    // page poper
    $(document).on('click', 'a[data-info]', function() {
        var key = $(this).data('info');
        if (!key) {
            return true;
        }
        if (key != $('#page-info-title').prop('data-last')) {
            // request the data
            $.getJSON('/cms/load-page', {key : key}, function(json) {
                if (json.error) {
                    console.log('load page error:' + json.msg);
                    // alert(json.msg);
                } else {
                    var data = json.result;
                    $('#page-info-title').html(data.title).prop('data-last', data.url);
                    $('#page-info-content').html(data.content);
                    // pop
                    $('#page-info-modal').modal('show');
                }
            })
        } else {
            // just pop it
            $('#page-info-modal').modal('show');
        }
        return false;
    });

    /*
     $('input,select').focus(function(){
     $('#header').css('position','static');
     $('#footer').css('position','static');
     });
     $('input,select').blur(function(){
     $('#header').css('position','fixed');
     $('#footer').css('position','fixed');

     });
     */
    $(window).on('scroll', function(){
        if ($(document).scrollTop() > 40){
            $("#bar-logo-link").show();
        } else {
            $("#bar-logo-link").hide();
        }
    }).trigger('scroll');

    adPoper.init();
});
