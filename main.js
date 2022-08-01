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
const cellBox = document.querySelector('#cellBox')

loadAniCell(loadJSON())
cellSwipe()

// 关闭前保存
window.onbeforeunload = () => saveJSON()

// 事件监听
document.querySelector('#addAni').onclick = () => {
  loadAniCell([{}])
}

function cellSwipe() {
  document.querySelectorAll('ani-cell').forEach(ele => {
    ele.onpointerdown = event_down => {
      event_down.preventDefault()
      ele.setPointerCapture(event_down.pointerId)
      let shiftX = event_down.clientX - ele.getBoundingClientRect().left

      ele.onpointermove = event_move => {
        ele.style.left = event_move.clientX - shiftX - cellBox.getBoundingClientRect().left + 'px'
      }

      ele.onpointerup = () => {
        ele.onpointermove = null
        ele.onpointerup = null
      }
    }
  })
}



/*
  <slot name='img'></slot>
  <!-- <img class="ani-img" src="${ this.pic_url }"> -->

  <slot name='title'></slot>
  <!-- <span class="ani-title">${ this.title }</span> -->

  <span class="ani-description">更新至第 <slot name='episode'></slot> 集</span>
  <!-- <span class="ani-description ani-episode">${ this.episode }</span> -->

  <slot name='update'></slot>
  <!-- <span class="ani-description">${ this.update }</span> -->
*/



// 加载 ani-cell 实例
function loadAniCell(arr) {
  if (arr === undefined) return
  arr.forEach(obj => {
    if (typeof obj === 'object') {

      let aniCell = document.createElement('ani-cell')

/*      standAniArrName.forEach(name => {
        aniCell.setAttribute(name, obj[name])
      })*/

      aniCell.innerHTML = `
        <img slot='img' class="ani-img" src="${ obj.pic_url }">
        <span slot='title' class="ani-title">${ obj.title }</span>
        <span class="ani-description ani-episode">${ obj.episode }</span>
        <span class="ani-description">${ obj.update }</span> 
      `

      cellBox.append(aniCell)
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













