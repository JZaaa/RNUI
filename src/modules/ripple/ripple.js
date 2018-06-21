import $ from 'jquery'
import '@css/ripple.less'

/**
 * 点击波纹效果
 * 注：使用此功能会改变目标元素 position: 'relative'
 * @param el 目标元素，必须
 * @param options {object=} 配置项
 * @param options.on {string} 触发事件
 * @param options.opacity {string|number} 波纹透明度
 * @param options.color {string} 波纹颜色
 * @param options.duration {string} 动画时间
 * @param options.easing {string} 过渡效果
 * @param options.type {string} 可选：hit|center,hit 为点击处触发波纹，center 为中心点触发波纹
 */
export default function(el, options = {}) {
  options = $.extend({
    on: 'click',
    opacity: '.4',
    color: 'auto',
    duration: '.7',
    easing: 'liner',
    type: 'hit'
  }, options)

  function ripple(e) {
    const $this = $(this)

    if ($this) {
      $this.css({
        position: 'relative',
        overflow: 'hidden'
      })
      const $ripple = $('<span></span>').addClass('rn-ripple')
      const size = Math.max($this.outerWidth(), $this.outerHeight())
      $ripple.css({
        height: size,
        width: size
      })
      $ripple.appendTo($this)

      const color = (options.color === 'auto') ? $this.css('color') : options.color
      const css = {
        animationDuration: (options.duration).toString() + 's',
        animationTimingFunction: options.easing,
        background: color,
        opacity: options.opacity
      }

      $ripple.css(css)
      $ripple.removeClass('rn-ripple-animate')

      let x, y
      // 计算
      switch (options.type) {
        case 'center':
          x = $this.outerWidth() / 2 - $ripple.outerWidth() / 2
          y = $this.outerHeight() / 2 - $ripple.outerHeight() / 2
          break
        default:
          x = e.pageX - $this.offset().left - $ripple.width() / 2
          y = e.pageY - $this.offset().top - $ripple.height() / 2
      }

      // 动画结束删除span
      // $ripple.one('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function() {
      //   $(this).remove()
      // })

      // 设置动画与定位
      $ripple.css({
        top: y + 'px',
        left: x + 'px'
      }).addClass('rn-ripple-animate')
    }
  }

  $(document).on(options.on, el, ripple)
}
