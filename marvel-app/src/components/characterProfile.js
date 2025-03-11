import '../styles/heroProfiles.css'; 




export async function generateCharacterPage(baseUrl, ts, publickey, hash, character){
    try{
        const comicsWrapper = document.createElement('div'); 
        if( character.numOfComics !== 0){
            const url = `${baseUrl}/characters/${character.id}/comics?ts=${ts}&apikey=${publickey}&hash=${hash}&limit=6`; 
            const response = await fetch (url); 
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`); 
            }
            const res = await response.json();
            const comics = res.data.results;
            
            const fragment = document.createDocumentFragment(); 
            comicsWrapper.classList.add('comics_wrapper'); 
            comics.forEach((comic) => {
                const comicElement = document.createElement('div'); 
                
                const img = new Image(); 
                img.src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
                
                comicElement.appendChild(img); 
                
                fragment.appendChild(comicElement); 
            });
            comicsWrapper.appendChild(fragment); 
        }
        characterPage(character, comicsWrapper); 
    
    // create element to append comics
    }catch(error){
        console.error(error.message); 
    }
}

const displayContent = document.querySelector('.display_content');
const displayCharacters = document.querySelector('.display_characters'); 

const fragment = document.createDocumentFragment(); 
const profile = document.createElement('div'); 
profile.classList.add('character_profile'); 

const characterInformation = document.createElement('div');

characterInformation.classList.add('character_details'); 

const characterImage = document.createElement('div'); 
const characterName = document.createElement('div'); 
const spanName = document.createElement('span'); 
const spanDetail = document.createElement('span'); 

characterName.appendChild(spanName); 
characterName.appendChild(spanDetail); 

characterInformation.appendChild(characterImage); 
characterInformation.appendChild(characterName); 

fragment.appendChild(profile); 
profile.appendChild(characterInformation);

function characterPage(character, comicsWrapper){
    if(typeof(displayCharacters) !== 'undefined'){
        displayContent.removeChild(displayCharacters); 

    }
    console.log(character);
    // clear current dom and populate element with current character selection

    characterImage.style.backgroundImage = `url('${character.thumbnail}')`;
    spanName.textContent = character.name; 

    if(character.description === '' || character.description === ' '){
        spanDetail.textContent = 'Description not available'; 
    }else{
        spanDetail.textContent = character.description;
    }

    spanDetail.classList.add('character_description'); 
    
    
    // if(typeof(comicsWrapper) === Node){
    //     profile.appendChild(comicsWrapper); 
    // }

    if(typeof(comicsWrapper) !== 'undefined'){
        profile.appendChild(comicsWrapper);         
    }
    
    displayContent.appendChild(fragment);
}