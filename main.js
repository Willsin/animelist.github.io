/*

  [{
    title: "Engage Kiss",
    pic_url: "https://engage-kiss.com/assets/img/top/img_main_pc.jpg",
    update: "Sunday 01:00",
    episode: "5",
    isblur: "false"
  }]

*/

const standAniArrName = ['title', 'pic_url', 'update', 'episode', 'isblur']


loadAniCell(loadJSON())
cellSwipeListen()

// 关闭前保存
window.onbeforeunload = () => saveJSON()

// 事件监听
document.querySelector('#addAni').onclick = () => {
  loadAniCell([{}])
}

function cellSwipeListen() {
  document.querySelectorAll('.ani-cell').forEach(ele => {
    ele.onpointerdown = event => {
      ele.setPointerCapture(event.pointerId)

      ele.onpointermove = event => {
        ele.style.right = event.clientX + 'px'
      }

      ele.onpointerup = () => {
        ele.onpointermove = null
        ele.onpointerup = null
        ele.style.left = ''
      }
    }
  })
}





// 加载 ani-cell 实例
function loadAniCell(arr) {
  if (arr === undefined) return
  arr.forEach(obj => {
    if (typeof obj === 'object') {
      let aniCell = document.createElement('ani-cell')

      standAniArrName.forEach(name => {
        aniCell.setAttribute(name, obj[name])
      })

      document.querySelector('#cellBox').append(aniCell)
    }
  })
}



function saveJSON() {
  let eleArr = document.querySelectorAll('ani-cell')
  let aniArr = []

  eleArr.forEach(item => {
    aniArr.push({
      title: item.title,
      pic_url: item.pic_url,
      update: item.update,
      episode: item.episode,
      isblur: item.isblur
    })
  })
  localStorage.setItem('aniArr', JSON.stringify(aniArr))
}

function loadJSON() {
  if (localStorage.getItem('aniArr')) {
    return JSON.parse(localStorage.getItem('aniArr'))
  }
}













