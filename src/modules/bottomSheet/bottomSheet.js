import tpl from './bottomSheet.html'
import $ from '../../tool/module-tool'
/**
 * 底部弹出面
 * 推荐：new BottomSheet(options)
 * $(selector).bottomSheet(options): 需保证selector 唯一
 * options {object}
 * options.maskClose {boolean} 点击遮罩是否关闭面板
 * options.maskClass {string} 添加遮罩class
 * options.contentClass {string} 添加面板class
 * options.title {string|boolean} 标题，内容为字符串时显示
 * options.onClose {function} 关闭时调用函数
 * options.beforeClose {function} 关闭前调用函数，return false 则不关闭面板
 * @function close(callback){} 手动调用关闭
 */
const BottomSheet = (($) => {
  const NAME = 'bottomSheet'
  const VERSION = '1.0.0'
  const DATA_KEY = 'rn.bottomSheet'
  const Default = {
    maskClose: true,
    maskClass: '',
    contentClass: '',
    title: '标题',
    onClose: function() {},
    beforeClose: function() {}
  }
  const DefaultType = {
    maskClose: 'boolean',
    maskClass: 'string',
    contentClass: 'string',
    title: '(string|boolean)',
    onClose: 'function',
    beforeClose: 'function'
  }

  const _getConfig = function(config) {
    config = $.extend(Default, config)
    $.typeCheckConfig(NAME, config, DefaultType)
    return config
  }

  class BottomSheet {
    constructor(config) {
      this._config = _getConfig(config)
      this._$wrap = $($.render(tpl, this._config))
      this._$mask = this._$wrap.find('.rn-mask')
      this._$panel = this._$wrap.find('.rn-bottom-panel')
      this._init()
    }
    static get VERSION() {
      return VERSION
    }
    _init() {
      if (this._config.maskClose) {
        this._$mask.on('click', (event) => {
          this.close()
        })
      }
      $('body').append(this._$wrap).css('overflow', 'hidden')
      this._$panel.addClass('rn-slide-in-up rn-animate')
      this._$mask.addClass('rn-fade-in rn-animate')
      return {
        wrap: this._$mask,
        content: this._$panel.find('.content')
      }
    }
    close(callback) {
      if (this._config.beforeClose() === false) {
        return
      }
      this._$panel.addClass('rn-slide-out-down')
      $('body').css('overflow', '')
      this._$mask.addClass('rn-fade-out').one('animationend webkitAnimationEnd', (event) => {
        this._$wrap.remove()
        this._config.onClose()
        callback && callback()
      })
    }

    static _jQueryInterface(config) {
      if ($(this).length !== 1) {
        throw new Error(`${NAME.toUpperCase()}: ` +
            `The selector must be unique`)
      }
      let data = $(this).data(DATA_KEY)
      const _config = $.extend({}, Default, config, $(this).data())
      if (!data) {
        data = new BottomSheet(_config)
        $(this).data(DATA_KEY, data)
      }

      if (config === 'close') {
        data[config]()
      }
      return this
    }
  }

  $.fn[NAME] = BottomSheet._jQueryInterface
  $.fn[NAME].Constructor = BottomSheet
  return BottomSheet
})($)

export default BottomSheet

