import $ from 'jquery'

/**
 * 返回顶部
 * 注：建议默认display样式设置为none
 * @param el 目标选择器，需保证唯一
 * @param options {object=} 配置项
 * @param options.showHeight {number} 当滑动此位置时显示目标
 * @param options.backPosition {number} 返回位置
 * @param options.animate {object} 动画效果
 * @param options.display {string} 目标display默认样式
 */
export default function(el, options = {}) {
  options = $.extend({
    showHeight: 400,
    backPosition: 0,
    animate: {
      show: 'rn-fade-in',
      hide: 'rn-fade-out'
    },
    display: ''
  }, options)

  let interval = null
  const visible = (options.showHeight !== false)
  const $el = $(el)
  $el.addClass('rn-animate')
  if (!$el[0]) {
    console.error('cannot find element')
  }
  $el[0].style.display = 'none'
  function _handleScroll() {
    (window.pageYOffset > options.showHeight) ? _show() : _hide()
  }
  function _show() {
    $el[0].style.display = options.display
    $el.removeClass(options.animate.hide).addClass(options.animate.show)
  }
  function _hide() {
    $el.removeClass(options.animate.show).addClass(options.animate.hide)
  }

  function backToTop() {
    const start = window.pageYOffset
    let i = 0
    interval = setInterval(() => {
      const next = Math.floor(easeInOutQuad(10 * i, start, -start, 500))
      if (next <= options.backPosition) {
        window.scrollTo(0, options.backPosition)
        clearInterval(interval)
      } else {
        window.scrollTo(0, next)
      }
      i++
    }, 16.7)
  }
  function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b
    return -c / 2 * (--t * (t - 2) - 1) + b
  }
  if (visible) {
    window.addEventListener('scroll', _handleScroll)
  }
  $el.on('click', function() {
    backToTop()
  }).on('animationend webkitAnimationEnd', function() {
    if ($(el).hasClass(options.animate.hide)) {
      $el[0].style.display = 'none'
    }
  })
}
