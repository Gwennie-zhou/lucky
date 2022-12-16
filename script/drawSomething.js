/* 
我画你猜小游戏
*/
import { loveContainer, reset, resultEle, setBtn } from './common.js'
import { scratcher } from './scratcher.js'

export function drawSth() {
  reset()

  const imgList = ['./images/剪头发.jpg', './images/月会.jpg', './images/kfc.jpg']
  const myAnswer = [
    "当时见你剪完头发后，第一眼是震惊。我看到了你身上的少年气，这深深地吸引了我。从此在我心中埋下了一颗好感的种子，也就是从这个时候起，我开始关注你。",
    "公司月会的时候，你脱口秀讲了自己小时候宁愿自己受老师责罚也不愿供出自己的同伴，却在同伴以为你出卖了他们的时候哭了起来，当时虽然你讲得绘声绘色，可是我却并不觉得好笑，而是感动，在你身上，我看到了重情重义的美德，以至于我很想跟你交朋友，想好好认识你。",
    "那天晚上已经很晚了，你第二天还要上班，却还是在肯德基帮我讲解项目，我一开始听得云里雾里，有点着急，你却还是很耐心地帮我讲解，像极了校园恋爱里学霸帮学渣辅导功课的场景，说实话，我动心了。"
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
            你知道的，我不会画画，所以可能画得不太好😅，上面画的这些场景，都是我慢慢喜欢上你的催化剂。<br/>
            游戏到此就结束了~恭喜你，闯关成功！<br/>
            点击按钮去领取你的礼物吧~
          `
          setBtn('prize', receivePrize)
        }, 5000)
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
      2022年是我的本命年，都说本命年运气会差，我感觉在我身上是验证了。😅<br/>
      这一年，最幸福的，也是唯一幸运的事，大概就是遇见你了吧。<br/>
      2023年大年初一，我要送给你个礼物，刮开下面这个图层，你就会看到哦。
    `
    scratcher()
  }
}
