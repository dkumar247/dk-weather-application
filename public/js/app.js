console.log("This is DK")

const url = '/weather?address='
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const headee = document.querySelector('header')

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
                let dataForecast = data.forecast;
                let dataLoc = data.location;

                if(dataForecast.toLowerCase().includes('rain') || dataForecast.toLowerCase().includes('shower') || dataForecast.toLowerCase().includes('cloud')) {
                    headee.style.animationDuration="1s"
                    headee.style.animation="boom"
                    headee.style.backgroundImage="linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(../img/rainy.jpg)"
                }
                else
                if(dataForecast.toLowerCase().includes('snow') || dataForecast.toLowerCase().includes('frost') || dataForecast.toLowerCase().includes('chill')) {
                    headee.style.animationDuration="1s"
                    headee.style.animationName="boom"
                    headee.style.backgroundImage="linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(../img/snow.jpg)"
                }
                else
                if(dataForecast.toLowerCase().includes('spring') || dataForecast.toLowerCase().includes('autumn') || dataForecast.toLowerCase().includes('blossom')) {
                    headee.style.animation="boom 1s 2"
                    headee.style.backgroundImage="linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(../img/spring.jpg)"
                }
                else{
                    headee.style.animation="boom 1s 2"
                    headee.style.backgroundImage="linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(../img/sunny.jpg)"
                }
                console.log('Forecast:', dataForecast)
                console.log('Location:', dataLoc)
                messageOne.textContent = dataForecast
                messageTwo.textContent = dataLoc
            }
        })
    })
})