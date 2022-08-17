const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3';

async function myCat () {
    const res = await fetch(API_URL);
    const data = await res.json();
    const img1 = document.getElementById("randomImg1");
    const img2 = document.getElementById("randomImg2");
    const img3 = document.getElementById("randomImg3");

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
}

const myButton = document.getElementById("randomBtt");
myButton.onclick = myCat;

myCat();