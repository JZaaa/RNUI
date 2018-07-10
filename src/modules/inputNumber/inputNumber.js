import $ from '../../tool/module-tool'

/**
 * 数字输入框
 * new rn.InputNumber(selector, options) | $(selector).inputNumber(options)
 * options {object=} 配置项
 * options.decrease {string} 减少绑定元素
 * options.increase {string} 增加绑定元素
 * options.min {number} 最小值
 * options.max {number} 最大值
 * options.step {number} 步进值
 * options.precision {number} 最大精确位数
 * options.formatter {function} 输入框展示格式化函数
 * options.parser {function} 输入框解析函数，对应formatter，若设置formatter选项，则此项必须设置
 * options.onChange {function} 数值改变回调函数
 * @type {InputNumber}
 */
const InputNumber = (($) => {
  const NAME = 'inputNumber'
  const VERSION = '1.0.0'
  const DATA_KEY = 'rn.inputNumber'
  const Default = {
    decrease: undefined,
    increase: undefined,
    min: undefined,
    max: undefined,
    step: 1,
    precision: undefined,
    formatter: undefined,
    parser: undefined,
    onChange: function(val) {}
  }
  const DefaultType = {
    decrease: '(undefined|string)',
    increase: '(undefined|string)',
    min: '(undefined|number)',
    max: '(undefined|number)',
    step: 'number',
    precision: '(undefined|number)',
    formatter: '(undefined|function)',
    parser: '(undefined|function)',
    onChange: 'function'
  }

  const _getConfig = function(config) {
    config = $.extend({}, Default, config)
    const { formatter, parser, onChange } = config
    if (typeof formatter === 'string') {
      config.formatter = formatter.toFunc()
    }
    if (typeof parser === 'string') {
      config.parser = parser.toFunc()
    }
    if (typeof onChange === 'string') {
      config.onChange = onChange.toFunc()
    }
    $.typeCheckConfig(NAME, config, DefaultType)
    return config
  }

  class InputNumber {
    constructor(element, config) {
      this._element = element
      this._config = _getConfig(config)
      this.currentVal = null
      this._init()
    }
    static get VERSION() {
      return VERSION
    }
    // 获取值
    getValue() {
      let val = $.trim($(this._element).val())
      if (this._config.parser) {
        val = this._config.parser(val)
      }
      return val
    }
    // 设置值
    setValue(val) {
      const $el = $(this._element)
      const precision = this._config.precision
      if (val && !isNaN(precision)) {
        val = Number(Number(val).toFixed(precision))
      }
      if (this._config.formatter) {
        $el.val(this._config.formatter(val))
      } else {
        $el.val(val)
      }
      this.currentVal = val
      this._changeVal(val)
      this._config.onChange(val)
    }
    //  减少
    decrease() {
      if ($(this._element).prop('disabled') === true) {
        return false
      }
      this._changeStep('decrease')
    }
    // 增加
    increase() {
      if ($(this._element).prop('disabled') === true) {
        return false
      }
      this._changeStep('increase')
    }
    _init() {
      const $el = $(this._element)
      this.setValue($el.val())
      $(this._config.decrease).on('click', (event) => this.decrease())
      $(this._config.increase).on('click', (event) => this.increase())
      $el.on('input', (event) => this._change(event))
      $el.on('change', (event) => this._change(event))
    }
    // 按钮控制
    _changeVal(val) {
      val = Number(val)
      const { max, min, decrease, increase, step } = this._config
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
    // 步进器改变数值
    _changeStep(type) {
      const $el = $(this._element)
      if ($el.prop('disabled') || $el.prop('readonly')) {
        return false
      }

      let val = Number(this.getValue())
      const step = Number(this._config.step)
      if (isNaN(val)) {
        return false
      }
      if (type === 'increase') {
        val = $.addNum(val, step)
      } else if (type === 'decrease') {
        val = $.addNum(val, -step)
      }
      this.setValue(val)
    }
    // 数值改变事件
    _change(event) {
      let val = this.getValue()
      const currentVal = this.currentVal
      if (event.type === 'input' && val.match(/^\-?\.?$|\.$/)) return
      const { max, min } = this._config
      const empty = val.length === 0
      val = Number(val)
      if (empty) {
        this.setValue(null)
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
        this.setValue(val)
      } else {
        this.setValue(currentVal)
      }
    }
    static _jQueryInterface(config) {
      return this.each(function() {
        let data = $(this).data(DATA_KEY)
        const _config = $.extend({}, Default, config, $(this).data())
        if (!data) {
          data = new InputNumber(this, _config)
          $(this).data(DATA_KEY, data)
        }
      })
    }
  }
  $.fn[NAME] = InputNumber._jQueryInterface
  $.fn[NAME].Constructor = InputNumber
  return InputNumber
})($)

export default InputNumber

