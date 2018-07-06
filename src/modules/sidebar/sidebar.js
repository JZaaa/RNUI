import $ from '../../tool/module-tool'
/**
 * 侧边栏
 * options {object=} 配置项
 * options.align {string} left|right 左/右侧边栏
 * options.locked {boolean} 是否锁定其他面板，true则会添加阴影层
 * options.onClose {function} 关闭回调
 */
const Sidebar = (($) => {
  const NAME = 'sidebar'
  const VERSION = '1.0.0'
  const DATA_KEY = 'rn.sidebar'
  const Default = {
    align: 'left',
    mask: true,
    onClose: function() {},
    onOpen: function() {}
  }
  const DefaultType = {
    align: 'string',
    mask: 'boolean',
    onClose: 'function',
    onOpen: 'function'
  }
  const _getConfig = function(config) {
    config = $.extend({}, Default, config)
    $.typeCheckConfig(NAME, config, DefaultType)
    return config
  }
  class Sidebar {
    constructor(element, config) {
      this._element = element
      this._config = _getConfig(config)
      this._$mask = $.mask()
      const align = (this._config.align === 'right') ? 'rn-sidebar is-right' : 'rn-sidebar'
      $(this._element).addClass(align)
    }
    static get VERSION() {
      return VERSION
    }
    open(callback) {
      $(this._element).addClass('is-open')
      callback && callback()
      this._config.onOpen && this._config.onOpen()
      this._handleMask('open')
    }
    close(callback) {
      $(this._element).removeClass('is-open')
      callback && callback()
      this._config.onClose && this._config.onClose()
      this._handleMask('close')
    }
    toggle(callback) {
      const open = $(this._element).hasClass('is-open')
      if (open === false) {
        this.open(callback)
      } else {
        this.close(callback)
      }
    }
    _handleMask(type) {
      if (this._config.mask === false) {
        return
      }
      switch (type) {
        case 'open':
          this._$mask.appendTo('body').removeClass('rn-fade-out').addClass('rn-fade-in').one('click', (event) => this.close())
          break
        case 'close':
          this._$mask.removeClass('rn-fade-in').addClass('rn-fade-out').one('animationend webkitAnimationEnd', (event) => {
            this._$mask.remove()
          })
          break
      }
    }
    static _jQueryInterface(config) {
      if ($(this).length !== 1) {
        throw new Error(`${NAME.toUpperCase()}: ` +
            `The selector must be unique`)
      }
      let data = $(this).data(DATA_KEY)
      const _config = $.extend({}, Default, config, $(this).data())
      if (!data) {
        data = new Sidebar(this, _config)
        $(this).data(DATA_KEY, data)
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }
        data[config]()
      }
      return this
    }
  }
  $.fn[NAME] = Sidebar._jQueryInterface
  $.fn[NAME].Constructor = Sidebar
  return Sidebar
})($)
export default Sidebar
