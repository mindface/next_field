import gsap from "gsap"

export default class OnLoadJs {
  constructor (){
    
  }

  init(){
    window.addEventListener('load', () => {
      this.pageScrollEvent()
    })
  }

  mouse_move(){
    const element_cursor = document.getElementById('js-cursor')
    // element_cursor.id = 'js-cursor'
    // element_cursor.className = 'cursor'
    const element_chaser = document.getElementById('js-chaser')
    // element_chaser.id = 'js-chaser'
    // element_chaser.className = 'chaser'
    document.body.appendChild(element_cursor)
    document.body.appendChild(element_chaser)
    const target = document.querySelector('a')
    let delay = 10,
        cursorPosX = 0,
        cursorPosY = 0,
        chaserPosX = 0,
        chaserPosY = 0;

    gsap.to({},.001,{
      repeat: -1,
      onRepeat: function() {
        chaserPosX += (cursorPosX - chaserPosX) / delay
        chaserPosY += (cursorPosY - chaserPosY) / delay

        gsap.set(element_cursor,{
          css: {
            left: cursorPosX - (element_cursor.clientWidth - 10 / 2),
            top: cursorPosY - (element_cursor.clientWidth - 10 / 2),
          }
        })
        gsap.set(element_chaser,{
         css: {
           left: chaserPosX - (element_chaser.clientWidth - 10 / 2),
           top: chaserPosY - (element_chaser.clientWidth - 10 / 2),
         }
       })
      }
    })

     
     document.onmousemove = function(e) {
       cursorPosX = e.pageX
       cursorPosY = e.pageY
     }

     target.onmouseover = function(){
       element_cursor.classList.add('active')
       element_chaser.classList.add('active')
     }
     target.onmouseout = function(){
       element_cursor.classList.remove('active')
       element_chaser.classList.remove('active')
    }
  }

  pageScrollEvent(){
    const paginations = document.querySelectorAll('.pagination a')
    const sections_box = document.querySelectorAll(".l-section")
    const observerRoot = document.querySelector('.l-box')
     paginations.forEach(pagination => {
       pagination.addEventListener("click", e => {
         e.preventDefault()
         const targetId = e.target.hash
         const target = document.querySelector(targetId)
         target.scrollIntoView({behavior:"smooth"})
       })
     })
     const options = {
      root: observerRoot,
      rootMargin: "-50% 0px",
      threshold: 0
    }
     const observer = new IntersectionObserver(doWhenIntersect,options)
     sections_box.forEach(section => {
       observer.observe(section)
     })

     function doWhenIntersect(entries){
       entries.forEach( entry => {
          if(entry.isIntersecting){
            activatePagination(entry.target)
          }
       })
     }

     function activatePagination(element){
       const currentActiveIndex = document.querySelector("#pagination .active")
       if(currentActiveIndex !== null) {
         currentActiveIndex.classList.remove("active")
       }
       const newActiveIndex = document.querySelector(`a[href='#${element.id}']`)
       newActiveIndex.classList.add('active')
       const addClassElement = document.getElementById('section'+newActiveIndex.dataset.id)
       removeDomClass('active')
       addClassElement.classList.add('active')
     }

     function removeDomClass(className){
       const target_elements = document.getElementsByClassName('memo-area')
       for (let index = 0; index < target_elements.length; index++) {
         target_elements[index].classList.remove(className);
       }
     }

  }
}
