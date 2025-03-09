export function displayCharacters(characters){

    const fragment = document.createDocumentFragment();
    const charactersContainer = document.querySelector('.display_characters'); 

    characters.forEach((character) => {
        
        const characterWrapper = document.createElement('div');

        const characterImage = document.createElement('div'); 
        const characterInformation = document.createElement('div'); 
        const characterName = document.createElement('span'); 

        characterWrapper.classList.add('character');
        
        characterImage.classList.add('character_image'); 
        characterInformation.classList.add('character_information');  
        characterName.classList.add('information_name'); 

        characterName.textContent = character.name; 

        const imgElement = new Image();
        const thumbnail = `${character.thumbnail.path}.${character.thumbnail.extension}`; 
        imgElement.src = thumbnail; 
        imgElement.alt = character.name;

        characterImage.appendChild(imgElement); 
        characterInformation.appendChild(characterName);        
        // character image and name
        characterWrapper.appendChild(characterImage); 
        characterWrapper.appendChild(characterInformation);  

        fragment.appendChild(characterWrapper); 
    });

    charactersContainer.appendChild(fragment); 

}