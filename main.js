const URL = 'https://api.thecatapi.com/v1/images/search';

async function myCat () {
    const res = await fetch(URL);
    const data = await res.json();
    const img = document.getElementById("randomImg");
    img.src = data[0].url;
}

const myButton = document.getElementById("randomBtt");
myButton.onclick = myCat;

