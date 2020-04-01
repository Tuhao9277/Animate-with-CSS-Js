document.querySelector('body').addEventListener('mousemove', eyeball);
function eyeball(event) {
  const eyes = document.querySelectorAll('.eye');
  eyes.forEach(eye => {
    // eye.getBoundingClientRect() 获取眼球相对于视窗的位置信息
    // clientWidth clientHeight 眼球的宽高，拿一半的值与视窗值相加，以从中点计算
    const x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
    const y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
    // 用鼠标位置到中心点的距离 计算旋转角（弧度数） radian 范围 (-Pi/2,Pi/2)
    const radian = Math.atan2(event.pageX - x, event.pageY - y);
    // radian为一个逆时针角度，故翻转一下 (-90 或 + 270)
    const rot = radian * (180 / Math.PI) * -1 -90;
    eye.style.transform = "rotate("+rot+"deg";
  });
}
