import Bubble from './Bubble'

const randInt = function(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

const rand = function(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}
const addBubbles = (_bubbles: Bubble[], curBubble?: Bubble) => {
  if (!curBubble) return _bubbles
  const results = []
  for (let k = 0, len1 = _bubbles.length; k < len1; k++) {
    curBubble = _bubbles[k]
    if (curBubble.y + curBubble.r >= 0) {
      results.push(curBubble)
    }
  }
  return results
}
class RisingBubbles {
  maxBubbles: number

  canvas: HTMLCanvasElement

  ctx: any

  bubbles: Bubble[]

  lastFrame: number

  constructor(canvas: HTMLCanvasElement, maxBubbles: number) {
    this.maxBubbles = maxBubbles
    this.canvas = canvas
    this.canvas.width = 300
    this.canvas.height = 300
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.ctx.fillStyle = '#e0f1f4'
    this.ctx.shadowBlur = 10
    this.ctx.shadowColor = '#48d2f9'
    this.bubbles = []
    this.lastFrame = new Date().getTime()
    for (
      let j = 1, ref = randInt(0, this.maxBubbles);
      1 <= ref ? j <= ref : j >= ref;
      1 <= ref ? ++j : --j
    ) {
      this.bubbles.push(
        new Bubble(
          randInt(0, this.canvas.width),
          randInt(0, this.canvas.height),
          rand(0, Bubble.Max_R),
          new Date().getTime(),
        ),
      )
    }
  }

  draw() {
    return this.run(new Date().getTime())
  }

  run(now: number) {
    let bubble
    let j
    let len
    const ref = this.bubbles
    this.update(now)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (j = 0, len = ref.length; j < len; j++) {
      bubble = ref[j]
      this.ctx.moveTo(bubble.x, bubble.y)
      this.ctx.beginPath()
      this.ctx.arc(bubble.x, bubble.y, bubble.r, 0, 2 * Math.PI)
      this.ctx.globalAlpha = bubble.opacity <= 0 ? 0 : bubble.opacity
      this.ctx.fill()
    }
    return requestAnimationFrame(() => {
      return this.run(new Date().getTime())
    })
  }

  update(now: number) {
    let curBubble
    let j
    let len
    for (j = 0, len = this.bubbles.length; j < len; j++) {
      curBubble = this.bubbles[j]
      curBubble.grow(now)
      curBubble.rise()
      curBubble.move(now)
    }
    this.bubbles = addBubbles(this.bubbles, curBubble)
    if (this.maxBubbles - this.bubbles.length > 0) {
      for (
        let k = 1, _bubbles = randInt(0, this.maxBubbles - this.bubbles.length);
        _bubbles >= 1 ? k <= _bubbles : k >= _bubbles;
        _bubbles >= 1 ? ++k : --k
      ) {
        this.bubbles.push(
          new Bubble(
            randInt(20, this.canvas.width - 20),
            randInt(0, this.canvas.height),
            1,
            new Date().getTime(),
          ),
        )
      }
    }
  }
}
export default RisingBubbles
