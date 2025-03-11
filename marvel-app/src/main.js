import './style.css'; 
import { displayCharacters } from './components/populateData';
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



async function getData(){
  try{
    let url = `${baseUrl}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=1`;  
    let response = await fetch(url);
    if(!response.ok){
      throw new Error(`Response status: ${response.status}`); 
    }
    let res = await response.json();
    
    const totalCharacters = res.data.total; 
    const randomCharacter = Math.floor(Math.random() * totalCharacters); 

    const charUrl = `${url}&offset=${randomCharacter}`    
    response = await fetch(charUrl);
    if(!response.ok){
      throw new Error(`Response status: ${response.status}`); 
    }

    res = await response.json(); 
    displayCharacters(res.data.results[0]);     
  }catch(error){
    console.error(error.message); 
  }
}

getData(); 