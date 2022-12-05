/* 石头剪刀布游戏
1代表石头，2代表剪刀，3代表布
游戏总共3局，无论对方出什么，这边设定出拳为：布，剪刀，石头，出拳顺序连起来即为520 */

let currentResult = 0 // 0代表还没选择,1代表石头，2代表剪刀，3代表布
let currentSession = 0 // 当前游戏的场次，总共3局
let fingerText = '你要出什么？'
const sessionMap = ['一', '二', '三'] 
const fingerMap = ['石头','剪刀','布'] 


const fragment = document.createDocumentFragment()
const fingerImg = document.createElement('img')
const imgList = ['./images/rock.png', './images/scissor.png','./images/paper.png']



let index = 0
const fingerTimeID = setInterval(()=>{
  if (index >= 3) {
    index = 0
  }
  fingerImg.src = imgList[index]  
  index++
}, 1000)

fingerImg.src = './images/paper.png'
fragment.appendChild(fingerImg)

const fingerTextWrap = document.createElement('div')
fingerTextWrap.innerHTML = `
  <div>第${sessionMap[currentSession]}局</div>
  <div class="finger-text">${fingerText}</div>
`
fingerTextWrap.className = 'finger-text-wrap'
fragment.appendChild(fingerTextWrap)

const fingerWrap = document.createElement('div')
fingerWrap.classList.add('finger-btn-wrap')
fingerWrap.innerHTML = `
  <div class="finger" data-id="1">石头</div>
  <div class="finger" data-id="2">剪刀</div>
  <div class="finger" data-id="3">布</div>
`
fingerWrap.addEventListener('click', choose)
fragment.appendChild(fingerWrap)

const pkBtn = document.createElement('div')
pkBtn.innerHTML = 'PK'
pkBtn.className = 'finger pk'
pkBtn.addEventListener('click', startPK)
fragment.appendChild(pkBtn)

loveContainer.appendChild(fragment)
loveContainer.classList.add('finger-container')



function startPK() {
  
}

function choose(e) {
  const id  = e.target.dataset.id
  console.log(id);
  currentResult = id
  const fingerTextEle = document.querySelector('.finger-text')
  fingerTextEle.innerHTML = `你选择的是：${fingerMap[id-1]}`
}


