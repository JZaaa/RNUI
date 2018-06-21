import tpl from './bottomPanel.html'
import $ from '../../tool/jquery-extend'
import '@css/bottomPanel.less'

/**
 * 底部弹出面
 * 单例
 * @param options {object}
 * @param options.mask {boolean} 是否显示遮罩
 * @param options.maskClose {boolean} 点击遮罩是否关闭面板
 * @param options.maskClass {string} 添加遮罩class
 * @param options.contentClass {string} 添加面板class
 * @param options.title {string|boolean} 标题，内容为字符串时显示
 * @param options.onClose {function} 关闭时调用函数
 * @param options.beforeClose {function} 关闭前调用函数，return false 则不关闭面板
 * @function close(callback){} 手动调用关闭
 */
let _sington
export default function(options = {}) {
  if (_sington) return _sington
  options = $.extend({
    mask: true,
    maskClose: true,
    maskClass: '',
    contentClass: '',
    title: '标题',
    onClose: function() {},
    beforeClose: function() {}
  }, options)

  const $warp = $($.render(tpl, options))
  const $mask = $warp.find('.rn-mask')
  const $panel = $warp.find('.rn-bottom-panel')

  // 关闭面板
  function _close(callback) {
    if (options.beforeClose() === false) {
      return
    }
    $panel.addClass('rn-slide-out-down')
    $mask.addClass('rn-fade-out').on('animationend webkitAnimationEnd', function() {
      $warp.remove()
      _sington = false
      options.onClose()
      callback && callback()
    })
  }
  // 打开面板
  function _open() {
    if (options.maskClose) {
      $mask.on('click', function() {
        _close()
      })
    }
    $('body').append($warp)
    $panel.addClass('rn-slide-in-up rn-animate')
    $mask.addClass('rn-fade-in rn-animate')
    return {
      wrap: $warp[0],
      content: $panel.find('.content')[0]
    }
  }
  function close(callback) {
    _close(callback)
  }
  _sington = _open()
  _sington.close = close
  return _sington
}
