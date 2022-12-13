import { hitHeart } from './loveRain.js'
import { guessFinger } from './fingerGuess.js'
import { drawSth } from './drawSomething.js'
import { scratcher } from './scratcher.js'
import { resultEle, btnEle, setBtn } from './common.js'

resultEle.innerHTML = '你好哇，小小孩，接下来你要挑战的游戏总共有三轮，点击最右下方的按钮开始挑战吧~'

setBtn('start', startGame)

function startGame() {
  // document.querySelector('audio').play()
  hitHeart()
}


// TODO: 待删
// guessFinger()
// drawSth()
// scratcher()