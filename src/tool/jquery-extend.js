import $ from 'jquery'
/**
 * jquery 拓展，引用此页面请勿引用jquery
 * 单例
 */

$.extend(String.prototype, {
  /**
   * 字符串转函数
   * @returns {*}
   */
  toFunc: function() {
    if (!this || this.length === 0) return undefined

    if (this.startsWith('function')) {
      return (new Function('return ' + this))()
    }

    const m_arr = this.split('.')
    let fn = window

    for (let i = 0; i < m_arr.length; i++) {
      console.log(fn)
      fn = fn[m_arr[i]]
    }

    if (typeof fn === 'function') {
      return fn
    }

    return undefined
  }
})

$.extend(Function.prototype, {
  // 修复字符串转函数拓展
  toFunc: function() {
    return this
  }
})

$.extend({
  /**
   * 渲染页面
   * @param tpl
   * @param data
   * @returns {*}
   */
  render: function(tpl, data) {
    const code = 'var p=[];with(this){p.push(\'' +
        tpl.replace(/[\r\t\n]/g, ' ').split('<%').join('\t').replace(/((^|%>)[^\t]*)'/g, '$1\r').replace(/\t=(.*?)%>/g, '\',$1,\'').split('\t').join('\');').split('%>').join('p.push(\'').split('\r').join('\\\'') + '\');}return p.join(\'\');'
    return new Function(code).apply(data)
  },
  addNum: function(num1, num2) {
    let sq1, sq2
    try {
      sq1 = num1.toString().split('.')[1].length
    } catch (e) {
      sq1 = 0
    }
    try {
      sq2 = num2.toString().split('.')[1].length
    } catch (e) {
      sq2 = 0
    }
    const m = Math.pow(10, Math.max(sq1, sq2))
    return (Math.round(num1 * m) + Math.round(num2 * m)) / m
  }
})

export default $
