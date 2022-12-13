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
      <canvas id="canvas"></canvas>
    </div>
  `

  const scratcherWrap = document.querySelector('.scratcher-wrap')
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'darkgray'
  ctx.fillRect(0,0,400,350)

  document.addEventListener("selectstart", function (e) {
    e.preventDefault();
  })

  let isDraw = false;
  canvas.addEventListener('mousedown', ()=>{
    isDraw = true
  })
  canvas.addEventListener('mousemove',move)
  canvas.addEventListener('mouseup',()=>{
    isDraw = false
  })

  function move(e) {
    if (isDraw) {
      console.log(e);
      const x = e.pageX
      const y = e.pageY - scratcherWrap.offsetTop
      ctx.beginPath() 
      ctx.arc(x,y, 20, 0, 2 * Math.PI) // 这里的x和y是相对于canvas画布
      ctx.globalCompositeOperation = "destination-out"
      ctx.fill()
      ctx.closePath()
    }
  }
  
}