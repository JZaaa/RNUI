import $ from './index'
/**
 * jquery 拓展，引用此页面请勿引用jquery
 * 单例
 */

const Util = {
  toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase()
  },
  isElement(obj) {
    return (obj[0] || obj).nodeType
  }
}
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
  // 遮罩层
  mask: function() {
    return $('<div class="rn-mask"></div>')
  },
  // https://github.com/twbs/bootstrap/blob/v4-dev/js/src/util.js
  // 类型检测
  typeCheckConfig(componentName, config, configTypes) {
    for (const property in configTypes) {
      if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
        const expectedTypes = configTypes[property]
        const value = config[property]
        const valueType = value && Util.isElement(value) ? 'element' : Util.toType(value)
        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new Error(`${componentName.toUpperCase()}: ` +
              `Option "${property}" provided type "${valueType}" ` +
              `but expected type "${expectedTypes}".`)
        }
      }
    }
  }
})

export default $
