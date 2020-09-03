class Bubble {
  x: number

  y: number

  r: number

  opacity = 1

  createdAt: number

  rising = false

  startedRisingAt = 0

  static Max_R = 5

  static MAX_V = 0.01

  static GROWTH_RATE = 0.00005

  constructor(x: number, y: number, r: number, createdAt: number) {
    this.x = x
    this.y = y
    this.r = r
    this.createdAt = createdAt
  }

  grow(now: number) {
    if (!this.rising && this.r <= Bubble.Max_R) {
      this.r += Bubble.GROWTH_RATE * (now - this.createdAt)
    }
  }

  move(now: number) {
    if (this.rising) {
      this.y -= (now - this.startedRisingAt) * this.velocity()
      if (this.opacity < 0) this.opacity = 0
      this.opacity -= 0.005
    }
  }

  rise() {
    if (!this.rising && this.r > 2) {
      this.rising = Math.random() < 0.15 * (this.r / Bubble.Max_R)
      if (this.rising) {
        this.startedRisingAt = new Date().getTime()
      }
    }
  }

  velocity() {
    return (this.r / 20) * Bubble.MAX_V
  }
}

export default Bubble
