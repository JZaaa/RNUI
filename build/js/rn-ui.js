/**
 * @description jquery插件
 * @author jzaaa
 */


/*拓展方法*/
+(function ($) {
    'use strict';

    $.extend({
        alertmsg: function(msg, icon) {
            if (typeof layer == 'undefined') {
                alert(msg);
            } else {
                layer.msg(msg, {icon: icon});
            }
        }
    });
    $.extend(String.prototype, {
        toFunc: function () {
            if (!this || this.length == 0) return undefined
            //if ($.isFunction(this)) return this

            if (this.startsWith('function')) {
                return (new Function('return '+ this))()
            }

            var m_arr = this.split('.')
            var fn    = window

            for (var i = 0; i < m_arr.length; i++) {
                fn = fn[m_arr[i]]
            }

            if (typeof fn === 'function') {
                return fn
            }

            return undefined
        },
        //去除空格
        trim: function() {
            return this.replace(/(^\s*)|(\s*$)|\r|\n/g, '')
        }
    });
    $.extend(Function.prototype, {
        //to fixed String.prototype -> toFunc
        toFunc: function() {
            return this;
        }
    });


    /**
     * ajax封装
     * @param {Object} opts: {type:GET/POST, url:ajax请求地址, data:ajax请求参数列表, callback:成功回调函数 }
     */
    $.fn.extend({
        ajaxUrl : function (opts) {
            var $this = $(this);
            var loading;

            $.ajax({
                type: opts.type || 'GET',
                url: opts.url,
                data: opts.data || {},
                cache: false,
                dataType: opts.dataType || 'json',
                timeout: opts.timeout || 30000,
                success: function (response) {
                    if (typeof opts.success === 'undefined') {
                        return;
                    }
                    if (typeof opts.success !== 'object') {
                        opts.success = opts.success.toFunc()
                    }
                    opts.success(response)
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (typeof opts.error === 'undefined') {
                        return;
                    }
                    if (typeof opts.error !== 'object') {
                        opts.error = opts.error.toFunc()
                    }
                    opts.error(xhr, ajaxOptions, thrownError)
                },
                beforeSend: function () {
                    if (typeof opts.beforeSend === 'undefined') {
                        loading = weui.loading('loading', {
                            className: 'custom-classname'
                        });
                        return;
                    }
                    if (typeof opts.beforeSend !== 'object') {
                        opts.beforeSend = opts.beforeSend.toFunc()
                    }
                    opts.beforeSend()

                },
                complete: function () {
                    if (typeof opts.complete === 'undefined') {
                        loading.hide();
                        return;
                    }
                    if (typeof opts.complete !== 'object') {
                        opts.complete = opts.complete.toFunc()
                    }
                    opts.complete()
                }
            })
        }
    });


    //滑动定位
    $.getTouchPosition = function(e) {
        e = e.originalEvent || e;
        if(e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
            return {
                x: e.targetTouches[0].pageX,
                y: e.targetTouches[0].pageY
            };
        } else {
            return {
                x: e.pageX,
                y: e.pageY
            };
        }
    };

    //支持事件
    $.support = (function() {
        var support = {
            touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch)
        };
        return support;
    })();

    //判断是否支持滑动(移动端)，不支持则以鼠标动作代替
    $.touchEvents = {
        start: $.support.touch ? 'touchstart' : 'mousedown',
        move: $.support.touch ? 'touchmove' : 'mousemove',
        end: $.support.touch ? 'touchend' : 'mouseup'
    };

    /**
     * iphone8 与 iphoneX 有相同的agent, 所以需要使用window.screen判断
     * @type {Function}
     */
    $.isIPhoneX = (function() {
        return this.isIPhone() && (window.screen.width === 375 && window.screen.height === 812 || window.screen.width === 812 && window.screen.height === 375);
    });

    //是否为iphone
    $.isIPhone = (function() {
        return (/iPhone/i.test(navigator.userAgent));
    });



})(jQuery);


/**
 * 获取元素滑动状态
 * slide[number] 最小移动距离，小于此距离视为不移动
 * callback[function] 回调
 */
+(function ($) {
    'use strict';
    $.fn.touchSlide = function (options) {

        var defaults = {
            slide: 10, //最小移动距离
            callback: function (move, el) {
            }
        }
        var $that = this;
        var touchEvent = $.touchEvents;
        $that.each(function () {
            var $el = $(this);
            var opts = $.extend({}, defaults, options);
            var touchStart = false; //开始移动标志
            var initial, final; //记录开始与结束位置
            var move = {
                x: 0,
                y: 0,
                touch: false
            }; //移动距离
            var p;

            $el.on(touchEvent.start, function (e) {
                move = {
                    x: 0,
                    y: 0,
                    touch: false
                } //重置状态
                initial = $.getTouchPosition(e);
                touchStart = initial;
            })

            $el.on(touchEvent.move, function (e) {
                if (!touchStart) return;
                final = $.getTouchPosition(e);
                move.x = final.x - initial.x;
                move.y = final.y - initial.y;
                e.preventDefault();
                e.stopPropagation();
                if (Math.abs(move.x) < Math.abs(move.y)) {
                    // 上下方向在拖动
                    p = move.y;
                    move.touch = 'y'
                } else {
                    //左右方向
                    p = move.x;
                    move.touch = 'x'
                }

                if (p == 0 || Math.abs(p) < opts.slide) {
                    //未移动
                    move.touch = false;
                } else if (p < 0) {
                    //左/上移
                    move.touch = (move.touch == 'x') ? 'left' : 'top';
                } else {
                    //右/下移
                    move.touch = (move.touch == 'x') ? 'right' : 'bottom';
                }

            })

            $el.on(touchEvent.end, function (e) {
                if (!touchStart) return;
                touchStart = false;
                return opts.callback(move, $el);
            })
        });

        return $that;
    }

})(jQuery);


