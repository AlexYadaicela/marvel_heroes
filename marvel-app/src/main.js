import './style.css'; 
import { setUpSearch } from './components/handleSearch';
import cryptoJS from 'crypto-js'; 


const ts = Date.now().toString(); 
const baseUrl = 'https://gateway.marvel.com/v1/public'; 
const privateKey = import.meta.env.VITE_PRIVATE_KEY; 
const publicKey = import.meta.env.VITE_PUBLIC_KEY; 
const hash = cryptoJS.MD5(ts + privateKey + publicKey).toString(); 


let timer; 
const inputElement = document.getElementById('search_character');
const searchResult = document.querySelector('.search_results'); 

// handle user request
inputElement.addEventListener('keyup', () => {
  clearTimeout(timer); 
  searchResult.innerHTML = ''; 
  const searchTerm = inputElement.value; 
  if(searchTerm.length > 2 && isNaN(searchTerm)){
    timer = setTimeout(() => {
      setUpSearch(baseUrl, ts, publicKey, hash, searchTerm); 
    }, 1000);
  }
});

async function fetchCharacterData(){
  try{

    let url = `${baseUrl}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=1`;  
    let response = await fetch(url);

    if( !response.ok ){
      throw new Error(`Response status: ${response.status}`); 
    }

    let res = await response.json();
    // get data length to generate random character
    const totalCharacters = res.data.total; 
    const randomCharacter = Math.floor(Math.random() * totalCharacters); 

    const charUrl = `${url}&offset=${randomCharacter}`    
    response = await fetch(charUrl);

    if(!response.ok){
      throw new Error(`Response status: ${response.status}`); 
    }

    const character = await response.json(); 
    displayCharacter(character.data.results[0]);
      
  }catch ( error ){
    console.error(error.message); 
  }
}

function displayCharacter(character){
  const characterImage = document.querySelector('.details_img');
  const characterName = document.querySelector('.description_name');

  characterImage.setAttribute('data-visible', 'true'); 
  characterName.setAttribute('data-visible', 'true');

  const thumbnail = `${character.thumbnail.path}.${character.thumbnail.extension}`; 
  characterImage.style.backgroundImage = `url(${thumbnail})`;

  characterName.textContent = character.name; 
}

if(window.location.pathname === '/'){
  fetchCharacterData(); 
}