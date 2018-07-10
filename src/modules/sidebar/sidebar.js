import $ from '../../tool/module-tool'
import Mask from '../mask'
/**
 * 侧边栏
 * options {object=} 配置项
 * options.align {string} left|right 左/右侧边栏
 * options.mask {boolean} true则会添加阴影层
 * options.onClose {function} 关闭回调
 * options.onOpen {function} 打开回调
 */
const Sidebar = (($) => {
  const NAME = 'sidebar'
  const VERSION = '1.0.1'
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
      this._mask = new Mask({
        onTapClose: () => this.close()
      })
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
          this._mask.show()
          break
        case 'close':
          this._mask.close()
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
