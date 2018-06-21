import $ from 'jquery'
/**
 * jquery 拓展，引用此页面请勿引用jquery
 * 单例
 */
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
  }
})

export default $
