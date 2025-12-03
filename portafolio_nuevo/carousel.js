const track = document.querySelector('.carousel-track');
const cards = Array.from(document.querySelectorAll('.card'));
let currentIdx = 0;
function updateCarousel() {
  track.style.transform = `translateX(-${currentIdx * 370}px)`;
}
document.getElementById('prevBtn').onclick = () => {
  currentIdx = (currentIdx - 1 + cards.length) % cards.length;
  updateCarousel();
};
document.getElementById('nextBtn').onclick = () => {
  currentIdx = (currentIdx + 1) % cards.length;
  updateCarousel();
};
updateCarousel();