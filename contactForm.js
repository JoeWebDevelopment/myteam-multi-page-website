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
        nameInput.setAttribute('aria-invalid', 'true');
    } else{
        nameError.classList.add('hidden')
        nameInput.removeAttribute('aria-invalid');
    } 


if (emailInput.validity.typeMismatch){
        emailError.textContent = "Please use a valid email address"
        emailError.classList.remove('hidden')
        removeAttribute('aria-invalid');
} else if(emailInput.validity.valueMissing){
            emailError.textContent = "This field is required"
            emailError.classList.remove('hidden')
            emailInput.setAttribute('aria-invalid', 'true');
        }else {
            emailInput.removeAttribute('aria-invalid');
           emailError.classList.add('hidden')
            
        }
    if(messageInput.validity.valueMissing){
        
        messageError.classList.remove('hidden')
        messageError.textContent = "This field is required"
        messageInput.setAttribute('aria-invalid', 'true');
        } else{
            messageError.classList.add('hidden')
            messageInput.removeAttribute('aria-invalid');
        }

        
}

const contactForm = document.querySelector('.contact-form')

contactForm.addEventListener('submit', formCheck)