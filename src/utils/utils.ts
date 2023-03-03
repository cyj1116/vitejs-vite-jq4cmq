// const log = (s) => {
//     e('#id-text-log').value += '\n' + s
// }

const log = console.log.bind(console, "---Log:")

const e = (sel: string) => document.querySelector(sel)

const es = (sel: string) => Array.from(document.querySelectorAll(sel))

const imageFromPath = (path: string) => {
  const img = new Image()
  img.src = path
  return img
}

const bindAll = (sel: string, eventName: string, callback: any) => {
  let l = es(sel)
  for (let i = 0; i < l.length; i++) {
    const input = l[i]
    input.addEventListener(eventName, (event: any) => {
      callback(event)
    })
  }
}

const imageByName = (name: string) => {}

// 矩形相交
const rectIntersects = (a: any, b: any) => {
  // log(a.y, b.y, 'ab')
  // AB两矩形相交
  // b 在 a 中
  // b 左上角的 x 在 a 的里面
  // b 的 y 在 a 的里面
  // 还要考虑一次 a 在 b 中
  // 有bug
  if (b.y > a.y && b.y < a.y + a.h) {
    if (b.x > a.x && b.x < a.x + a.w) {
      // log('相撞')
      return true
    }
  }
  return false
}

const randomBetween = (start: number, end: number) => {
  let n = Math.random() * (end - start + 1)
  return Math.floor(n + start)
}

const randomZF = () => {
  if (Math.random() > 0.5) {
    return +1
  } else return -1
}
export {
  log,
  e,
  es,
  imageFromPath,
  bindAll,
  imageByName,
  rectIntersects,
  randomBetween,
  randomZF,
}
