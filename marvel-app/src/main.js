import './style.css'; 
import { setUpSearch } from './components/handleSearch';
import cryptoJS from 'crypto-js'; 
import { characterPage } from './components/characterProfile';


const ts = Date.now().toString(); 
const baseUrl = 'https://gateway.marvel.com/v1/public'; 
const privateKey = import.meta.env.VITE_PRIVATE_KEY; 
const publicKey = import.meta.env.VITE_PUBLIC_KEY; 
const hash = cryptoJS.MD5(ts + privateKey + publicKey).toString(); 


let timer; 
const inputElement = document.getElementById('search_character');
const searchResult = document.querySelector('.search_results'); 
const loadingResultMsg = document.querySelector('.loading_result'); 

// handle user search request
inputElement.addEventListener('keyup', () => {
  clearTimeout(timer); 
  const searchTerm = inputElement.value; 
  if(isNaN(searchTerm)){
    loadingResultMsg.textContent = 'loading results'; 
    timer = setTimeout(() => {
      setUpSearch(baseUrl, ts, publicKey, hash, searchTerm); 
    }, 1000);
  }
  searchResult.innerHTML = ''; 
});

const randomCharacterBtn = document.getElementById('get_random_character'); 

randomCharacterBtn.addEventListener('click', () => {
  randomCharacterBtn.disabled = true; 
  fetchRandomCharacterData(); 
});


async function fetchRandomCharacterData(){
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
    characterPage(character.data.results[0]);  
  }catch ( error ){
    console.error(error.message); 
  }finally{
    randomCharacterBtn.disabled = false; 
  }
}

fetchRandomCharacterData(); 
