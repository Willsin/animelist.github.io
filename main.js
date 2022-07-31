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


document.addEventListener("DOMContentLoaded", loadAniCell(loadJSON()))
window.onbeforeunload = () => saveJSON()

//  document.body.innerHTML += JSON.stringify(loadJSON())

document.querySelector('#addAni').addEventListener('click', () => {
  loadAniCell([{}])
})




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













