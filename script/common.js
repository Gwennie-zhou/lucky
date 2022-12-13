export const loveContainer = document.querySelector(".love-container");
export const resultEle = document.querySelector('.result')
export const btnEle = document.querySelector('.btn')

export const screenHeight = document.documentElement.clientHeight;
export const screenWidth = document.documentElement.clientWidth;

// 创建随机数
export function createRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// 重置结果和按钮为空
export function reset() {
  resultEle.innerHTML.length && (resultEle.innerHTML = '')
  btnEle.className.includes('show') && (btnEle.classList.remove('show'))
}

/* 
函数：闯关按钮设置
参数 text: button按钮文字显示
参数fn：监听的事件函数

*/
export function setBtn(text, fn) {
  btnEle.classList.add('show')
  btnEle.textContent = text
  // addEventListener允许为一个事件添加多个监听器，因此需要添加once选项，表示 listener 在添加之后最多只调用一次。
  btnEle.addEventListener('click', fn, {
    once : true
  })
}