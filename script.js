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


const submitButton = document.querySelector('.sbmtBtn')

const formCheck = (event) => {
    event.preventDefault()

    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');
     const nameError = document.querySelector('#nameError')
     const emailError = document.querySelector('#emailError')
     const messageError = document.querySelector('#messageError')
    if(!nameInput.validity.valid){
       
        nameError.classList.remove('hidden')
        nameError.textContent = "This field is required"
    } else{
        nameError.classList.add('hidden')
    } 


if (emailInput.validity.typeMismatch){
        emailError.textContent = "Please use a valid email address"
        .emailError.classList.remove('hidden')
} else if(emailInput.validity.valueMissing){
            emailError.textContent = "This field is required"
            emailError.classList.remove('hidden')
        }else {
            emailError.textContent = "Please use a valid email address"
            
        }
    if(messageInput.validity.valueMissing){
        
        messageError.classList.remove('hidden')
        messageError.textContent = "This field is required"
        } else{
            messageError.classList.add('hidden')
        }

        
}

const contactForm = document.querySelector('.contact-form')

contactForm.addEventListener('submit', formCheck)



menuOpenIcon.addEventListener('click', MenuFunction);
menuCloseIcon.addEventListener('click', MenuFunction)
