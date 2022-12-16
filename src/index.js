import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const axios = require('axios');

const OBJECTS = [
    "shelf",
    "shelf1",
    "shelf5",
    "shelf6",
    "shelf7",
    "shelf9",
    "shelf11",
    "shelf_big_",
    "shelf_big_1",
    "shelf_small_",
    "shelf_small_1",
    "shelf_small_2",
    "shelf_small_5",
    "shelf_small_6",
    "shelf_small_9",
    "shelf_small_10",
    "shelf_small_11",
    "shelf_small_12",
    "shelf_small_13",
    "shelf_small_14",
    "shelf_small_15"
];

// const PLP = require('./assets/PLP.json');
const PLP = require('./assets/PLP_MINOR.json');
const PDP = require('./assets/PDP.json'); 
const CHECKOUT = require('./assets/CHECKOUT.json');
const ADDTOCART = require('./assets/ADDTOCART.json');
const REMOVEFROMCART = require('./assets/REMOVEFROMCART.json'); 
const PRODUCTREVIEWS = require('./assets/PRODUCTREVIEWS.json'); 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

function randomInt (max) {
  return Math.floor(Math.random() * max);
}

// let data = PLP.ecommerce.impressions.map(event => { 
//     return { id: OBJECTS[randomInt(OBJECTS.length)] } 
// });

let EVENT_DATA = [
    { "name": "productImpression", data: PLP.ecommerce.impressions },
    { "name": "productDetail", data: PDP.ecommerce.detail.products },
    { "name": "addToCart", data: ADDTOCART.ecommerce.add.products },
    { "name": "removeFromCart", data: REMOVEFROMCART.ecommerce.remove.products }
];

function sendEvent() {
    // let data = PLP.ecommerce.impressions;
    let rnd = randomInt(EVENT_DATA.length);
    console.log("rnd", rnd);
    let event = EVENT_DATA[rnd];
    console.log("event", event);
    Object.keys(event.data).forEach(key => {
        event.data[key].category = OBJECTS[randomInt(OBJECTS.length)];
    });

    axios({
        method: 'post',
        url: 'http://localhost:8081/shopper/' + randomInt(99) + '/' + event.name,
        data: event.data
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

var i = 0;
function myLoop() {
    setTimeout(function() {
        sendEvent();
        i++;
        if (i < 1) {
            myLoop();
        }
    }, 100)
}

myLoop(); 



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();