const toggleCardDetails = (event) => {
    const card = event.currentTarget;
    const details = card.querySelector('.project-details');
    details.classList.toggle('visible');
};

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', toggleCardDetails);
});

// Example CSS (add to your CSS file)
/*
.project-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;            
    transition: box-shadow 0.3s;
}
.project-card:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.project-details {
    display: none;  
    padding: 10px;
    background-color: #f9f9f9;
}
.project-details.visible {
    display: block;
}
*/