const bar = document.querySelector('.scroll');
const main = document.querySelector('.main');
const right = document.querySelector('.right');
const left = document.querySelector('.left');
const mainWidth = main.offsetWidth;
bar.addEventListener('mousedown', handler);
function handler(event) {
  // 滑杆的相对父元素左边的距离
  const x = bar.offsetLeft;
  // 当前按下鼠标的位置
  const { clientX } = event;
  const diffX = clientX - x;
  document.onmousemove = function(event) {
    // 当前鼠标在页面上的位置
    let moveX = event.clientX - diffX;
    if (moveX < 0) {
      // 如果超出窗口，则置为0
      moveX = 0;
    } else if (moveX > mainWidth - bar.offsetWidth) {
      // 否则的话 置为父元素最大宽度
      moveX = mainWidth;
    }
    // moveX为新坐标的位置 ，现在要转化为百分比
    const changeX = (moveX / mainWidth) * 100;
    left.style.width = changeX + '%';
    right.style.width = 100 - changeX + '%';
  };
  document.onmouseup = function() {
    this.onmousemove = null;
    this.onmouseup = null;
  };
}
