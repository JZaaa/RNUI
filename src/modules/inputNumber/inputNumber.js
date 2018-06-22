import $ from '../../tool/jquery-extend'

/**
 * 数字输入框
 * @param el {string} 目标元素，必须，可对单个元素设置data-* 属性
 * @param options {object=} 配置项
 * @param options.decrease {string} 减少绑定元素
 * @param options.increase {string} 增加绑定元素
 * @param options.min {number} 最小值
 * @param options.max {number} 最大值
 * @param options.step {number} 步进值
 * @param options.precision {string} 最大精确位数
 * @param options.formatter {function} 输入框展示格式化函数
 * @param options.parser {function} 输入框解析函数，对应formatter，若设置formatter选项，则此项必须设置
 * @param options.onChange {function} 数值改变回调函数
 * @returns {jQuery|HTMLElement}
 */
export default function(el, options = {}) {
  options = $.extend({
    decrease: undefined,
    increase: undefined,
    min: undefined,
    max: undefined,
    step: 1,
    precision: undefined,
    formatter: undefined,
    parser: undefined,
    onChange: function(val) {}
  }, options)
  const $all = $(el)
  $all.each(function() {
    const $el = $(this)
    const self = $.extend(options, $el.data())
    const { formatter, parser, onChange } = self
    if (typeof formatter === 'string') {
      self.formatter = formatter.toFunc()
    }
    if (typeof parser === 'string') {
      self.parser = parser.toFunc()
    }
    if (typeof onChange === 'string') {
      self.onChange = onChange.toFunc()
    }
    // 绑定事件
    const bind = {
      down: function() {
        _decrease(event, $el, self)
      },
      up: function() {
        _increase(event, $el, self)
      },
      change: function() {
        _change(event, self)
      }
    }
    _setValue($el, $el.val(), self)
    $(self.decrease).on('click', bind.down)
    $(self.increase).on('click', bind.up)
    $el.on('input', bind.change)
    $el.on('change', bind.change)
  })
  // 减少
  function _decrease(event, $el, opts) {
    if (event.target.disabled === true) {
      return false
    }
    _changeStep('decrease', $el, opts)
  }
  // 增加
  function _increase(event, $el, opts) {
    if (event.target.disabled === true) {
      return false
    }
    _changeStep('increase', $el, opts)
  }
  // 步进器改变数值
  function _changeStep(type, $el, opts) {
    if ($el.prop('disabled') || $el.prop('readonly')) {
      return false
    }

    let val = Number(_getValue($el, opts.parser))
    const step = Number(opts.step)
    if (isNaN(val)) {
      return false
    }
    if (type === 'increase') {
      val = $.addNum(val, step)
    } else if (type === 'decrease') {
      val = $.addNum(val, -step)
    }
    _setValue($el, val, opts)
  }
  // 获取值
  function _getValue($el, parser) {
    let val = $.trim($el.val())
    if (parser) {
      val = parser(val)
    }
    return val
  }
  // 设置值
  function _setValue($el, val, opts) {
    const precision = opts.precision
    if (val && !isNaN(precision)) {
      val = Number(Number(val).toFixed(precision))
    }
    if (opts.formatter) {
      $el.val(opts.formatter(val))
    } else {
      $el.val(val)
    }
    $el.data('currentVal', val)
    _changeVal(val, opts)
    opts.onChange(val)
  }
  // 数值改变事件
  function _change(event, opts) {
    const $el = $(event.target)
    let val = _getValue($el, opts.parser)
    const currentVal = $el.data('currentVal')
    if (event.type === 'input' && val.match(/^\-?\.?$|\.$/)) return
    const { max, min } = opts
    const empty = val.length === 0
    val = Number(val)
    if (empty) {
      _setValue($el, null, opts)
      return
    }
    if (event.type === 'change') {
      if (currentVal === val && val > min && val < max) return
    }
    if (!isNaN(val) && !empty) {
      if (event.type === 'input' && val < min) return
      if (val > max) {
        val = max
      } else if (val < min) {
        val = min
      }
      _setValue($el, val, opts)
    } else {
      _setValue($el, currentVal, opts)
    }
  }
  // 按钮控制
  function _changeVal(val, opts) {
    val = Number(val)
    const { max, min, decrease, increase, step } = opts
    const $decrease = $(decrease)
    const $increase = $(increase)
    if (!isNaN(val)) {
      $increase.prop('disabled', val + step > max)
      $decrease.prop('disabled', val - step < min)
    } else {
      $increase.prop('disabled', true)
      $decrease.prop('disabled', true)
    }
  }

  return $all
}
