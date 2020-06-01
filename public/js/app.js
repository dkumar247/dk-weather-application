console.log("This is DK")

const url = 'http://localhost:3000/weather?address='
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()      ///to prevent from page refresh
    
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // console.log(location)
// fetch used in client sde js and Request used in Server side js
    fetch(url + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                messageOne.textContent = data.error
            }
            else{
                console.log('Forecast:', data.forecast)
                console.log('Location:', data.location)
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.location
            }
        })
    })
})