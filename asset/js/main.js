/*===== EXPANDER MENU  =====*/ 
const showMenu = (toggleId, navbarId, bodyId)=>{
    const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId),
    bodypadding = document.getElementById(bodyId)
  
    if(toggle && navbar){
      toggle.addEventListener('click', ()=>{
        navbar.classList.toggle('expander')
  
        bodypadding.classList.toggle('body-pd')
      })
    }
  }
  showMenu('nav-toggle','navbar','body-pd')
  
/*===== LINK ACTIVE  =====*/ 
const linkColor = document.querySelectorAll('.nav__link')
function colorLink(e){
    e.preventDefault()
    
    const navbar = document.getElementById('navbar')
    const bodypd = document.getElementById('body-pd')
    const targetUrl = this.href
    
    // If on gallery page and going to home, minimize navbar first
    if (window.location.pathname.includes('gallery.html') && targetUrl.includes('index.html')) {
        // Start minimize animation
        navbar.classList.remove('expander')
        bodypd.classList.remove('body-pd')
        
        // Wait for animation to complete before navigating
        setTimeout(() => {
            linkColor.forEach(l=> l.classList.remove('active'))
            this.classList.add('active')
            window.location.href = targetUrl
        }, 300) // Match new faster CSS transition duration
    } else {
        // Normal navigation for other cases
        linkColor.forEach(l=> l.classList.remove('active'))
        this.classList.add('active')
        window.location.href = targetUrl
    }
}
linkColor.forEach(l=> l.addEventListener('click', colorLink))
  
  
  /*===== COLLAPSE MENU  =====*/ 
  const linkCollapse = document.getElementsByClassName('collapse__link')
  var i
  
  for(i=0;i<linkCollapse.length;i++){
    linkCollapse[i].addEventListener('click', function(){
      const collapseMenu = this.nextElementSibling
      collapseMenu.classList.toggle('showCollapse')
  
      const rotate = collapseMenu.previousElementSibling
      rotate.classList.toggle('rotate')
    })
  }
  
  