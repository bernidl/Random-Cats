const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=c2038054-20cb-493f-96d6-50f3d474c9ef';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=c2038054-20cb-493f-96d6-50f3d474c9ef';

const spanError = document.getElementById('error');

async function loadRandomMichis () {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    if(res.status !== 200) {
        spanError.innerHTML = "Error: " + res.status;
    } else {
        const img1 = document.getElementById("randomImg1");
        const img2 = document.getElementById("randomImg2");
        img1.src = data[0].url;
        img2.src = data[1].url;
    }
    
}

async function loadFavoriteMichi () {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    if(res.status !== 200) {
        spanError.innerHTML = "Error: " + res.status + " " + data.message;
    } 
}
const myButton = document.getElementById("randomBtt");
myButton.onclick = loadRandomMichis;

loadRandomMichis();
loadFavoriteMichi();