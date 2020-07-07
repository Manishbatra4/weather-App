const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const forecast = document.querySelector('#forecast');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const locate = search.value;

    messageOne.textContent = 'Loading...';
    forecast.textContent = '';

    fetch("/weather?address="+locate ).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.location;
                forecast.textContent = data.forecast;
            }
        });
    })
});