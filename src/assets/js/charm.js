// $('.charms-list').slick();
$('.scrollbar-inner').scrollbar();

$('.charms-list li').mouseenter(function () {
    $(this).find('.charms-popup').show();
}).mouseleave(function () {
    $(this).find('.charms-popup').hide();
})

var slickInit = false;
$('#btn-add-bracelet').on('click', function () {
    if (!slickInit) {
        setTimeout(function () {
            $('.charms-list:visible').slick();
            slickInit = true;
        }, 300)
    }
});

// charm
$(document).on('click', '.close-charm-detail', function () {
    $('.charm-details-popup, .charm-detail-mask').hide();
}).on('click', '#btn-charm-popup-close', function () {
    $('#charm-popup').hide();
}).on('click', '.charms-list-link[data-id]', function () {
    var gid = $(this).data('id'),
        ca = $(this).data('ca'),
        shadow = $(this).data('shadow'),
        name = $(this).data('name'),
        price = $(this).data('price'),
        src = $(this).data('img') || $(this).find('img').attr('src');
    $('#charm-popup .bracelet-popup-img').html('<img src="' + src + '">');
    $('#charm-popup .bracelet-popup-itemname').text(name);
    $('#charm-popup .bracelet-popup-price').text(price);
    var tmp = $('#charm-popup .bracelet-popup-add a');
    tmp.data('id', gid).data('ca', ca).data('shadow', shadow);
    /*
    $('#charm-popup .bracelet-popup-add a').attr({
        'data-id': gid,
        'data-ca': ca,
        'data-shadow': shadow
    });
    */
    $('#charm-popup').show();
});
$('#charm-popup').on('click', '.bracelet-popup-add a[data-id]', function () {
    if ($(this).data('ca') == 1) {
        braceletHelper.loadCharmOption($(this).data('id'));
    } else {
        braceletHelper.addCharm($(this).data('id'));
    }
});

$(document).ready(function(){
    $('#btn-bracelet-popup-close').on('click', function(){
        $('#bracelet-popup').hide();
    });
    $('.bracelet-image[data-id]').on('click', function(){
        var gid = $(this).data('id'),
            ca = $(this).data('ca'),
            name = $(this).data('name'),
            price = $(this).data('price'),
            src = $(this).data('img') || $(this).find('img').attr('src');
        $('#bracelet-popup .bracelet-popup-img').html('<img src="' + src + '">');
        $('#bracelet-popup .bracelet-popup-itemname').text(name);
        $('#bracelet-popup .bracelet-popup-price').text(price);
        $('#bracelet-popup .bracelet-popup-add a').data('id', gid).data('has-length', $(this).data('has-length'));
        /*
        $('#bracelet-popup .bracelet-popup-add a').attr({
            'data-id': gid,
            'data-has-length' : $(this).data('has-length')
        });
        */
        $('#bracelet-popup').show();
    });

    $('#bracelet-popup .bracelet-popup-add a[data-id]').on('click', function () {
        // set up the length
        if ($(this).data('has-length') == 1) {
            lengthHelper.renderLength($(this).data('id'));
            $('#bracelet-popup').hide();
            $('.select-bracelet-length').show();
        } else {
            // just add this
            braceletHelper.add($(this).data('id'));
        }
    });
});

