import $ from '../../tool/module-tool'

/**
 * 遮罩层
 * fixed 是否为绝对定位
 * style 添加样式
 * tapClose 点击自动关闭
 * onTapClose 自动关闭回调
 * onClick 点击回调
 * @type {Mask}
 */
const Mask = (($) => {
  const NAME = 'mask'
  const VERSION = '1.0.0'
  const Default = {
    fixed: true,
    style: false,
    tapClose: true,
    onTapClose: function() {},
    onClick: function() {}
  }
  const DefaultType = {
    fixed: 'boolean',
    style: '(object|boolean)',
    tapClose: 'boolean',
    onTapClose: 'function',
    onClick: 'function'
  }
  const _getConfig = function(config) {
    config = $.extend({}, Default, config)
    $.typeCheckConfig(NAME, config, DefaultType)
    return config
  }
  class Mask {
    constructor(config) {
      this._config = _getConfig(config)
      this._$wrap = $('<div class="rn-mask rn-animate"></div>')
      if (typeof this._config.style === 'object') {
        this._$wrap.css(this._config.style)
      }
      if (this._config.fixed === true) {
        this._$wrap.css('position', 'fixed')
      }
    }
    static get VERSION() {
      return VERSION
    }
    show(callback) {
      $.bodyLocked(true)
      this._$wrap.appendTo('body').removeClass('rn-fade-out').addClass('rn-fade-in').one('click', (event) => {
        this._handleClick()
      }).on('touchmove', (event) => {
        Mask._prevent(event)
      }).one('animationend webkitAnimationEnd', (event) => {
        callback && callback()
      })
    }
    close(callback) {
      $.bodyLocked(false)
      this._$wrap.removeClass('rn-fade-in').addClass('rn-fade-out').one('animationend webkitAnimationEnd', (event) => {
        this._$wrap.remove()
        callback && callback()
      })
    }
    getElement() {
      return this._$wrap
    }
    _handleClick() {
      if (this._config.onClick) {
        this._config.onClick()
      }
      if (this._config.tapClose) {
        this._config.onTapClose()
        this.close()
      }
    }
    static _prevent(event) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
  return Mask
})($)
export default Mask

