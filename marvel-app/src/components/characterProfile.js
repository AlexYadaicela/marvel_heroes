import CryptoJS from 'crypto-js';


const removeActiveBtn = document.querySelectorAll('.tab button'); 
const removePrevContentInfo = document.querySelectorAll('.comic_item'); 


const tabsContainer = document.querySelectorAll('.tab > button'); 
const comicItems = document.querySelectorAll('.comic_item'); 

const profileImg = document.querySelector('.profile_img'); 
const profileName = document.querySelector('.profile_name'); 
const profileDetail = document.querySelector('.profile_detail'); 


tabsContainer.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        e.stopPropagation();
        const typeOfData = tab.getAttribute('id'); 
        const numOfData = tab.getAttribute('data-content'); 
        const characterID = document.querySelector('.profile_img').getAttribute('data-characterid');

        const curr = document.getElementsByClassName('active'); 

        if( curr.length > 0){
            curr[0].classList.remove('active'); 
        }

        comicItems.forEach((item) => {
            item.setAttribute('data-visible', 'false'); 
            item.setAttribute('data-available', 'false'); 
            item.classList.add('loading'); 
            item.textContent = '';
        });

        tabsContainer[index].classList.add('active'); 

        fetchCharInfo(`${typeOfData}`, numOfData, characterID); 
    }) ;
});


const ts = Date.now().toString(); 
const publickey = import.meta.env.VITE_PUBLIC_KEY; 
const privatekey = import.meta.env.VITE_PRIVATE_KEY; 
const hash = CryptoJS.MD5(ts + privatekey + publickey).toString();

async function fetchInitialComics(character){
    removeActiveBtn[0].classList.add('active');  
    if(Number(character.comics.available) !== 0){
        try{
            const url = `https://gateway.marvel.com/v1/public/characters/${character.id}/comics?ts=${ts}&apikey=${publickey}&hash=${hash}&limit=6`; 
            const response = await fetch (url); 
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`); 
            }
            
            const res = await response.json();
            const comics = res.data.results;
            console.log('initial comics fetch call'); 
            console.log(comics);

            comics.forEach((comic, index) => {
                comicItems[index].setAttribute('data-visible', 'true'); 
                comicItems[index].setAttribute('data-available', 'true');
                comicItems[index].style.backgroundImage = `url(${comic.thumbnail.path}.${comic.thumbnail.extension})`; 
            });
        }catch(error){
            console.error(error.message); 
        }
    }
    comicItems.forEach((item) => {
        if(item.getAttribute('data-available') === 'false'){
            item.textContent = `no comics found`; 
            item.classList.remove('loading');
        }
    });
} 

async function fetchCharInfo(typeOfData, numOfData, characterID){
    if(Number(numOfData) !== 0){
        try{
            const url = `https://gateway.marvel.com/v1/public/characters/${characterID}/${typeOfData}?ts=${ts}&apikey=${publickey}&hash=${hash}&limit=6`; 
            const response = await fetch (url); 
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`); 
            }
            
            const res = await response.json();
            const comics = res.data.results;
            console.log(comics); 

            comics.forEach((comic, index) => {
                comicItems[index].setAttribute('data-visible', 'true'); 
                comicItems[index].setAttribute('data-available', 'true');
                comicItems[index].style.backgroundImage = `url(${comic.thumbnail.path}.${comic.thumbnail.extension})`; 
            });
        }catch(error){
            console.error(error.message); 
        }
    }

    comicItems.forEach((item) => {
        if(item.getAttribute('data-available') === 'false'){
            item.textContent = `no ${typeOfData} found`; 
            item.classList.remove('loading');
        }
    });
}   




export function characterPage(characterDetails){
    removeActiveBtn.forEach((btn, index) => {
        if(index != 0){
            btn.classList.remove('active'); 
        }
    });

    removePrevContentInfo.forEach((item) => {
        item.setAttribute('data-visible', 'false');
        item.setAttribute('data-available', 'false');
        item.classList.add('loading'); 
        item.textContent = '';
    });

    profileImg.setAttribute('data-visible', 'true'); 
    profileName.setAttribute('data-visible', 'true');
    profileDetail.setAttribute('data-visible', 'true'); 

    const img = `${characterDetails.thumbnail.path}.${characterDetails.thumbnail.extension}`;

    profileImg.style.backgroundImage = `url(${img})`;

    profileImg.setAttribute('data-characterID', `${characterDetails.id}`); 

    const descriptionName = document.querySelector('.profile_name'); 
    const descriptionDetail = document.querySelector('.profile_detail'); 

    
    descriptionName.textContent = `${characterDetails.name}`; 

    if(characterDetails.description === ' ' || characterDetails.description === ''){
        descriptionDetail.textContent = 'No description available'; 
    }else{
        descriptionDetail.textContent =  characterDetails.description; 
    }

    // handle links 
    const profileLinks = document.querySelector('.links'); 
    profileLinks.innerHTML = ''; 
    const fragment = document.createDocumentFragment(); 

    const links = characterDetails.urls; 

    links.forEach((link) => {
        const liElement = document.createElement('li');
        const aElement = document.createElement('a');
        aElement.href = `${link.url}`; 
        aElement.textContent = `${link.type}`; 
        aElement.target = '_blank';
        liElement.appendChild(aElement);
        fragment.appendChild(liElement); 
    });

    tabsContainer.forEach((tab) => {
        const dataType = tab.getAttribute('id'); 
        tab.setAttribute('data-content', `${characterDetails[dataType].available}`); 
    });
    profileLinks.appendChild(fragment); 
    fetchInitialComics(characterDetails);
}

