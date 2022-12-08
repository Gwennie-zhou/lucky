/* 
类似于刮刮乐小游戏
刮刮乐中，有两个图层，上层是蒙版，下层放着一颗心型图片，上面写着我喜欢你
*/

function scratcher() {
  loveContainer.innerHTML = `
    <div class="scratcher-wrap">
      <div class="underlying">
        <img src="./images/love-fill.png" class="underlying-img"/>
        <div class="underlying-text">我喜欢你</div>
      </div>
      <canvas id="canvas" width="400" height="100"></canvas>
    </div>
  `

  const scratcherWrap = document.querySelector('.scratcher-wrap')
  const canvas = document.querySelector('#canvas')
  ctx = canvas.getContext('2d')

  ctx.fillStyle = 'darkgray'
  ctx.fillRect(0,0,400,100)

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
      const x = e.pageX - scratcherWrap.offsetLeft + scratcherWrap.offsetWidth / 2
      const y = e.pageY - scratcherWrap.offsetTop - scratcherWrap.offsetHeight / 2
      ctx.beginPath() 
      ctx.arc(x,y, 20, 0, 2 * Math.PI) // 这里的x和y是相对于canvas画布
      ctx.globalCompositeOperation = "destination-out"
      ctx.fill()
      ctx.closePath()
    }
  }
  
}