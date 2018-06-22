// import bp from '@/modules/bottomPanel/bottomPanel'
// import bt from '@/modules/backToTop/backToTop'
// import rp from '@/modules/ripple/ripple'
import inputNumber from '@/modules/inputNumber/inputNumber'

inputNumber('.input',{
  decrease: '#dec',
  increase: '#inc',
  max: 7,
  min: 6,
  precision: 3,
  onChange: function (val) {
    console.log(val)
  }
})
$('.a').click(function () {
  $('#input').prop('disabled', !$('#input').prop('disabled'))
})
// rp('button')
// rp('.a')

