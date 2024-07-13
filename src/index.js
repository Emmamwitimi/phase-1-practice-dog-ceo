console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    //Fetch and Display Dog Images
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        const imageContainer = document.getElementById('dog-image-container');
        data.message.forEach(imageUrl => {
          const img = document.createElement('img');
          img.src = imageUrl;
          imageContainer.appendChild(img);
        });
      });
      //Fetch and Display Dog Breeds
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        const breedList = document.getElementById('dog-breeds');
        for (const breed in data.message) {
        const li = document.createElement('li');
        li.textContent = breed;
        breedList.appendChild(li);
        }
    });
//Change Font Color on Click
    const breedList = document.getElementById('dog-breeds');

    breedList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        event.target.style.color = 'blue'; // Choose any color you like
    }
    });
    // Filter Breeds by First Letter
    //const breedUrl = "https://dog.ceo/api/breeds/list/all";
    //const breedList = document.getElementById('dog-breeds');
    const dropdown = document.getElementById('breed-dropdown');
    let allBreeds = [];

    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
        allBreeds = Object.keys(data.message);
        renderBreeds(allBreeds);
        });

    dropdown.addEventListener('change', (event) => {
        const selectedLetter = event.target.value;
        const filteredBreeds = selectedLetter === 'all' 
        ? allBreeds 
        : allBreeds.filter(breed => breed.startsWith(selectedLetter));
        renderBreeds(filteredBreeds);
    });

    function renderBreeds(breeds) {
        breedList.innerHTML = '';
        breeds.forEach(breed => {
        const li = document.createElement('li');
        li.textContent = breed;
        breedList.appendChild(li);
        });
    }
  });
  