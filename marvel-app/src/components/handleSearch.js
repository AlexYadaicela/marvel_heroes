import { characterPage, fetchComics } from "./characterProfile";

export async function setUpSearch(baseUrl, ts, publickey, hash, searchTerm){
    try{
        const url = `${baseUrl}/characters?ts=${ts}&apikey=${publickey}&hash=${hash}&nameStartsWith=${searchTerm}&limit=7`; 
        const response = await fetch(url); 
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`); 
        }
        const res = await response.json(); 
        const fetchCharacters = res.data.results; 
        createSearchResultBox(baseUrl, ts, publickey, hash, fetchCharacters); 
    }catch(error){
        console.error(error.message);
    }
}

function createSearchResultBox(baseUrl, ts, publicKey, hash, fetchCharacters){
    const fragment = document.createDocumentFragment(); 
    const searchResult = document.querySelector('.search_results'); 
    const inputElement = document.getElementById('search_character'); 

    searchResult.ariaExpanded = 'true'; 

    const ulElement = document.createElement('ul');
    ulElement.classList.add('result');

    fetchCharacters.forEach((character) => {
        const liElement = document.createElement('li'); 
        liElement.classList.add('result_item'); 

        // custom character details
        // const characterDetails = {
        //     id : character.id, 
        //     name : character.name, 
        //     description : character.description, 
        //     thumbnail : `${character.thumbnail.path}.${character.thumbnail.extension}`, 
        //     numOfComics: character.comics.available, 
        //     urls: character.urls
        // }

        liElement.addEventListener('click', () => {
            searchResult.innerHTML = ''; 
            searchResult.ariaExpanded = 'false'; 
            inputElement.value = '';
            characterPage(character);
            fetchComics(baseUrl, ts, publicKey, hash, character.comics.available, character.id);  
        }); 

        liElement.textContent = character.name; 
        fragment.appendChild(liElement); 
    });
    ulElement.appendChild(fragment);     
    searchResult.appendChild(ulElement); 
}