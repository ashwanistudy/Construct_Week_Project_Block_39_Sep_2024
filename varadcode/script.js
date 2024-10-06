const API = "https://cw-project-block-39-default-rtdb.firebaseio.com/servicesData.json";
let originalData = []; 


async function fetchData() {
    try {
        const response = await fetch(API);
        const data = await response.json();
        originalData = data ? Object.entries(data).map(([key, value]) => ({ ...value, key })) : [];
        createCard(originalData); 
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}


function createCard(data) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; 

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', item.id);

        const cardImage = document.createElement('div');
        cardImage.classList.add('card-image');
        const img = document.createElement('img');
        img.src = `${item.image}`;
        img.alt = item.title;

        const heartIcon = document.createElement('span');
        heartIcon.classList.add('heart-icon');
        heartIcon.innerHTML = '<i class="fa-solid fa-heart" style="color: white;"></i>';

        cardImage.appendChild(img);
        cardImage.appendChild(heartIcon);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const title = document.createElement('h3');
        title.textContent = item.category;

        const category = document.createElement('p');
        category.classList.add('category');
        category.textContent = item.title;

        const location = document.createElement('p');
        location.classList.add('location');
        location.innerHTML = `<i class="fa-solid fa-location-dot" style="color: black;font-size: 15px;"></i> ${item.location}`;

        const price = document.createElement('p');
        price.classList.add('price');
        price.textContent = `$${item.price}`;

        cardContent.appendChild(title);
        cardContent.appendChild(category);
        cardContent.appendChild(location);
        cardContent.appendChild(price);

        card.appendChild(cardImage);
        card.appendChild(cardContent);
        const data = {
            id: item.id,
            category: item.category,
            benefits:item.benefits,
            description:item.description,
            image:item.image,
            location: item.location,
            min : item.min,
            owner :item.owner,
            price: item.price,
            title: item.title
            
        };
        
        // Construct the query string
        const queryString = new URLSearchParams(data).toString();
        
        // Add event listener to the card
        card.addEventListener('click', function () {
            window.location.href = `./varadcode/Ex.html?${queryString}`;
        });


        cardContainer.appendChild(card);
    });
}


function debounce(func, delay) {
    let debounceTimer;
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
}


function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}



function filterCardsByLocation(query) {
    const filteredData = originalData.filter(item => item.location.toLowerCase().includes(query.toLowerCase()));
    createCard(filteredData); 
}



function searchByJob(query) {
    const filteredData = originalData.filter(item => item.category.toLowerCase().includes(query.toLowerCase()));
    // console.log(filteredData);
    createCard(filteredData);
}





document.addEventListener('DOMContentLoaded', function() {
    
    const searchInput = document.getElementById('search-location');
    
    if (searchInput) {  
        searchInput.addEventListener('input', debounce(function (event) {
            const query = event.target.value;
            filterCardsByLocation(query);
        }, 300)); 
    } else {
        console.error("Element with ID 'search-location' not found in the DOM.");
    }

    
    const dropdowns = document.querySelectorAll('.menu select');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', throttle(function (event) {
            const query = event.target.value;
            searchByJob(query); 
        }, 500)); 
    });


    
    const hamburger = document.getElementById('hamburger');
    const dropdown = document.getElementById('dropdown');
    if (hamburger && dropdown) {
        hamburger.addEventListener('click', () => {
            dropdown.classList.toggle('show');
        });
    }
    
    
    fetchData();
});
