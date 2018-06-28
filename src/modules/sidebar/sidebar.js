import tpl from './sidebar.html'
import $ from '../../tool/module-tool'
import '@css/sidebar.less'

/**
 * 侧边栏
 * @param options {object=} 配置项
 * @param options.append {boolean} 调用后是否添加至body内，false则关闭后删除
 * @param options.show {boolean} 默认是否显示
 * @param options.align {string} left|right 左/右侧边栏
 * @param options.locked {boolean} 是否锁定其他面板，true则会添加阴影层
 * @param options.width {string|number} 宽度
 * @param options.slot {boolean|object} 是否自定义内容
 * @param options.slot.el {object} 自定义内容选择器
 * @param options.slot.parent {object} 自定义内容父选择器(容器)
 * @param options.title {string|object} 侧边栏标题
 * @param options.className {string} 侧边栏自定义class
 * @param options.onClose {function} 关闭回调
 * @param options.items {array} 侧边栏内容
 */
export default function(options = {}) {
  options = $.extend({
    slot: false,
    append: true,
    show: false,
    align: 'left',
    locked: true,
    width: 'auto',
    title: {
      text: '',
      subtitle: ''
    },
    items: [],
    className: '',
    onClick: function(res, event) {},
    onClose: function() {},
    onOpen: function() {}
  }, options)

  // 默认模板
  let $el, $mask, $sidebar
  // 默认模板调用函数
  const _self = {
    _init: function() {
      if ($mask) {
        $mask.on('click', function() {
          _self._close()
        })
      }
      $sidebar.find('.rn-items').on('click', '.rn-item', function(event) {
        const $this = $(this)
        const index = $this.index()
        options.items[index].onClick ? options.items[index].onClick.call($this, event) : options.onClick($this, event)
      })
      if (options.show) {
        $sidebar.addClass('is-open')
      }
      if (options.append === true) {
        $('body').append($el.hide())
      }
    },
    _close: function() {
      $sidebar.removeClass('is-open')
      if (options.append === true) {
        $sidebar.addClass('rn-fade-out')
        $mask.addClass('rn-fade-out')
        // $el.hide()
      } else {
        $el.remove()
      }
      _onClose()
    },
    _open: function() {
      if (options.append === true) {
        $el.show()
      } else {
        $('body').append($el)
      }
      $sidebar.addClass('is-open rn-animate rn-fade-in')
      $mask.addClass('rn-animate rn-fade-in')
      _onOpen()
    }
  }
  if (options.slot === false) {
    const $wrap = $($.render(tpl, options))
    $el = $wrap
    $mask = $wrap.find('.rn-mask')
    $sidebar = $wrap.find('.rn-sidebar')
    _self._init()
  }
  function _onClose() {
    options.onClose()
  }
  function _onOpen() {
    options.onOpen()
  }
  function open() {
    if (options.slot === false) {
      _self._open()
    }
  }
  function close() {
    if (options.slot === false) {
      _self._close()
    }
  }
  return {
    $sidebar,
    open: open,
    close: close
  }
}
