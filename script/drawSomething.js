/* 
我画你猜小游戏
*/
import { loveContainer, reset, resultEle, setBtn } from './common.js'
import { scratcher } from './scratcher.js'

export function drawSth() {
  reset()

  const imgList = ['./images/剪头发.jpg', './images/月会.jpg', './images/kfc.jpg']
  const myAnswer = [
    "剪头发场景剪头发场景剪头发场景剪头发场景剪头发场景剪头发场景剪头发场景剪头发场景",
    "公司月会",
    "肯德基讲课"
  ]
  let currentIndex = 0 // 指针

  loveContainer.innerHTML = `
    <div>我画你猜</div>
    <div class="draw-container">
      <img src="./images/剪头发.jpg" alt="" class="draw-img">
      <div class="my-answer"></div>
    </div>
    <div>
      <div class="scene">猜一场景:</div>
      <div class="input-wrap">
        <input type="text" class="answer-input" placeholder="你的答案~">
        <button class="draw-btn submit">提交</button>
      </div>
    </div>
    <button class="draw-btn next">下一局</button>
  `
  loveContainer.classList.add('draw')
  
  const drawImgEle = document.querySelector('.draw-img')
  const myAnswerEle = document.querySelector('.my-answer')
  const inputELe = document.querySelector('.answer-input')
  const submitBtn = document.querySelector(".submit")
  const nextBtn = document.querySelector('.next')

  submitBtn.addEventListener('click', submit)
  nextBtn.addEventListener('click', again)

  function submit() {
    inputELe.blur()
    const answer = inputELe.value
    if (!answer) {
      alert('先输入你的答案')
      return
    }
    // 多行打字动画效果:间隔一段时间逐个打印出字
    const length = myAnswer[currentIndex].length
    let i = 1

    setTimeout(typing, 500)

    function typing() {
      myAnswerEle.innerHTML = `${myAnswer[currentIndex].slice(0,i)}<span class="separator"></span>`
      i++
      if (i <= length) {
        setTimeout(typing, 500)
      }
      // 最后一局且打字结束
      if (currentIndex === imgList.length - 1 &&  i >= length) {
        setTimeout(()=>{
          loveContainer.innerHTML = ''
          resultEle.innerHTML = `
            你知道的，我不会画画，所以可能画得不太好😅，上面画的这些场景，都是我对你心动的瞬间。<br/>
            游戏到此就结束了~恭喜你，闯关成功！<br/>
            点击按钮去领取你的礼物吧~
          `
          setBtn('prize', receivePrize)
        }, 2000)
      }
    }
  }

  function again() {
    currentIndex++
    drawImgEle.src = imgList[currentIndex]
    myAnswerEle.innerHTML = ''
    inputELe.value = ''

    if (currentIndex >= myAnswer.length - 1) {
      nextBtn.parentNode.removeChild(nextBtn)
    }
  }

  function receivePrize() {
    reset()
    loveContainer.innerHTML = ''
    resultEle.innerHTML = `
      2023年大年初一，我要送给你个礼物，刮开下面这个图层，你就会看到哦。
    `
    scratcher()
  }
}
