const burgerIcon = document.querySelector('.burger-icon');
const menu = document.querySelector('.burger-elements');

burgerIcon.addEventListener('click', () => {
  menu.classList.toggle('show');
  console.log("+++");
});