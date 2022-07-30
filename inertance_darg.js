/**
 * 惯性原理:
 * 产生的速度 = 移动距离 / 移动时间
 * 距离 = 松开的坐标 - 上次的坐标  (距离差)
 * 时间 = 松开的时间 - 按下的时间  (时间差)
 * */

inertanceDarg.init({
  dargDom: '.ani-cell'
})

let inertanceDarg = {
  dargDom:null, //惯性滑动的DOM区域
  startX:0, //开始偏移的X
  startY:0, //开始偏移的Y
  clientX:0,
  clientY:0,
  translateX:0, //保存的X偏移
  translateY:0, //保存的Y偏移
  maxWidth:0, //滑动的最大宽度
  maxHeight:0, //滑动的最大高度
  startTime:0, //记录初始按下时间
  init:function(config){
    this.dargDom = document.querySelector(config.dargDom)
    this.maxWidth = this.dargDom.offsetWidth
    this.maxHeight = this.dargDom.offsetHeight
    
    this.dargDom.addEventListener('touchstart',(event)=>{
      event.stopPropagation() //停止事件传播
      this.clientX = event.changedTouches[0].clientX
      this.clientY = event.changedTouches[0].clientY
      this.dargDom.style.WebkitTransition = this.dargDom.style.transition = ''
      this.startX = this.translateX
      this.startY = this.translateY
      this.startTime = Date.now()
    },false)
    
    this.dargDom.addEventListener('touchmove',(event)=>{
      if(document.documentElement.scrollTop >= this.dargDom.scrollHeight - this.dargDom.clientHeight){
        
      }else{
        return
      }
    
      event.stopPropagation() //停止事件传播
      this.translateX = event.changedTouches[0].clientX - this.clientX + this.startX
      this.translateY = event.changedTouches[0].clientY - this.clientY + this.startY
      if(this.translateY > 0 ){ //拖动系数. 拉力的感觉
        this.translateY *= 0.4
      }else if( this.translateY < -(this.dargDom.scrollHeight - this.dargDom.clientHeight)){ 
        this.translateY = (event.changedTouches[0].clientY - this.clientY) * 0.4 + this.startY
      }
      this.animate(this.translateY)
    },false)
    
    this.dargDom.addEventListener('touchend',(event)=>{
      event.stopPropagation() //停止事件传播
      var distanceY = event.changedTouches[0].clientY - this.clientY,
      timeDis = Date.now() - this.startTime,  //时间差
      speed = (distanceY / timeDis) * 100
      
      // 惯性
      this.translateY += speed
  
      this.translateY = 0
      // 添加贝塞尔曲线
      this.dargDom.style.WebkitTransition = this.dargDom.style.transition = 'transform 500ms cubic-bezier(0.1, 0.57, 0.1, 1)'
      this.animate(this.translateY)
    
    },false)
  },
  animate:function(y){
    this.dargDom.style.WebkitTransform = this.dargDom.style.transform = 'translateY('+y+'px)'
  }
}