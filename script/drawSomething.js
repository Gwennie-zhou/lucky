/* 
你画我猜小游戏
*/
function drawSth() {
  const imgList = ['./images/剪头发.jpg', './images/月会.jpg', './images/kfc.jpg']
  const myAnswer = [
    "剪头发场景",
    "公司月会",
    "肯德基讲课"
  ]
  let currentIndex = 0 // 指针

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
    console.log(answer);
    if (!answer) {
      alert('先输入你的答案')
      return
    }
    myAnswerEle.innerHTML = `${myAnswer[currentIndex]}`
    const length = myAnswer[currentIndex].length
    myAnswerEle.style.width = `${length}em`
    myAnswerEle.style.animation = `typing 4s steps(${length}), flicker .75s steps(1) infinite`
  }

  function again() {
    currentIndex++
    drawImgEle.src = imgList[currentIndex]
    myAnswerEle.innerHTML = ''
    inputELe.value = ''
  }
}
