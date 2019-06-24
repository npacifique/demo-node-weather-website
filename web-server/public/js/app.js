const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageTree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (e)=>{
        e.preventDefault()

        const location = search.value
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''
        messageTree.textContent = ''
        messageFour.textContent = ''

        fetch('/weather?address='+location).then((response)=>{
        
        response.json().then((data)=>{
            console.log(data)
            messageOne.textContent = "It's "+ data.currentWeather.summary +' in '+ data.place
            messageTwo.textContent = 'The current temperature is '+ data.currentWeather.temperature + '°F ' 
            messageTree.textContent = 'Today\'s temperature will be between ' +data.dailyWeather.data[0].apparentTemperatureMax+'°F' +' and '+ data.dailyWeather.data[0].apparentTemperatureMin+'°F' 
            messageFour.textContent = 'Weekly Weather forecast: '+ data.dailyWeather.summary
        })
    })


})