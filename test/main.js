import BottomSheet from '../src/modules/bottomSheet'
// import Ripple from '../src/modules/ripple'
import InputNumber from '../src/modules/inputNumber'
import Sidebar from "../src/modules/sidebar";
// import bt from '@/modules/backToTop/backToTop'
// import rp from '@/modules/ripple/ripple'
// import inputNumber from '@/modules/inputNumber/inputNumber'
// import sidebar from '@/modules/sidebar/sidebar'
// import backTop from '../src/modules/backTop'

const a = $('#sidebar-box').sidebar({
  onClose: function () {
    console.log('close')
  },
  onOpen: function () {
    console.log('open')
  }
})
// const a = new Sidebar('#sidebar-box', {})
$('#sidebar').click(function () {
  $('#sidebar-box').sidebar('toggle')
})
$('#sidebar').bottomSheet()
// new Ripple('p')
// $('#sidebar').backTop()
// const a = new backTop('#sidebar', {
//   showHeight: 10
// })
// rp('button')
// rp('.a')

