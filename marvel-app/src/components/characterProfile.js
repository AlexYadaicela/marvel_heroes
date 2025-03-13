import '../styles/heroProfiles.css'; 

export async function fetchComics(baseUrl, ts, publickey, hash, numOfComics, characterID){
    if(Number(numOfComics) !== 0){
        try{
            const url = `${baseUrl}/characters/${characterID}/comics?ts=${ts}&apikey=${publickey}&hash=${hash}&limit=6`; 
            const response = await fetch (url); 
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`); 
            }
            
            const res = await response.json();
            const comics = res.data.results;
            console.log(comics); 

            const comicItems = document.querySelectorAll('.comic_item'); 
            
            comics.forEach((comic, index) => {
                comicItems[index].setAttribute('data-visible', 'true'); 
                comicItems[index].style.backgroundImage = `url(${comic.thumbnail.path}.${comic.thumbnail.extension})`; 
            });
        }catch(error){
            console.error(error.message); 
        }
    }else{
        const comicItems = document.querySelectorAll('.comic_item'); 
        comicItems.forEach((item) => {
            item.removeAttribute('data-visible'); 
            item.setAttribute('data-blank', 'true'); 
        });
    } 
}

export function characterPage(characterDetails){
    const comicItems = document.querySelectorAll('.comic_item'); 
    comicItems.forEach((item) => {
        item.setAttribute('data-visible', 'false'); 
        item.removeAttribute('data-blank'); 
    });
    console.log(characterDetails);
    
    const img = `${characterDetails.thumbnail.path}.${characterDetails.thumbnail.extension}`;
    console.log(img); 

    const profileImg = document.querySelector('.profile_img'); 
    profileImg.style.backgroundImage = `url(${img})`;

    const descriptionName = document.querySelector('.profile_name'); 
    const descriptionDetail = document.querySelector('.profile_detail'); 

    
    descriptionName.textContent = `${characterDetails.name}`; 

    console.log(characterDetails.name); 

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

    profileLinks.appendChild(fragment); 

}

