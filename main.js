// 1.自制超链接a的锚点跳转动画
let myAnimationaTags = document.querySelector('.myAnimation')
myAnimationaTags.onclick = function (xxx) {
    // 取消a默认的跳转动作
    xxx.preventDefault()

    // 找到a要跳转的目标
    let a = xxx.currentTarget
    let href = a.getAttribute('href')
    let element = document.querySelector(href)

    let targetTop = element.offsetTop // 目标高度
    let currentTop = window.scrollY // 当前高度

    /*** 用setInterval在500毫秒内滚完动画，滚25次 ***/
    let n = 25 // 一共滚动25次（500毫秒25次，也就是50帧/s）
    let duration = 500 / n // 多少时间滚动一次
    let distance = (targetTop - currentTop) / n // 每次滚动的距离

    let i = 0
    let timerID = setInterval(() => {
        if (i === n) {
            window.clearInterval(timerID)
            return
        }
        i = i + 1
        window.scrollTo(0, currentTop + distance * i)
    }, duration)
}


// 2.用tween.js做a跳转的缓动动画

/*** tween.js需要的代码，不用管 ***/
function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);
/*** tween.js需要的代码，不用管 ***/

let tweenjsAnimationaTags = document.querySelector('.tweenjsAnimation')
tweenjsAnimationaTags.onclick = function (xxx) {
    // 取消a默认的跳转动作
    xxx.preventDefault()

    // 找到a要跳转的目标
    let a = xxx.currentTarget
    let href = a.getAttribute('href')
    let element = document.querySelector(href)

    let targetTop = element.offsetTop // 目标高度
    let currentTop = window.scrollY // 当前高度

    // 用tween.js缓动
    let time = Math.abs((targetTop - currentTop) / 100 * 500)
    if (time > 500) {
        time = 500
    }

    const coords = {
        y: currentTop
    }; // 初始位置
    const tween = new TWEEN.Tween(coords)
        .to({
            y: targetTop
        }, time) // time秒内移动到targetTop
        .easing(TWEEN.Easing.Quadratic.InOut) // 使用的tween的缓动函数Quadratic.InOut
        .onUpdate(() => {
            window.scrollTo(0, coords.y) // 窗口滚动到coords.y，coords.y是由tween更新的，最后coords.y等于targetTop
        })
        .start();
}


// 3.tween.js的官方快速上手demo

// 创建box
const box = document.createElement('div');
box.innerText='tween.js官方demo'
box.style.setProperty('background-color', '#008800');
box.style.setProperty('width', '100px');
box.style.setProperty('height', '100px');
document.body.appendChild(box);

// Setup the animation loop.
function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);

const coords = {
    x: 0,
    y: 0
}; // 初始位置(0, 0)
const tween = new TWEEN.Tween(coords) // 创建tween
    .to({
        x: 300,
        y: 200
    }, 1000) // 1秒内移动到(300, 200)
    .easing(TWEEN.Easing.Quadratic.Out) // 使用的tween的缓动函数
    .onUpdate(() => {
        // 改变box的style添加动画
        box.style.setProperty('transform', `translate(${coords.x}px, ${coords.y}px)`);
    })
    .start(); // 启动