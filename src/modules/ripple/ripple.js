import $ from '../../tool/module-tool'
/**
 * 点击波纹效果
 * new rn.Ripple(selector, options) | $(selector).options
 * 模块化： new Ripple(selector, options)
 * 注：使用此功能会改变目标元素 position: 'relative'
 * el 目标元素，必须
 * options {object=} 配置项
 * options.on {string} 触发事件
 * options.opacity {string|number} 波纹透明度
 * options.color {string} 波纹颜色
 * options.duration {string} 动画时间
 * options.easing {string} 过渡效果
 * options.type {string} 可选：hit|center,hit 为点击处触发波纹，center 为中心点触发波纹
 */
const Ripper = (($) => {
  const NAME = 'ripple'
  const VERSION = '1.0.0'
  // const DATA_KEY = 'rn.ripple'
  const Default = {
    on: 'click',
    opacity: '.4',
    color: 'auto',
    duration: '.7',
    easing: 'liner',
    type: 'hit'
  }
  const DefaultType = {
    on: 'string',
    opacity: '(number|string)',
    color: 'string',
    duration: '(number|string)',
    easing: 'string',
    type: 'string'
  }
  const _getConfig = function(config) {
    config = $.extend(Default, config)
    $.typeCheckConfig(NAME, config, DefaultType)
    return config
  }
  const _action = function(event, config) {
    const $this = $(event.target)
    config = $.extend({}, config, $this.data())
    $this.css({
      position: 'relative',
      overflow: 'hidden'
    })
    const $ripple = $('<span></span>').addClass('rn-ripple')
    const size = Math.max($this.outerWidth(), $this.outerHeight())
    $ripple.css({
      height: size,
      width: size
    })
    $ripple.appendTo($this)

    const color = (config.color === 'auto') ? $this.css('color') : config.color
    const css = {
      animationDuration: (config.duration).toString() + 's',
      animationTimingFunction: config.easing,
      background: color,
      opacity: config.opacity
    }

    $ripple.css(css)
    $ripple.removeClass('rn-ripple-animate')

    let x, y
    // 计算
    switch (config.type) {
      case 'center':
        x = $this.outerWidth() / 2 - $ripple.outerWidth() / 2
        y = $this.outerHeight() / 2 - $ripple.outerHeight() / 2
        break
      default:
        x = event.pageX - $this.offset().left - $ripple.width() / 2
        y = event.pageY - $this.offset().top - $ripple.height() / 2
    }
    $ripple.css({
      top: y + 'px',
      left: x + 'px'
    }).addClass('rn-ripple-animate')

    $ripple.one('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function() {
      $(this).remove()
    })
  }
  class Ripper {
    constructor(element, config) {
      this._$element = $(element)
      this._config = _getConfig(config)
      $(document).on(this._config.on, this._$element, (event) => _action(event, this._config))
    }
    static get VERSION() {
      return VERSION
    }

    static _jQueryInterface(config) {
      new Ripper(this, config)
      return this
    }
  }
  $.fn[NAME] = Ripper._jQueryInterface
  $.fn[NAME].Constructor = Ripper
  return Ripper
})($)

export default Ripper

