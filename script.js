const menuOpenIcon = document.querySelector('.nav-menu-btn')
const menu = document.querySelector('.header-nav')
const menuCloseIcon = document.querySelector('.menuClose')


const MenuFunction = () =>{
            if(menuOpenIcon.getAttribute('aria-expanded') === 'false'){
                menu.classList.remove('mobile-hidden')
                menuOpenIcon.setAttribute('aria-expanded', 'true');
                
            
            }else if(menuOpenIcon.getAttribute('aria-expanded') === 'true'){
                menu.classList.add('mobile-hidden')
                menuOpenIcon.setAttribute('aria-expanded', 'false');
            }
}

menuOpenIcon.addEventListener('click', MenuFunction);
menuCloseIcon.addEventListener('click', MenuFunction)
