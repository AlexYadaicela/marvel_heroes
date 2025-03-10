
import { generateCharacterPage } from "./characterProfile";
import { getTs } from "../main";
import { getBaseUrl } from "../main";
import { getHash } from "../main";
import { getPublicKey } from "../main";

export async function setUpSearch(searchTerm){
    try{
        const url = `${getBaseUrl()}/characters?ts=${getTs()}&apikey=${getPublicKey()}&hash=${getHash()}&nameStartsWith=${searchTerm}&limit=7`; 
        const response = await fetch(url); 
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`); 
        }
        const res = await response.json(); 
        console.log(res.data.results); 
        createSearchResultBox(res.data.results); 
    }catch(error){
        console.error(error.message);
    }
}

function createSearchResultBox(characters){
    const fragment = document.createDocumentFragment(); 
    const searchResult = document.querySelector('.search_results'); 

    searchResult.ariaExpanded = 'true'; 

    const ulElement = document.createElement('ul');
    ulElement.classList.add('result'); 

    characters.forEach((character) => {
        const liElement = document.createElement('li'); 
        liElement.classList.add('result_item'); 
        liElement.addEventListener('click', () => {
            searchResult.ariaExpanded = 'false'; 
            const characterDetails = {
                id : character.id, 
                name : character.name, 
                description : character.description, 
                thumbnail : `${character.thumbnail.path}.${character.thumbnail.extension}`, 
                numOfComics: character.comics.available
            }
            generateCharacterPage(characterDetails); 
        }); 
        liElement.textContent = character.name; 
        fragment.appendChild(liElement); 
    });
    ulElement.appendChild(fragment); 
    
    searchResult.appendChild(ulElement); 
}