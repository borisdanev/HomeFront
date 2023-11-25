import { searchSubmit, selectElement, renderProperties } from './script.js';
import { getLocation } from './propertiesList.js';
import { renderSlider } from './carousel.js';
const testimonialSlides = document.querySelectorAll('.testimonial .slide');
const searchBar = document.querySelector('.search-bar');
const propertiesContainer = document.querySelector(
  '.properties .properties-container'
);
const locationSelector = document.querySelector('.properties select');
const categories = document.querySelector('.filters');
const getLenght = () => {
  if (window.innerWidth < 992) return 6;
  return 8;
};
const renderArrows = () => {
  const prevArrow = document.querySelector('.prev-arrow');
  const nextArrow = document.querySelector('.next-arrow');
  const arrowConainer = document.querySelector('.arrow-container');
  const container =
    window.innerWidth < 768
      ? arrowConainer
      : document.querySelector('.testimonial .container-lg');
  [prevArrow, nextArrow].forEach(item =>
    container.insertAdjacentElement('beforeend', item)
  );
};
renderArrows();
const getFilters = async () => {
  const filters = {};
  filters.length = getLenght();
  filters.ids = await getLocation(locationSelector.value, filters.length);
  filters.category = categories.querySelector('.active').dataset.category;
  return filters;
};
renderSlider();
testimonialSlides.forEach((slide, i) => {
  slide.querySelector('img').src = `optimised_images/client_${i + 1}.jpg`;
});
searchBar.addEventListener('submit', e => {
  e.preventDefault();
  const filters = searchSubmit();
  localStorage.setItem('filters', JSON.stringify(filters));
  window.location.href = 'properties.html';
});
let lastFilter;
categories.addEventListener('click', async e => {
  const current = e.target.closest('.category');
  if (current === lastFilter || !current) return;
  selectElement(e, 'category');
  propertiesContainer.innerHTML = '';
  const filters = await getFilters();
  renderProperties(filters);
});
const filters = await getFilters();
renderProperties(filters);
locationSelector.addEventListener('change', async e => {
  const filters = await getFilters();
  renderProperties(filters);
});
window.addEventListener('resize', renderArrows);
