export class CyGame {
  images: any
  runCallback: any
  scene: any
  actions: any
  keydowns: any
  canvas: null | HTMLCanvasElement
  context: null | CanvasRenderingContext2D
  constructor(images: any, runCallback: any) {
    this.images = images
    this.runCallback = runCallback
    //
    this.scene = null
    this.actions = {}
    this.keydowns = {}
    this.canvas = document.querySelector("#id-canvas")
    this.context = this.canvas!.getContext("2d")
    // events
    this.handleEvents()
    this.init()
  }
  // 创建单例
  static instance(...args: any) {
    this.i = this.i || new this(...args)
    return this.i
  }
  handleEvents() {
    let self = this
    window.addEventListener("keydown", (event) => {
      this.keydowns[event.key] = "down"
    })
    window.addEventListener("keyup", (event) => {
      self.keydowns[event.key] = "up"
    })
  }
  drawImage(cyImage: any) {
    this.context!.drawImage(
      cyImage.texture,
      cyImage.x,
      cyImage.y,
      cyImage.w,
      cyImage.h
    )
  }
  // update
  update() {
    this.scene.update()
  }
  // draw
  draw() {
    this.scene.draw()
  }
  //
  registerAction = (key: any, callback: any) => {
    this.actions[key] = callback
  }
  // 递归 动态调试

  runLoop() {
    let s = this

    s.keyActions()
    //update
    s.update()
    //clear
    s.context!.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
    //draw
    s.draw()
    // next run loop

    // setTimeout(() => {
    //     this.runLoop();
    // }, 1000 / window.fps);

    requestAnimationFrame(this.runLoop.bind(this))
  }

  keyActions() {
    // events
    // log(this.actions, 'this.actions')
    let actions = Object.keys(this.actions)
    for (const key in this.actions) {
      let status = this.keydowns[key]
      if (status === "down") {
        // 如果按键被按下, 调用注册的 actions
        this.actions[key]("down")
      } else if (status === "up") {
        this.actions[key]("up")
        // 删除 key 的状态
        this.keydowns[key] = null
      }
    }
  }
  textureByName(name: string) {
    let img = this.images[name]
    // let image = {
    //     w: width,
    //     h: height,
    //     img: this.images[name],
    // }
    return img
  }

  runWithScene(scene: any) {
    this.scene = scene
    // 开始运行
    // setTimeout(() => {
    //     this.runLoop();
    // }, 1000 / window.fps);
    this.runLoop()
  }
  drawCircle(cyjCircle: any) {
    this.context!.fillStyle = cyjCircle.color
    this.context!.beginPath()
    this.context!.arc(cyjCircle.x, cyjCircle.y, cyjCircle.r, 0, 2 * Math.PI)
    this.context!.fill()
  }
  replaceScene(scene: any) {
    this.scene = scene
  }

  __start() {
    this.runCallback(this)
  }

  init() {
    //
    let loads = []
    // 预先载入所有图片
    // log(this.images, 'this.images')
    let object = this.images
    let names = Object.keys(this.images)
    for (const name in object) {
      const path = this.images[name]
      const img = new Image()
      img.src = path
      console.log(path, typeof path, "path")
      img.onload = () => {
        // 存入 this.images 中
        this.images[name] = img
        // 所有图片都载入成功后, 调用run
        console.log("hello 载入图片", loads.length, this.images)
        loads.push(1)
        if (loads.length === names.length) {
          console.log("hello 载入图片")
          this.__start()
        }
      }
    }
  }
}