/**
 * 滑动单元格
 * 默认初始化 .weui-cell_swiped的类
 * 手动初始化未$('.weui-cell_swiped').swipeout()
 * 手动关闭或打开
 * $('.weui-cell_swiped').swipeout('open') //打开
 * $('.weui-cell_swiped').swipeout('close') //关闭
 *
 */

+(function ($) {
    "use strict";

    var cache = [];
    var TOUCHING = 'swipeout-touching'

    var Swipeout = function(el) {
        this.container = $(el);
        this.mover = this.container.find('>.weui-cell__bd')
        this.attachEvents();
        cache.push(this)
    }

    Swipeout.prototype.touchStart = function(e) {
        var p = $.getTouchPosition(e);
        this.container.addClass(TOUCHING);
        this.start = p;
        this.startX = 0;
        this.startTime = + new Date;
        var transform =  this.mover.css('transform').match(/-?[\d\.]+/g)
        if (transform && transform.length) this.startX = parseInt(transform[4])
        this.diffX = this.diffY = 0;
        this._closeOthers()
        this.limit = this.container.find('>.weui-cell__ft').width() || 68; // 因为有的时候初始化的时候元素是隐藏的（比如在对话框内），所以在touchstart的时候计算宽度而不是初始化的时候
    };

    Swipeout.prototype.touchMove= function(e) {
        if(!this.start) return true;
        var p = $.getTouchPosition(e);
        this.diffX = p.x - this.start.x;
        this.diffY = p.y - this.start.y;
        if (Math.abs(this.diffX) < Math.abs(this.diffY)) { // 说明是上下方向在拖动
            this.close()
            this.start = false
            return true;
        }
        e.preventDefault();
        e.stopPropagation();
        var x = this.diffX + this.startX
        if (x > 0) x = 0;
        if (Math.abs(x) > this.limit) x = - (Math.pow(-(x+this.limit), .7) + this.limit)
        this.mover.css("transform", "translate3d("+x+"px, 0, 0)");
    };
    Swipeout.prototype.touchEnd = function() {
        if (!this.start) return true;
        this.start = false;
        var x = this.diffX + this.startX
        var t = new Date - this.startTime;
        if (this.diffX < -5 && t < 200) { // 向左快速滑动，则打开
            this.open()
        } else if (this.diffX >= 0 && t < 200) { // 向右快速滑动，或者单击,则关闭
            this.close()
        } else if (x > 0 || -x <= this.limit / 2) {
            this.close()
        } else {
            this.open()
        }
    };


    Swipeout.prototype.close = function() {
        this.container.removeClass(TOUCHING);
        this.mover.css("transform", "translate3d(0, 0, 0)");
        this.container.trigger('swipeout-close');
    }

    Swipeout.prototype.open = function() {
        this.container.removeClass(TOUCHING);
        this._closeOthers()
        this.mover.css("transform", "translate3d(" + (-this.limit) + "px, 0, 0)");
        this.container.trigger('swipeout-open');
    }

    Swipeout.prototype.attachEvents = function() {
        var el = this.mover;
        el.on($.touchEvents.start, $.proxy(this.touchStart, this));
        el.on($.touchEvents.move, $.proxy(this.touchMove, this));
        el.on($.touchEvents.end, $.proxy(this.touchEnd, this));
    }
    Swipeout.prototype._closeOthers = function() {
        //close others
        var self = this
        cache.forEach(function (s) {
            if (s !== self) s.close()
        })
    }

    var swipeout = function(el) {
        return new Swipeout(el);
    };

    $.fn.swipeout = function (arg) {
        return this.each(function() {
            var $this = $(this)
            var s = $this.data('swipeout') || swipeout(this);
            $this.data('swipeout', s);

            if (typeof arg === typeof 'a') {
                s[arg]()
            }
        });
    }
})(jQuery);





/**
 * 设置tabbar当前状态插
 * activeClass 活动状态class
 * item ：tabbar标签
 * activeIndex 当前活动索引 0开始，设置false则无
 */
+(function ($) {
    'use strict';
    $.fn.jzTabbar = function (options) {
        var defaults = {
            activeIndex: false,
            activeClass: 'tabbar-item-active',
            item: '.tabbar-item'
        };
        var $that = this;

        $that.each(function () {
            var $el = $(this),
                opt = $.extend({}, defaults, options);

            var item = $el.find(opt.item),
                active = item.eq(opt.activeIndex);

            if (opt.activeIndex !== false) {
                active.addClass(opt.activeClass);
            }

            item.on('click', function () {
                active.removeClass(opt.activeClass);
                active = $(this).addClass(opt.activeClass)
            })

        });

        return $that;
    }

})(jQuery);
