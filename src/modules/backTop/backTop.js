import $ from '../../tool/module-tool'

/**
 * 返回顶部
 * 使用： $(selector).backTop(options)| new rn.BackTop(selector, options)
 * 模块化调用：new BackTop(selector, options)
 * options {object=} 配置项
 * options.showHeight {number} 当滑动此位置时显示目标
 * options.backPosition {number} 返回位置
 * options.animate {object} 动画效果
 * options.display {string} 目标display默认样式
 * @type {BackTop}
 */
const BackTop = (($) => {
  const NAME = 'backTop'
  const VERSION = '1.0.0'
  const DATA_KEY = 'rn.backTop'
  const Default = {
    showHeight: 400,
    backPosition: 0,
    animate: {
      show: 'rn-fade-in',
      hide: 'rn-fade-out'
    },
    display: ''
  }
  const DefaultType = {
    showHeight: 'number',
    backPosition: 'number',
    animate: 'object',
    display: 'string'
  }

  const _getConfig = function(config) {
    config = $.extend(Default, config)
    $.typeCheckConfig(NAME, config, DefaultType)
    return config
  }
  const _easeInOutQuad = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b
    return -c / 2 * (--t * (t - 2) - 1) + b
  }

  class BackTop {
    constructor(element, config) {
      this._element = element
      this._config = _getConfig(config)
      this._interval = null
      this._init()
    }
    static get VERSION() {
      return VERSION
    }
    // 显示
    show() {
      $(this._element).css('display', this._config.display).removeClass(this._config.animate.hide).addClass(this._config.animate.show)
    }
    // 隐藏
    hide() {
      $(this._element).removeClass(this._config.animate.show).addClass(this._config.animate.hide)
    }
    // 返回顶部
    to() {
      const start = window.pageYOffset
      let i = 0
      this._interval = setInterval(() => {
        const next = Math.floor(_easeInOutQuad(10 * i, start, -start, 500))
        if (next <= this._config.backPosition) {
          window.scrollTo(0, this._config.backPosition)
          clearInterval(this._interval)
        } else {
          window.scrollTo(0, next)
        }
        i++
      }, 16.7)
    }

    _init() {
      const $el = $(this._element)
      const config = this._config
      $el.addClass('rn-animate').css('display', 'none').on('click', $.proxy(this.to, this)).on('animationend webkitAnimationEnd', function() {
        if ($(this._element).hasClass(config.animate.hide)) {
          $el.css('display', 'none')
        }
      })
      window.addEventListener('scroll', $.proxy(this._handleScroll, this))
    }
    _handleScroll() {
      (window.pageYOffset > this._config.showHeight) ? this.show() : this.hide()
    }

    static _jQueryInterface(config) {
      return this.each(function() {
        let data = $(this).data(DATA_KEY)
        const _config = $.extend({}, Default, config, $(this).data())
        if (!data) {
          data = new BackTop(this, _config)
          $(this).data(DATA_KEY, data)
        }
      })
    }
  }

  $.fn[NAME] = BackTop._jQueryInterface
  $.fn[NAME].Constructor = BackTop
  return BackTop
})($)

export default BackTop
