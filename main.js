/*let aniArr = [{
  title: "Engage Kiss",
  pic_url: "https://engage-kiss.com/assets/img/top/img_main_pc.jpg",
  update: "Sunday 01:00",
  episode: "5",
  isblur: "false"
},{
  title: "夏日重现",
  pic_url: "https://summertime-anime.com/wp/wp-content/themes/summertime-main/_assets/images/top/kv/webp/kv_004_pc2.webp",
  update: "Friday",
  episode: "16",
  isblur: "false"
}]*/

const standAniArrName = ['title', 'pic_url', 'update', 'episode', 'isblur']


document.addEventListener("DOMContentLoaded", loadAniCell(loadJSON()))
window.onbeforeunload = () => saveJSON()


// 加载 ani-cell 实例
function loadAniCell(arr) {
  if (arr === undefined) return
  alert(1)
  arr.forEach((obj, index) => {
    if (typeof obj === 'object') {
      alert(2)
      document.appendChild(document.createElement('ani-cell',
        {
          title: obj.title,
          pic_url: obj.pic_url,
          update: obj.update,
          episode: obj.episode,
          isblur: obj.isblur
        }))
    }
  })
  alert(4)
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













