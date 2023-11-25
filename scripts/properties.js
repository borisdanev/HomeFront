import {
  searchSubmit,
  toggleSelector,
  selectElement,
  renderProperties,
} from './script.js';
import { getLocation } from './propertiesList.js';
const searchBar = document.querySelector('.search-bar');
const categotyInput = document.querySelector('.category-input');
const categorySelector = document.querySelector('.category-selector');
const categoryBtn = categorySelector.querySelector('.btn');
const propertiesHeader = document.querySelector('.properties .h2');

const getLenght = () => {
  if (window.innerWidth < 992) return 6;
  return 25;
};
const getFilters = async () => {
  const filters = searchSubmit();
  filters.length = getLenght();
  filters.ids = await getLocation(filters.location, filters.length);
  filters.category = categorySelector.querySelector('.active').dataset.category;
  propertiesHeader.innerText = `Properties for ${filters.purpose} in UAE`;
  return filters;
};
searchBar.addEventListener('submit', async e => {
  e.preventDefault();
  const filters = await getFilters();
  if (window.location.hash) console.log('hash is available');
  renderProperties(filters);
});
if (localStorage.getItem('filters')) {
  console.log(0);
  const filters = JSON.parse(localStorage.getItem('filters'));
  filters.length = getLenght();
  filters.ids = await getLocation(filters.location, filters.getLenght);
  propertiesHeader.innerText = `Properties for ${filters.purpose} in UAE`;
  renderProperties(filters);
  localStorage.removeItem('filters');
} else {
  let filters = await getFilters();

  if (window.location.hash) {
    const purpose = window.location.search.split('=')[1];
    filters = { ...filters, purpose };
    propertiesHeader.innerText = `Properties for ${filters.purpose} in UAE`;
  }
  renderProperties(filters);
}
categotyInput.addEventListener('click', toggleSelector.bind(categorySelector));
categorySelector.addEventListener('click', e => selectElement(e, 'item'));
categoryBtn.addEventListener('click', () => {
  const active = categorySelector.querySelector('.active').innerText;
  categotyInput.querySelector('span').innerText = active;
  toggleSelector.call(categorySelector);
});
