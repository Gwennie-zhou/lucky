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