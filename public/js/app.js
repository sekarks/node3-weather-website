console.log('Clide side scriot is loaded')

const weatherForm = document.querySelector('form')
const searh = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = searh.value
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+ location).then((response)=> {
        response.json().then((data) =>{
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.address
                messageTwo.textContent = data.forecast
            }
    
        })
    
    })
})