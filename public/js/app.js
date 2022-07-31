console.log("Hello from js");

// a browser func that is used to fetch url
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })



// getting an object to interact with form
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); //this prevents refreshing of page
    
    const location = search.value;
    // console.log(location);

    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';

    const url = 'http://localhost:3000/weather?address=' + location;

    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error ;
            // return console.log(data.error);
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }

        
        
    })
})
})