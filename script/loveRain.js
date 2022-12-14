// 爱心雨步骤
// 1、创建爱心图像
// 2、给爱心添加下落动画requestAnimationFrame, 每个爱心的下落的速度和距离左侧left的距离不一样,下落的距离可以用transform: translateY()
// 3、给爱心绑定点击事件（可以绑定在爱心容器里），点击后积分+10，同时需要给用户一个反馈
// 4、爱心下落到不可见区域时，需要销毁，可以设置一个定时器，每隔2秒监听所生成的爱心图像

import { createRandom, reset, loveContainer, screenHeight, screenWidth, btnEle, resultEle, setBtn } from './common.js'
import { guessFinger } from './fingerGuess.js'


let totalScore; //总积分
let loveList; // 用于收集生成的红包
let clickedLoveList; //用于收集已集中的红包

// 开始游戏
export function hitHeart() {
  reset()
  // 每次游戏开始后都重置变量
  totalScore = 0;
  loveList = [];
  clickedLoveList = [];

  createLove(createRandom(3, 8));

  // 间隔2s生成爱心
  const timeID = setInterval(() => {
    for (let i = 0; i < 3; i++) {
      createLove(createRandom(3, 8));
    }
  }, 1500);

  loveContainer.addEventListener("click", clickLove);

  setTimeout(destroyLove, 2000);

  // 计时1min，1min后出结果
  setTimeout(() => {
    clearInterval(timeID);
    if (totalScore < 520) {
      resultEle.innerHTML = `omg，当前你的得分为: ${totalScore}。<br/><br/>不足以挑战下一关<br/><br/>你得重新挑战一下哦~`
      setBtn('again', hitHeart)
    } else {
      resultEle.innerHTML = `
      当前你的得分为：520，<br/>
      恭喜你，闯关成功！<br/>
      这一关我想表达的是，如果你没有努力去争取到520个积分，你就无法进入下一关，就像是我们之间的关系一样，如果你不曾努力向我靠近，我们也就没有后来的故事。<br/>
      好了，第二关游戏是猜拳，游戏总共有三局，选好出拳结果后点击对应按钮，然后点击pk就行。<br/>
      快去闯关吧~祝你好运哦~`
      setBtn('next', guessFinger)
    }
  }, 1000 * 30);
}


// 生成爱心节点
function createLove(speed) {
  const loveEle = document.createElement("img");
  loveEle.setAttribute("data-love-id", Math.random()); //红包的唯一标识，用于接下来红包是否重复点击的依据
  loveEle.src = "./love.png";

  /* TODO: 优化1:https://www.xiabingbao.com/post/canvas/canvas-redpackrain.html
红包下落位置注意两点：
1、不应该下落在边缘位置,即screenWidth-80
2、不与最近一次降落的红包重叠
通过一个变量记录上一次left的距离，如果当前的left与上一个元素的left相差绝对值小于80，表明重叠了，则根据left靠左还是靠右去+80px或-80px */

  loveEle.style.left = createRandom(0, screenWidth - 80) + "px"; // 爱心的left不能超过容器外，80是以爱心的宽度加20保险起见设置的
  loveEle.classList.add("love");

  loveList.push(loveEle);
  loveContainer.appendChild(loveEle);

  // 给爱心添加下落动画
  let y = 0; // 起始位置

  // 爱心下落动画
  function fall() {
    y += speed; // 每一帧以2-4px下落，一秒内最多执行60次，即一秒可能下降的距离在120px-240px之间，假设屏幕的高度为600px，则完成整个动画的时间将在2.5-5秒之间
    // loveEle.style.transform = `translateY(${y}px)`
    loveEle.style.top = `${y}px`;
    if (y < screenHeight + 120) {
      requestAnimationFrame(fall);
    }
  }
  requestAnimationFrame(fall);
}

// 击中爱心
function clickLove(e) {
  const element = e.target;
  if (element.nodeName !== "IMG") return;

  // 统计积分数，得判断之前击中的红包是否再次点击，如果再次击中，则不往上叠加积分
  let isClicked = false;
  if (clickedLoveList.length) {
    // 已有点击过的数组
    isClicked = clickedLoveList.some(
      (ele) => ele.dataset.loveId === element.dataset.loveId
    );
  }

  if (isClicked) return;

  totalScore += 20;
  clickedLoveList.push(element);

  // 给用户一个点击爱心后的反馈
  const scoreImg = document.createElement("img");
  scoreImg.classList.add("score");
  scoreImg.src = "./+10.png";
  scoreImg.style.top = `${parseFloat(element.style.top)}px`; // 由于拿到的top是带有单位px的，所以需要parseFloat提取其中数字
  scoreImg.style.left = `${parseFloat(element.style.left) + 60}px`;

  loveContainer.appendChild(scoreImg);

  setTimeout(() => {
    loveContainer.removeChild(scoreImg);
  }, 500);
}

// 爱心下落到不可见时，销毁爱心节点
function destroyLove() {
  loveList.forEach((love, index) => {
    // const yPX = love.style.transform
    // const y = yPX.match(/\d+/)
    const y = parseFloat(love.style.top);
    if (y > screenHeight) {
      //当下落的距离大于屏幕高度时，即爱心不可见了，销毁元素
      love.parentNode.removeChild(love);
      loveList.splice(index, 1); // 切记：不仅要将当前节点从dom中删除，还要从列表中删除
    }
  });

  // 顺便销毁击中的爱心列表，性能优化方面，以防clickedLoveList在调用some方法时负重太深
  clickedLoveList.forEach((love, index) => {
    const y = parseFloat(love.style.top);
    if (y > screenHeight) {
      clickedLoveList.splice(index, 1);
    }
  });

  loveList.length && setTimeout(destroyLove, 2000);
}

