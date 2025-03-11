export function displayCharacters(character){
    // generate img and populate with thumbnail
    const imgElement = new Image();
    const thumbnail = `${character.thumbnail.path}.${character.thumbnail.extension}`; 
    imgElement.src = thumbnail; 
    imgElement.alt = character.name;
    
    const characterElement = document.createElement('div');
    characterElement.classList.add('character');
    const characterImage = document.createElement('div'); 
    characterImage.classList.add('character_image'); 
    const characterInformation = document.createElement('div'); 
    characterInformation.classList.add('character_information');  
    
    const characterInformationName = document.createElement('span'); 
    characterInformationName.classList.add('information_name'); 
    
    // information to generate character profile 
    const characterDetails = {
        id: character.id, 
        name: character.name, 
        description: character.description, 
        thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,  
        numOfComics: character.comics.available
    }
    characterInformationName.textContent = character.name; 
    characterImage.appendChild(imgElement); 
    characterInformation.appendChild(characterInformationName);    
    characterElement.appendChild(characterImage); 
    characterElement.appendChild(characterInformation);    
    fragment.appendChild(characterElement); 

    characterWrapper.appendChild(fragment);
    contentWrapper.appendChild(characterWrapper);  

}