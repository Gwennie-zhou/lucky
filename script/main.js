import { hitHeart } from './loveRain.js'
import { guessFinger } from './fingerGuess.js'
import { drawSth } from './drawSomething.js'
import { scratcher } from './scratcher.js'
import { resultEle, btnEle, setBtn } from './common.js'

resultEle.innerHTML = `
  你好哇，接下来你要挑战的游戏总共有三关。<br/>
  第一关游戏类似于营销活动中的红包雨，每次击中一个爱心就会获得20积分，游戏计时30s，你要至少获得520个积分才算闯关成功哦。<br/>
  点击最右下方的按钮开始挑战吧~
`

// setBtn('start', startGame)

function startGame() {
  document.querySelector('audio').play()
  hitHeart()
}


// TODO: 待删
// guessFinger()
drawSth()
// scratcher()