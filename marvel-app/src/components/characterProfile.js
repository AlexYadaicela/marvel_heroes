import '../styles/heroProfiles.css'; 

export async function generateCharacterPage(baseUrl, ts, publickey, hash, character){
    console.log('in generate page', character); 
    // try{
    // const url = `${baseUrl}/characters/${characterDetails.id}/comics?ts=${ts}&apikey=${publickey}&hash=${hash}&limit=6`; 
    // const response = await fetch (url); 
    // if(!response.ok){
    //     throw new Error(`Response status: ${response.status}`); 
    // }
    // const res = await response.json(); 
    // console.log('comics', res); 
    // characterPage(character, res.data.results); 
    // }catch(error){
    //     console.error(error.message); 
    // }
}

export function characterPage(character){
    console.log('in character page', character); 
    
}
export function characterPage(character){
    console.log(character);
    // clear current dom and populate element with current character selection
    const displayContent = document.querySelector('.display_content');
    displayContent.innerHTML = ''; 

    const fragment = document.createDocumentFragment(); 
    const profile = document.createElement('div'); 
    profile.classList.add('character_profile'); 

    const characterInformation = document.createElement('div');

    characterInformation.classList.add('character_details'); 

    const characterImage = document.createElement('div'); 
    const characterName = document.createElement('div'); 
    const spanName = document.createElement('span'); 
    const spanDetail = document.createElement('span'); 

    spanName.textContent = character.name; 

    if(character.description === '' || character.description === ' '){
        spanDetail.textContent = 'Description not available'; 
    }else{
        spanDetail.textContent = character.description;
    }

    spanDetail.classList.add('character_description'); 

    characterImage.style.backgroundImage = `url('${character.thumbnail}')`;
    
    characterName.appendChild(spanName); 
    characterName.appendChild(spanDetail); 

    characterInformation.appendChild(characterImage); 
    characterInformation.appendChild(characterName); 
    
    
    // create element to append comics
    const comicsWrapper = document.createElement('div'); 
    comicsWrapper.classList.add('comics_wrapper'); 
    
    const comicFragment = document.createDocumentFragment(); 
    
    // iterate through comics and set up a div for each comic
    if(Number(character.numOfComics) !== 0){
        comics.forEach((comic) => {
            const comicElement = document.createElement('div'); 
            
            const img = new Image(); 
            img.src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
            
            comicElement.appendChild(img); 
            
            comicFragment.appendChild(comicElement); 
        });
        comicsWrapper.appendChild(comicFragment);
    }
    
    profile.appendChild(characterInformation); 
    profile.appendChild(comicsWrapper); 
    fragment.appendChild(profile); 

    displayContent.appendChild(fragment);
}