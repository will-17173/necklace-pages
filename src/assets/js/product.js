/**
 * Created by Administrator on 2016/8/19.
 */

$(document).ready(function () {
    $('#form select[data-children-id]').on('change', function(){
        var option = $(this).find('option:selected'), childId = $(this).data('children-id');
        // hide all sub option
        var parent = $('#form #sub_' + childId);
        parent.show();
        $('#form #sub_' + childId + ' > div').hide();
        $('#form #sub_' + childId + ' *[data-validation]').removeAttr('data-validation');
        if (typeof(option.attr('data-children')) != 'undefined') {
            // 
            var ids, string = option.data('children'), obj;
            ids = string.toString().split(',');
            for (var i in ids) {
                obj = parent.find(' div[data-id="'+ids[i]+'"]');
                obj.show();
                obj.find('*[data-is-required]').attr('data-validation', 'required');
            }
        } else {

        }
    }).trigger('change');


    $('#form-mobile select[data-children-id]').on('change', function(){
        var option = $(this).find('option:selected'), childId = $(this).data('children-id');
        // hide all sub option
        var parent = $('#form-mobile #sub_mobile_' + childId);
        parent.show();
        $('#form-mobile #sub_mobile_' + childId + ' > div').hide();
        $('#form-mobile #sub_mobile_' + childId + ' *[data-validation]').removeAttr('data-validation');

        if (typeof(option.attr('data-children')) != 'undefined') {
            // 
            var ids, string = option.data('children'), obj;
            ids = string.toString().split(',');
            for (var i in ids) {
                obj = parent.find(' div[data-id="'+ids[i]+'"]');
                obj.show();
                obj.find('*[data-is-required]').attr('data-validation', 'required');
            }
        } else {

        }
    }).trigger('change');

    $('#form input,select,textarea').each(function(){
        var prop = $(this).prop('tagName').toLowerCase();
        var obj = $(this);
        switch (prop)
        {
            case 'input':
                type = obj.attr('type');
                if (typeof(type) == 'undefined'){
                    type = 'text';
                }

                if (typeof(obj.attr('price')) != 'undefined'){
                    if (type == 'text') {
                        //如果存在这个属性，则表示是价格属性
                        obj.bind(type == 'text' ? 'keyup' : 'click', function(){
                            var obj = $(this), type, price;
                            price = $(this).attr('price');
                            if (obj.val() == ''){
                                priceObj.deal(obj.attr('id'), 0);
                            } else {
                                priceObj.deal(obj.attr('id'), price);
                            }

                        });
                    } else if (type == 'checkbox') {
                        //checkbox
                        obj.bind('click', function(){
                            var obj = $(this), type,price;
                            price = $(this).attr('price');
                            var selected = $(this).attr('checked') ? true : false;
                            if (selected) {
                                priceObj.deal(obj.attr('id'), price);
                            } else {
                                priceObj.deal(obj.attr('id'), 0);
                            }

                        });

                    }else {
                        //radio
                        obj.bind('change', function(){
                            var obj = $(this), type,price, name;
                            name = obj.attr('name');
                            var selected_obj = $('input[name='+name+']:checked');
                            price = selected_obj.attr('price');
                            var the_id, tmp ;
                            tmp = selected_obj.attr('id');
                            tmp = tmp.split('_');
                            the_id = tmp[0] + '_' + tmp[1];
                            priceObj.deal(the_id, price);
                        });
                    }
                }
                break;
            case 'textarea':
                if (typeof(obj.attr('price')) != 'undefined'){
                    //如果存在这个属性，则表示是价格属性
                    obj.bind('keyup', function(){
                        var obj = $(this);
                        if (obj.val() == ''){
                            priceObj.deal(obj.attr('id'), 0);
                        } else {
                            priceObj.deal(obj.attr('id'), obj.attr('price'));
                        }
                    });
                }
                break;
            case 'select':
                //radio
                obj.bind('change', function(){
                    var obj = $(this), type,price, val;
                    val = obj.val();
                    if (val == '') {
                        priceObj.deal(obj.attr('id'), 0);
                    } else {
                        var selected = obj.find('option:selected');
                        if (typeof(selected.attr('price')) != 'undefined') {
                            // 如果有存在price
                            priceObj.deal(obj.attr('id'), selected.attr('price'));
                        } else {
                            priceObj.deal(obj.attr('id'), 0);
                        }
                    }

                });
                break;
        }
    });

    $('#form-mobile input,select,textarea').each(function(){
        var prop = $(this).prop('tagName').toLowerCase();
        var obj = $(this);
        switch (prop)
        {
            case 'input':
                type = obj.attr('type');
                if (typeof(type) == 'undefined'){
                    type = 'text';
                }
                if (typeof(obj.attr('price')) != 'undefined'){
                    if (type == 'text') {
                        //如果存在这个属性，则表示是价格属性
                        obj.bind(type == 'text' ? 'keyup' : 'click', function(){
                            var obj = $(this), type, price;
                            price = $(this).attr('price');
                            if (obj.val() == ''){
                                priceObjMobile.deal(obj.attr('id'), 0);
                            } else {
                                priceObjMobile.deal(obj.attr('id'), price);
                            }

                        });
                    } else if (type == 'checkbox') {
                        //checkbox
                        obj.bind('click', function(){
                            var obj = $(this), type,price;
                            price = $(this).attr('price');
                            var selected = $(this).attr('checked') ? true : false;
                            if (selected) {
                                priceObjMobile.deal(obj.attr('id'), price);
                            } else {
                                priceObjMobile.deal(obj.attr('id'), 0);
                            }

                        });

                    } else {
                        //radio
                        obj.bind('change', function(){
                            var obj = $(this), type,price, name;
                            name = obj.attr('name');
                            var selected_obj = $('input[name='+name+']:checked');
                            price = selected_obj.attr('price');
                            var the_id, tmp ;
                            tmp = selected_obj.attr('id');
                            tmp = tmp.split('_');
                            the_id = tmp[0] + '_' + tmp[1];
                            priceObjMobile.deal(the_id, price);
                        });
                    }
                }
                break;
            case 'textarea':
                if (typeof(obj.attr('price')) != 'undefined'){
                    //如果存在这个属性，则表示是价格属性
                    obj.bind('keyup', function(){
                        var obj = $(this);
                        if (obj.val() == ''){
                            priceObjMobile.deal(obj.attr('id'), 0);
                        } else {
                            priceObjMobile.deal(obj.attr('id'), obj.attr('price'));
                        }
                    });
                }
                break;
            case 'select':
                //radio
                obj.bind('change', function(){
                    var obj = $(this), type,price, val;
                    val = obj.val();
                    if (val == '') {
                        priceObjMobile.deal(obj.attr('id'), 0);
                    } else {
                        var selected = obj.find('option:selected');
                        if (typeof(selected.attr('price')) != 'undefined') {
                            // 如果有存在price
                            priceObjMobile.deal(obj.attr('id'), selected.attr('price'));
                        } else {
                            priceObjMobile.deal(obj.attr('id'), 0);
                        }
                    }

                });
                break;
        }
    });

    $('#form input[title]').qtip({
        show: 'focus',
        hide: 'blur',
        position: {
            my: 'bottom center',
            at : 'top center'
        },
        style: {
            classes: 'qtip-bootstrap'
        }
    });

    $('#form-mobile input[title]').qtip({
        show: 'focus',
        hide: 'blur',
        position: {
            my: 'bottom center',
            at : 'top center'
        },
        style: {
            classes: 'qtip-bootstrap'
        }
    });


    var thumbSlider = {
        width : 70,
        current : 1,
        total : 0,
        items : 4, // display items number
        init : function(){
            this.total = $('#bx-pager > a').length;
            $('#bx-pager').css('width', (this.total * this.width + 20) + 'px');
            $('#btn-left').on('click', function(){
                if (thumbSlider.current > 1){
                    thumbSlider.current--;
                    thumbSlider.slide();
                }
            });

            $('#btn-right').on('click', function(){
                if (thumbSlider.current <= thumbSlider.total - thumbSlider.items){
                    thumbSlider.current++;
                    thumbSlider.slide();
                }
            });

            this.checkBtn();

            $('#bx-pager a').on('click', function() {
                if ($(this).data('slide-index') == 0) {
                    $('#product-gurantee-image').fadeIn();
                } else {
                    $('#product-gurantee-image').fadeOut();
                }
            });
        },
        slide : function(){
            // cal
            var marginLeft = -(this.current -1) * this.width;
            // console.log(marginLeft);
            $('#bx-pager').animate({'marginLeft' : marginLeft + 'px'}, 200);
            this.checkBtn();
        },
        checkBtn : function(){
            // hide or show
            if (this.current == 1) {
                $('#btn-left').addClass('disabled');

            } else {
                $('#btn-left').removeClass('disabled');
            }

            if (this.current > this.total - this.items) {
                $('#btn-right').addClass('disabled');
            } else {
                $('#btn-right').removeClass('disabled');
            }
        }
    }

    thumbSlider.init();
});
