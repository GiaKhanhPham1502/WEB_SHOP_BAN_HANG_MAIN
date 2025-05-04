const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const comment = document.querySelector('#list-comment');
const commentItems = document.querySelectorAll('#list-comment .item');

let currentIndex = 0;
const itemHeight = 400; 
const visibleCount = 1; 
const totalItems = commentItems.length;

next.addEventListener('click', function (event) {
  event.preventDefault();
  if (currentIndex < totalItems - visibleCount) {
    currentIndex++;
    updateTransform();
  }
});

prev.addEventListener('click', function (event) {
  event.preventDefault();
  if (currentIndex > 0) {
    currentIndex--;
    updateTransform();
  }
});