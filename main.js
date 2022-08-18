const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=c2038054-20cb-493f-96d6-50f3d474c9ef';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=c2038054-20cb-493f-96d6-50f3d474c9ef';
const API_URL_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=c2038054-20cb-493f-96d6-50f3d474c9ef`;

const spanError = document.getElementById('error');

async function loadRandomMichis () {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    if(res.status !== 200) {
        spanError.innerHTML = "Error: " + res.status;
    } else {
        const img1 = document.getElementById("randomImg1");
        const img2 = document.getElementById("randomImg2");
        const btn1 = document.getElementById("btn1");
        const btn2 = document.getElementById("btn2");

        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavoriteMichi(data[0].id);
        btn2.onclick = () => saveFavoriteMichi(data[1].id);
    }
    
}

async function loadFavoriteMichi () {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    if(res.status !== 200) {
        spanError.innerHTML = "Error: " + res.status + " " + data.message;
    } else {
        const section = document.getElementById('container-favoriteMichis');
        section.innerHTML = "";
        const h2 = document.createElement('h2');
        const h2text = document.createTextNode('Favorite Cats');
        h2.appendChild(h2text);
        section.appendChild(h2);

        data.forEach(michi => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Remove michi from favorites');

            btn.appendChild(btnText);
            btn.onclick = () => deleteFavoriteMichi(michi.id);
            img.src = michi.image.url;
            img.width = 150;
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        })
    }
}

async function saveFavoriteMichi(id){
    const res = await fetch(API_URL_FAVORITES,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    
    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = "Error: " + res.status + " " + data.message;
    } else {
        console.log('Michi saved in favorites');
        loadFavoriteMichi();
    }
    
}

async function deleteFavoriteMichi(id){
    const res = await fetch(API_URL_DELETE(id),{
        method: 'DELETE',
    });
    
    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = "Error: " + res.status + " " + data.message;
    } else {
        console.log('Michi deleted from favorites');
        loadFavoriteMichi();
    }
}

const myButton = document.getElementById("randomBtt");
myButton.onclick = loadRandomMichis;

loadRandomMichis();
loadFavoriteMichi();