const API = "https://cw-project-block-39-default-rtdb.firebaseio.com/confomebookin";

async function fetchData() {
    try {
        const response = await fetch(`${API}.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
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

    if (data.length === 0) {
        cardContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    data.forEach(item => {
        const { id, title = "No Title", name = "No Category", location = "No Location", price = "N/A" } = item;
    
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', id || 'Unknown');
    
        const cardImage = document.createElement('div');
        cardImage.classList.add('card-image');
        const img = document.createElement('img');
        img.src = "https://bookablebiz.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdxjdvjoef%2Fimage%2Fupload%2Fv1718210276%2Fkojrrww3nzuqpsi52wzl.avif&w=1920&q=75";
        img.alt = title;
    
        const heartIcon = document.createElement('span');
        heartIcon.classList.add('heart-icon');
        heartIcon.innerHTML = '<i class="fa-solid fa-heart" style="color: white;"></i>';
    
        cardImage.appendChild(img);
        cardImage.appendChild(heartIcon);
    
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
    
        const titleElem = document.createElement('h3');
        titleElem.textContent = title;
    
        const categoryElem = document.createElement('p');
        categoryElem.classList.add('category');
        categoryElem.textContent = name;
    
        const locationElem = document.createElement('p');
        locationElem.classList.add('location');
        locationElem.innerHTML = `<i class="fa-solid fa-location-dot" style="color: black;font-size: 15px;"></i> ${location}`;
    
        const priceElem = document.createElement('p');
        priceElem.classList.add('price');
        priceElem.textContent = `$${price}`;

        
        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        editButton.textContent = 'Edit Booking';
        editButton.addEventListener('click', () => editBooking(id));

        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete Booking';

        deleteButton.addEventListener('click', () => deleteBooking(item.key));

        
        cardContent.appendChild(titleElem);
        cardContent.appendChild(categoryElem);
        cardContent.appendChild(locationElem);
        cardContent.appendChild(priceElem);
        cardContent.appendChild(editButton); 
        cardContent.appendChild(deleteButton); 
    
        card.appendChild(cardImage);
        card.appendChild(cardContent);
    
        cardContainer.appendChild(card);
    });
}



async function deleteBooking(id) {

    try {
        
        const response = await fetch(`${API}/${id}.json`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchData();
            alert(`Booking has been successfully deleted.`);

        } else {
            alert(`Failed to delete booking with ID ${id}.`);
        }
    } catch (error) {
        console.error("Error deleting booking:", error);
        alert("An error occurred while trying to delete the booking.");
    }
}


function editBooking(id) {
    
    console.log(`Booking with ID ${id} will be edited.`);
}


function debounce(func, delay) {
    let debounceTimer;
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
}


function filterCardsByLocation(query) {
    if (query.trim() === "") {
        createCard(originalData); 
    } else {
        const filteredData = originalData.filter(item => item.location.toLowerCase().includes(query.toLowerCase()));
        createCard(filteredData); 
    }
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

    fetchData(); 
});
