const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
});
api.defaults.headers.common['X-API-KEY'] = 'c2038054-20cb-493f-96d6-50f3d474c9ef';

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=4';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload/';

const spanError = document.getElementById('error');

async function loadRandomMichis () {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    if(res.status !== 200) {
        spanError.innerHTML = "Error: " + res.status;
    } else {
        const img1 = document.getElementById("randomImg1");
        const img2 = document.getElementById("randomImg2");
        const img3 = document.getElementById("randomImg3");
        const img4 = document.getElementById("randomImg4");
        const btn1 = document.getElementById("btn1");
        const btn2 = document.getElementById("btn2");
        const btn3 = document.getElementById("btn3");
        const btn4 = document.getElementById("btn4");

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        img4.src = data[3].url;

        btn1.onclick = () => saveFavoriteMichi(data[0].id);
        btn2.onclick = () => saveFavoriteMichi(data[1].id);
        btn3.onclick = () => saveFavoriteMichi(data[2].id);
        btn4.onclick = () => saveFavoriteMichi(data[3].id);
    }
    
}

async function loadFavoriteMichi () {
    const res = await fetch(API_URL_FAVORITES,{
        method: "GET",
        headers: {
            'X-API-KEY': 'c2038054-20cb-493f-96d6-50f3d474c9ef'
        }
    });
    const data = await res.json();
    if(res.status !== 200) {
        spanError.innerHTML = "Error: " + res.status + " " + data.message;
    } else {
        const section = document.getElementById('container-favoriteMichis');
        section.innerHTML = "";
        //const h2 = document.createElement('h2');
       // const h2text = document.createTextNode('Favorite Cats');
        //h2.appendChild(h2text);
        //section.appendChild(h2);
       // h2.className = "h2-favorites";

        data.forEach(michi => {
            const article = document.createElement('article');
            article.className = "art_fav--cat"
            const img = document.createElement('img');
            img.className = "img_fav--cat";
            const btn = document.createElement('button');
            btn.className = "img_delete--cat";
            const btnText = document.createTextNode('Remove michi from favorites');

            btn.appendChild(btnText);
            btn.onclick = () => deleteFavoriteMichi(michi.id);
            img.src = michi.image.url;
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        })
    }
}

async function saveFavoriteMichi(id){
    const {data, status} = await api.post('/favourites', {
        image_id: id,
    });
    
    // const res = await fetch(API_URL_FAVORITES,{
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-API-KEY': 'c2038054-20cb-493f-96d6-50f3d474c9ef',
    //     },
    //     body: JSON.stringify({
    //         image_id: id
    //     }),
    // });
    
    // const data = await res.json();



    if(status !== 200) {
        spanError.innerHTML = "Error: " + status + " " + data.message;
    } else {
        console.log('Michi saved in favorites');
        loadFavoriteMichi();
    }
    
}

async function deleteFavoriteMichi(id){
    const res = await fetch(API_URL_DELETE(id),{
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'c2038054-20cb-493f-96d6-50f3d474c9ef',
        }
    });
    
    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = "Error: " + res.status + " " + data.message;
    } else {
        console.log('Michi deleted from favorites');
        loadFavoriteMichi();
    }
}

async function uploadMichiPhoto() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers : {
            //'Content-Type': 'multipart/form-data',
            'X-API-KEY': 'c2038054-20cb-493f-96d6-50f3d474c9ef',
        },
        body: formData,
    });
    
    const data = await res.json();

    if(res.status !==201){
        spanError.innerHTML = "Upload Error: " + res.status + " " + data.message;
    } else {
        console.log('Upload photo')
        saveFavoriteMichi(data.id)
    }

}

const previewImage = () => {
    const file = document.getElementById('file').files;

    if(file.length > 0){
        const fileReader = new FileReader();

        fileReader.onload = function(e) {
            document.getElementById('preview').setAttribute("src", e.target.result)
        };
        fileReader.readAsDataURL(file[0]);
    }
}

const myButton = document.getElementById("randomBtt");
myButton.onclick = loadRandomMichis;

loadRandomMichis();
loadFavoriteMichi();