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
        emailError.classList.remove('hidden')
} else if(emailInput.validity.valueMissing){
            emailError.textContent = "This field is required"
            emailError.classList.remove('hidden')
        }else {

           emailError.classList.add('hidden')
            
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