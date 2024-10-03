document.addEventListener('DOMContentLoaded', () => {
    const currentDate = new Date();
    let selectedDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const monthYearDisplay = document.getElementById('month-year');
    const calendarBody = document.getElementById('calendar-body');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    
    function updateCalendar() {
        calendarBody.innerHTML = '';  
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();  
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();  

        
        monthYearDisplay.textContent = `${months[currentMonth]} ${currentYear}`;

        
        let row = document.createElement('tr');
        
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('td');
            row.appendChild(emptyCell);
        }

        
        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement('td');
            cell.textContent = day;

            
            if (day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear()) {
                cell.classList.add('selected-date');
            }

            
            cell.addEventListener('click', () => {
                selectedDate = new Date(currentYear, currentMonth, day);
                updateCalendar();  
            });

            row.appendChild(cell);

            
            if ((firstDay + day) % 7 === 0) {
                calendarBody.appendChild(row);
                row = document.createElement('tr');
            }
        }

        
        if (row.children.length > 0) {
            calendarBody.appendChild(row);
        }
    }

    
    prevButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    nextButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    
    updateCalendar();
});




const params = new URLSearchParams(window.location.search);


document.querySelector('.left-section1 h1').textContent = params.get('title');
document.querySelector('.left-section1 p:nth-child(2)').textContent = `By ${params.get('name')}`;
document.querySelector('.left-section1 p:nth-child(3)').textContent = `~ ${params.get('min')} minutes`;
document.querySelector('.left-section1 .category').textContent = params.get('category');
document.querySelector('.left-section1 .location').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${params.get('location')}`;
document.querySelector('.left-section1 .description').textContent = params.get('description');


document.querySelector('.right-section1 img').src = params.get('image');
document.querySelector('.right-section1 img').alt = params.get('title');

document.querySelector('.Aname h3').textContent = `$ ${params.get('title')}`;
document.querySelector('.Aname p').textContent = `$ ${params.get('name')}`;




document.querySelector('.right-section .price').textContent = `Price - $ ${params.get('price')}`;
document.querySelector('.su h5').textContent = `$ ${params.get('price')}`;



