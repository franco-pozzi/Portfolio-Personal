/* ================ MOSTRAR Y OCULTAR MENU  ================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* ===== MOSTRAR MENU  ===== */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu'),
        navToggle.style.visibility = 'hidden'
    })
}
/* ===== OCULTAR MENU  ===== */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu'),
        navToggle.style.visibility = 'visible'
    })
}

/* ===== OCULTAR MENU en MOBILE ===== */

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // Click en nav__link, sacamos clase show-menu
    navMenu.classList.remove('show-menu')
    navToggle.style.visibility = 'visible'
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/* ===== ANIMATION EN HABILIDADES ===== */

const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}  

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})


/* ===== CALIFICACIONES TABS ===== */
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')
      

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)
        
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/* ===== Servicios Modal ===== */

const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button')
    //   modalCloses = document.querySelectorAll('.services__modal-close')
    

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal'),
    document.body.style.overflow = 'hidden'    
}

modalBtns.forEach((modalBtn, i) =>{
    modalBtn.addEventListener('click', () =>{
        modal(i)
    })
})

//Cambiar modalViews(primero) por modalCloses si queremos que solo cierre con icono X
modalViews.forEach((modalClose) =>{
    modalClose.addEventListener('click', () =>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal'),
            document.body.style.overflow = 'auto'
        })
    })
})


/*-- Portfolio Swiper --*/

let swiper = new Swiper('.portfolio__container', {
    cssMode: true,    
    // spaceBetween: 30,    
    loop: true,    
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    mousewheel: true,
    keyboard: true,    
});


/* ================ Scroll Section  Active ================== */

const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/* ================ CHANGE BACKGROUND HEADER  ================== */

function scrollHeader(){
    const nav = document.getElementById('header')
    // Cuando el scoll es mayor que 80 viewport de alto, agrega class='scroll-header' al header tag
    if(this.scrollY >=80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* ================ MOSTRAR SCROLL TOP  ================== */

function scrollUp(){
    const scrollUp =  document.getElementById('scroll-up');
    // Cuando el scoll es mayor que 560 viewport de alto, agrega class='show-scroll' al header tag
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/* ================ Cambiar tema Oscuro // light  ================== */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'sun'


// Tema previamente seleccionado ( si el usuario selecciono uno previamente)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Obtenemos el tema actual de la interface validando el tema dark
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'moon' : 'sun'

// Validamos si el usuario selecciono un tema
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'moon' ? 'add' : 'remove'](iconTheme)
    if (document.body.className == darkTheme){themeButton.src = 'icons/sun.svg'}    
}

// activando o desactivando manualmente con el boton
themeButton.addEventListener('click', ()=>{
    //agregamos o removemos el tema
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    
    if (document.querySelector('.sun') == null){
       themeButton.src = 'icons/sun.svg'
    } else {themeButton.src ='icons/moon.svg'}
   
    // guardamos la seleccion
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})