/* 
类似于刮刮乐小游戏
刮刮乐中，有两个图层，上层是蒙版，下层放着一颗心型图片，上面写着我喜欢你
*/
import { btnEle, loveContainer, reset } from './common.js'

export function scratcher() {
  loveContainer.innerHTML = `
    <div class="scratcher-wrap">
      <div class="underlying">
        <img src="./images/love-fill.png" class="underlying-img"/>
        <div class="underlying-text">
          <span>我喜欢你</span>
          <br/>
          <span>用我所长，尽我所能，给你一个最浪漫的告白仪式，是我奔向你的证明。</span>
          <span>你愿意与我一同开启我们的初恋吗</span>
        </div>
      </div>
      <canvas id="canvas" width="375px" height="350px"></canvas>
    </div>
  `
// canvas 标签有width 和 height属性，需要设置，如果不设置，好像默认都是是100px，所以操作画布的时候，跟我们文档流的坐标系会有所出入。

  const scratcherWrap = document.querySelector('.scratcher-wrap')
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'darkgray'
  ctx.fillRect(0,0,400,350)

  document.addEventListener("selectstart", function (e) {
    e.preventDefault();
  })

  // 移动端，改为touch事件（记住哈，爱你）
  let isDraw = false;
  canvas.addEventListener('touchstart', ()=>{
    isDraw = true
    console.log('touchstart', isDraw)
  })
  canvas.addEventListener('touchmove',move)
  canvas.addEventListener('touchend',()=>{
    isDraw = false
    console.log('touchend', isDraw)
  })

  function move(e) {
    if (isDraw) {
      const local = e.touches[0];
      const x = local.pageX
      // 我们需要知道点击的坐标，但它是相对于整个页面的，我们需要让他相对于画布，所以坐标的y需要减去画布上面的那部分高度
      const y = local.pageY - (document.body.offsetHeight - scratcherWrap.offsetHeight)
      ctx.beginPath() 
      ctx.arc(x, y, 15, 0, 2 * Math.PI) // 这里的x和y是相对于canvas画布
      ctx.globalCompositeOperation = "destination-out"
      ctx.fill()
      ctx.closePath()
    }
  }
  
}