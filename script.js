const menuOpenIcon = document.querySelector('.nav-menu-btn')
const menu = document.querySelector('.header-nav')
const menuCloseIcon = document.querySelector('.menuClose')


const MenuFunction = () =>{
            if(menuOpenIcon.getAttribute('aria-expanded') === 'false'){
                menu.classList.remove('mobile-hidden')
                menuOpenIcon.setAttribute('aria-expanded', 'true');
                menuCloseIcon.focus();
            
            }else if(menuOpenIcon.getAttribute('aria-expanded') === 'true'){
                menu.classList.add('mobile-hidden')
                menuOpenIcon.setAttribute('aria-expanded', 'false');
                menuOpenIcon.focus();
            }
           
}


const articleBtn = document.querySelectorAll('.article-btn')


const articleProfile = (event) => {

    if((event.currentTarget.getAttribute('aria-expanded') === 'false')){
        event.currentTarget.setAttribute('aria-expanded', 'true')
        
        const btnImg = event.currentTarget.querySelector('.profile-btn-img')
        event.currentTarget.style.backgroundColor = "#79c8c7"
        event.currentTarget.closest('.director').querySelector('.overlay').style.display = "flex"
       btnImg.style.transform = 'rotate(45deg)';
    } else if((event.currentTarget.getAttribute('aria-expanded') === 'true')){
        event.currentTarget.setAttribute('aria-expanded', 'false')
         
        const btnImg = event.currentTarget.querySelector('.profile-btn-img')
        event.currentTarget.style.backgroundColor = "#ff7f7f"
        event.currentTarget.closest('.director').querySelector('.overlay').style.display = "none"
        btnImg.style.transform = 'rotate(0deg)';
    } else{
        return
    }

  
}


articleBtn.forEach( e =>{
    e.addEventListener('click', articleProfile)
})






menuOpenIcon.addEventListener('click', MenuFunction);
menuCloseIcon.addEventListener('click', MenuFunction)
