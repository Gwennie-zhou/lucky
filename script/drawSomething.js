/* 
我画你猜小游戏
*/
import { btnEle, loveContainer, reset, setBtn } from './common.js'
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
      <div>猜一场景，把你的答案写在下面这个输入框中</div>
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
    }
  }

  function again() {
    currentIndex++
    drawImgEle.src = imgList[currentIndex]
    myAnswerEle.innerHTML = ''
    inputELe.value = ''

    if (currentIndex >= myAnswer.length - 1) {
      nextBtn.parentNode.removeChild(nextBtn)
      setBtn('next', scratcher)
    }
  }
}
