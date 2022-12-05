/* 石头剪刀布游戏
1代表石头，2代表剪刀，3代表布
游戏总共3局，无论对方出什么，这边设定出拳为：布，剪刀，石头，出拳顺序连起来即为520 */

function guessFinger() {
  // 定义所有变量
  let currentResult = 0; // 0代表还没选择,1代表石头，2代表剪刀，3代表布
  let currentRound = 0; // 当前游戏的场次，总共3局
  let yourChooseText = "你要出什么呢，悄悄告诉我呗~";
  let myChooseText = "我要出什么好呢";
  const roundMap = ["一", "二", "三"];
  const fingerMap = ["石头", "剪刀", "布"];
  let fingerTimeID = null; //定时器id
  const imgList = [
    "./images/rock.png",
    "./images/scissor.png",
    "./images/paper.png",
  ];

  // 页面添加元素
  loveContainer.innerHTML = `
    <div class="round">第${roundMap[currentRound]}局</div>
    <div class="my-choose">${myChooseText}</div>
    <div class="finger-img-wrap">
      <img src="./images/paper.png" class="finger-img" />
      <div class="pk-text">PK</div> 
      <img src="" class="your-choose-img"/>
    </div>
    <div class="your-choose">${yourChooseText}</div>
    <div class="game-result"></div>
    <div class="finger-btn-wrap">
      <button class="finger" data-id="1">石头</button>
      <button class="finger" data-id="2">剪刀</button>
      <button class="finger" data-id="3">布</button>
    </div>
    <div class="finger-btn-wrap">
      <button class="finger-btn pk">PK</button>
      <button class="finger-btn again">再来</button>
    </div>
  `;
  loveContainer.classList.add("finger-container");

  //获取页面元素
  const fingerImgEle = document.querySelector(".finger-img");
  const fingerBtnWrapEle = document.querySelector(".finger-btn-wrap");
  const pkBtnEle = document.querySelector(".pk");
  const myChooseEle = document.querySelector(".my-choose");
  const yourChooseEle = document.querySelector(".your-choose");
  const yourChooseImg = document.querySelector(".your-choose-img");
  const pkTextEle = document.querySelector(".pk-text");
  const againEle = document.querySelector(".again");
  const roundEle = document.querySelector(".round");
  const gameResultEle = document.querySelector(".game-result");
  const fingerBtnSet = document.querySelectorAll('.finger')

  // 页面一开始每隔1秒切换猜拳图片，提高体验感
  toggleImg();

  // 石头剪刀布的点击事件
  fingerBtnWrapEle.addEventListener("click", choose);

  // pk按钮的点击事件
  pkBtnEle.addEventListener("click", startPK);

  function toggleImg() {
    let index = 0;
    fingerTimeID = setInterval(() => {
      if (index >= 3) {
        index = 0;
      }
      fingerImgEle.src = imgList[index];
      index++;
    }, 1000);
  }

  function choose(e) {
    const id = e.target.dataset.id;
    currentResult = Number(id);
    const yourChooseTextEle = document.querySelector(".your-choose");
    yourChooseTextEle.innerHTML = `你要出“${
      fingerMap[currentResult - 1]
    }”吗？你会输的哦~`;
  }

  function startPK() {
    if (!currentResult) {
      alert('你要先出拳哦~')
      return
    }
    clearInterval(fingerTimeID);
    myChooseEle.innerHTML = `我出：${fingerMap[2 - currentRound]}`; //2-currentRound的原因是：出拳的结果刚好跟我们列的数组是反过来的
    yourChooseEle.innerHTML = `你出的是：${fingerMap[currentResult - 1]}`;
    pkTextEle.classList.toggle("show");
    fingerImgEle.src = `${imgList[2 - currentRound]}`;
    yourChooseImg.src = `${imgList[currentResult - 1]}`;
    againEle.classList.add("show");
    calcResult();
    pkBtnEle.classList.toggle('forbidden')
    currentRound !== 0 && againEle.classList.toggle('forbidden')
    Array.from(fingerBtnSet).forEach(btn => btn.classList.toggle('forbidden')) // TODO: 有点问题，不能达到禁止按钮点击的效果
  }

  function calcResult() {
    // 1代表石头，2代表剪刀，3代表布
    let result;
    switch (currentRound) {
      case 0:
        result =
          currentResult === 1
            ? "哎哟，你输了呀，我就说你出石头会输的嘛，哈哈哈~"
            : currentResult === 2
            ? "这次我先让你，我们再来一局"
            : "平局哦，再来";
        break;
      case 1:
        result =
          currentResult === 1
            ? "好吧，我输了，再来，我不信下局还不能赢你"
            : currentResult === 2
            ? "平局啊，再来，信不信下局我一定赢你"
            : "哈哈，不好意思，一不小心就赢了你";
        break;
      case 2:
        result =
          currentResult === 1
            ? "竟然平局，好吧"
            : currentResult === 2
            ? "哈哈，别伤心，虽然你输了，但是后面有彩蛋哦~"
            : "我不管，最后一局，是我让你，记住了吗";
        break;
    }
    gameResultEle.innerHTML = result;
  }

  againEle.addEventListener("click", againPlay);

  function againPlay() {
    currentResult = 0
    currentRound++;
    roundEle.innerHTML = `第${roundMap[currentRound]}局`;
    myChooseEle.innerHTML = myChooseText;
    yourChooseEle.innerHTML = yourChooseText;
    gameResultEle.innerHTML = "";
    pkTextEle.classList.toggle("show");
    yourChooseImg.src = "";
    toggleImg();
    againEle.classList.toggle('forbidden')
    pkBtnEle.classList.toggle('forbidden')
    Array.from(fingerBtnSet).forEach(btn => btn.classList.toggle('forbidden')) //TODO: 有点问题，不能达到禁止按钮点击的效果
  }
}
