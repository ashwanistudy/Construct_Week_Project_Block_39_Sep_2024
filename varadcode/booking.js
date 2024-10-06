const API = "https://cw-project-block-39-default-rtdb.firebaseio.com/confomebookin";

// async function fetchData() {
//     try {
//         const response = await fetch(`${API}.json`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         originalData = data ? Object.entries(data).map(([key, value]) => ({ ...value, key })) : [];
//         createCard(originalData); 
//     } catch (error) {
//         console.log("Error fetching data:", error);
//     }
// }

async function fetchData() {
    try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            alert('Please log in first.');
            window.location.href = '../aniketcode/signin.html'; // Redirect to login page
            return;
        }

        const response = await fetch(`${API}.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Filter data based on the logged-in user's email
        originalData = data ? Object.entries(data)
            .filter(([key, value]) => value.userEmail === userEmail)
            .map(([key, value]) => ({ ...value, key })) : [];

        createCard(originalData); // Display the filtered user data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


function createCard(data) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; 

    if (data.length === 0) {
        cardContainer.innerHTML = "<p>No bookings found for your account.</p>"; // No bookings message
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', item.id);

        const cardImage = document.createElement('div');
        cardImage.classList.add('card-image');
        const img = document.createElement('img');
        img.src = item.image;
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

        // Edit Button
        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        editButton.textContent = 'Edit Booking';
        editButton.addEventListener('click', () => editBooking(item.key)); // Use item.key instead of id

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete Booking';
        deleteButton.addEventListener('click', () => deleteBooking(item.key));

        cardContent.appendChild(title);
        cardContent.appendChild(category);
        cardContent.appendChild(location);
        cardContent.appendChild(price);
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
