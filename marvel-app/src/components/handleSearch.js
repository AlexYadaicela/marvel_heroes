import { characterPage } from "./characterProfile";

const loadingResult = document.createElement('span'); 
const searchResult = document.querySelector('.search_results'); 
const inputElement = document.getElementById('search_character'); 

export async function setUpSearch(baseUrl, ts, publickey, hash, searchTerm){
    try{
        inputElement.disabled = true; 
        const url = `${baseUrl}/characters?ts=${ts}&apikey=${publickey}&hash=${hash}&nameStartsWith=${searchTerm}&limit=7`; 
        const response = await fetch(url); 
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`); 
        }
        const res = await response.json();
        
        const fetchCharacters = res.data.results; 
        if(fetchCharacters.length != 0){
            createSearchResultBox(fetchCharacters);  
        }else{
            loadingResult.classList.add('loading_result'); 
            loadingResult.textContent = 'No Results found'; 
            searchResult.appendChild(loadingResult); 
        }
    }catch(error){
        console.error(error.message);
    }finally{
        inputElement.disabled = false; 
    }
}

function createSearchResultBox(fetchCharacters){
    const fragment = document.createDocumentFragment(); 

    const ulElement = document.createElement('ul');
    ulElement.classList.add('result');

    fetchCharacters.forEach((character) => {
        const liElement = document.createElement('li'); 
        liElement.classList.add('result_item'); 

        liElement.addEventListener('click', () => {
            searchResult.innerHTML = '';  
            inputElement.value = '';

        characterPage(character);
        });  

        liElement.textContent = character.name; 
        fragment.appendChild(liElement); 
    });
    ulElement.appendChild(fragment);     
    searchResult.appendChild(ulElement); 
}