import '../styles/heroProfiles.css'; 

import { getTs } from "../main";
import { getHash } from "../main"; 
import { getPublicKey } from "../main";
import { getBaseUrl } from "../main";

export async function generateCharacterPage(character){
    console.log(character.id); 
    try{
    const url = `${getBaseUrl()}/characters/${character.id}/comics?ts=${getTs()}&apikey=${getPublicKey()}&hash=${getHash()}&limit=5`; 
    const response = await fetch (url); 
    if(!response.ok){
        throw new Error(`Response status: ${response.status}`); 
    }

    const res = await response.json(); 
    console.log('comics');
    console.log(res); 
    characterPage(character, res.data.results); 

}catch(error){
    console.error(error.message); 
    }
}

function characterPage(character, comics){
    // clear current dom and populate element with current character selection
    const displayContent = document.querySelector('.display_content');
    displayContent.innerHTML = ''; 

    const fragment = document.createDocumentFragment(); 
    const profile = document.createElement('div'); 
    profile.classList.add('character_profile'); 

    const characterInformation = document.createElement('div'); 

    const characterImage = document.createElement('div'); 
    const characterName = document.createElement('div'); 
    const spanName = document.createElement('span'); 

    spanName.textContent = character.name; 
    
    const img = new Image(); 
    img.src = character.thumbnail; 
    img.alt = character.name; 

    characterImage.appendChild(img); 
    characterName.appendChild(spanName); 

    characterInformation.appendChild(characterImage); 
    characterInformation.appendChild(characterName); 
    
    
    // create element to append comics
    const comicsWrapper = document.createElement('div'); 
    comicsWrapper.classList.add('comics_wrapper'); 
    
    const comicFragment = document.createDocumentFragment(); 
    
    // iterate through comics and set up a div for each comic
    comics.forEach((comic) => {
        const comicElement = document.createElement('div'); 
        
        const img = new Image(); 
        img.src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
        
        comicElement.appendChild(img); 
        
        comicFragment.appendChild(comicElement); 
    });
    comicsWrapper.appendChild(comicFragment);
    
    profile.appendChild(characterInformation); 
    profile.appendChild(comicsWrapper); 

    fragment.appendChild(profile); 

    displayContent.appendChild(fragment);
}