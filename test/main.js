// import BottomSheet from '../src/modules/bottomSheet'
// import Ripple from '../src/modules/ripple'
import InputNumber from '../src/modules/inputNumber'
// import bt from '@/modules/backToTop/backToTop'
// import rp from '@/modules/ripple/ripple'
// import inputNumber from '@/modules/inputNumber/inputNumber'
// import sidebar from '@/modules/sidebar/sidebar'
// import backTop from '../src/modules/backTop'

const a = new InputNumber('input', {
  decrease: '#dec',
  increase: '#inc',
  min: -1,
  max: 5,
  step: 1.1,
  precision: 2,
  formatter: undefined,
  parser: undefined,
  onChange: function(val) {
  }
})
// $('#sidebar').bottomSheet()
// new Ripple('p')
// $('#sidebar').backTop()
// const a = new backTop('#sidebar', {
//   showHeight: 10
// })
// rp('button')
// rp('.a')

