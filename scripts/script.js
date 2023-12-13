import { getProperty, getProperties } from './propertiesList.js';
import { loadSkeleton } from './skeletonLoader.js';
import { manageFilters, submitFilter } from './SearchFilters.js';
import { createObserver } from './animations.js';
const navBar = document.querySelector('.nav-bar');
const purposeSelectors = document.querySelector('.purpose-selector-container');
const locationInput = document.querySelector('.location-input');
const locationSelectorContainer = document.querySelector(
  '.location-selector-container'
);
const locationButton = document.querySelector(
  '.location-selector-container .btn'
);
const priceSelector = document.querySelector('.price-selector');
const priceSelectors = document.querySelectorAll('.price-selector input');
const priceInput = document.querySelector('.price-input');
const priceButton = document.querySelector('.price-selector .btn');
const areaSelector = document.querySelector('.area-selector');
const areaSelectors = document.querySelectorAll('.area-selector input');
const areaInput = document.querySelector('.area-input');
const areaButton = document.querySelector('.area-selector .btn');
const propertiesContainer = document.querySelector(
  '.properties .properties-container'
);
const registerBtn = document.querySelector('.register-btn');
const registerForm = document.querySelector('.register-form');
const overlay = document.querySelector('.overlay');
const panelHeaders = document.querySelectorAll('.panel .panel-header');
const setEqualHeight = list => {
  let maxHeight = 0;
  list.forEach(element => {
    if (element.offsetHeight > maxHeight) maxHeight = element.offsetHeight;
  });

  list.forEach(element => (element.style.height = `${maxHeight}px`));
};
const renderProperties = async filters => {
  try {
    const arr = Array.from({ length: filters.length }, (_, index) => index);
    propertiesContainer.innerHTML = '';
    arr.forEach((_, i) => {
      const skeleton = loadSkeleton('property');
      propertiesContainer.insertAdjacentHTML('beforeend', skeleton);
    });
    const hits = await getProperties(filters);
    propertiesContainer.innerHTML = '';
    hits.forEach(property => {
      const markup = getProperty(property);
      propertiesContainer.insertAdjacentHTML('afterbegin', markup);
    });
    const images = propertiesContainer.querySelectorAll('.img-fluid');
    images.forEach(img => {
      const parentEl = img.parentElement;
      const skeleton = loadSkeleton('image');
      parentEl.removeChild(img);
      parentEl.insertAdjacentHTML('afterbegin', skeleton);
      img.addEventListener('load', () => {
        const skeletonEl = parentEl.querySelector('.skeleton');
        parentEl.removeChild(skeletonEl);
        parentEl.insertAdjacentElement('afterbegin', img);
      });
    });
    propertiesContainer.addEventListener('click', e => {
      const current = e.target.closest('.col-md-6');
      if (!current) return;
      const id = Number(current.dataset.id);
      const { externalID } = hits.find(item => item.id === id);
      window.location.href = `property-details.html?id=${externalID}`;
    });
    const list = [...propertiesContainer.querySelectorAll('.col-md-6 .title')];
    setEqualHeight(list.slice(0, 4));
    setEqualHeight(list.slice(4, 8));
  } catch (err) {
    propertiesContainer.innerHTML = '';
    const markup = `
      <div class='col-12 h2 text-danger text-center mt-4'>${err.message}</div>
    `;
    propertiesContainer.insertAdjacentHTML('afterbegin', markup);
  }
};
(() => {
  const [user, name] = document.cookie.split('=');
  if (user) document.body.classList.add('logged-in');
})();
const toggleSelector = function () {
  document
    .querySelectorAll('.selector')
    .forEach(item => item !== this && item.classList.add('d-none'));
  this.classList.toggle('d-none');
};
window.addEventListener('scroll', () => {
  if (window.location.pathname.includes('properties')) return;
  const distance = window.pageYOffset + navBar.getBoundingClientRect().top;
  distance > 0
    ? navBar.classList.add('nav-scrolled')
    : navBar.classList.remove('nav-scrolled');
});
const toggleForm = () => document.body.classList.toggle('form-opened');
const selectElement = (e, className) => {
  const current = e.target.closest(`.${className}`);
  if (!current) return;
  const list = e.currentTarget.querySelectorAll(`.${className}`);
  list.forEach(item => item.classList.remove('active'));
  current.classList.add('active');
};
const setFilterSubmit = (e, type, selector) => {
  const min = e.target
    .closest(`.${type}-selector`)
    .querySelector('input[data-range="min"]');
  const max = e.target
    .closest(`.${type}-selector`)
    .querySelector('input[data-range="max"]');
  toggleSelector.call(selector);
  submitFilter(min, max, type);
};
const searchSubmit = () => {
  const purpose = purposeSelectors
    .querySelector('.active')
    .innerText.toLowerCase();
  const location = locationSelectorContainer
    .querySelector('.active')
    .innerText.toLowerCase();
  let min = priceSelector.querySelector('input[data-range="min"]');
  let max = priceSelector.querySelector('input[data-range="max"]');
  const [minPrice, maxPrice] = submitFilter(min, max, 'price');
  min = areaSelector.querySelector('input[data-range="min"]');
  max = areaSelector.querySelector('input[data-range="max"]');
  const [minArea, maxArea] = submitFilter(min, max, 'area');
  return {
    purpose,
    location,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
  };
};
overlay.addEventListener('click', toggleForm);
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !registerBtn.classList.contains('d-none'))
    toggleForm();
});

purposeSelectors.addEventListener('click', e => selectElement(e, 'item'));
locationSelectorContainer.addEventListener('click', e =>
  selectElement(e, 'item')
);
priceSelectors.forEach(selector =>
  selector.addEventListener('input', e => manageFilters(e, 'price'))
);
areaSelectors.forEach(selector =>
  selector.addEventListener('input', e => manageFilters(e, 'area'))
);
priceInput.addEventListener('click', toggleSelector.bind(priceSelector));
areaInput.addEventListener('click', toggleSelector.bind(areaSelector));
locationInput.addEventListener(
  'click',
  toggleSelector.bind(locationSelectorContainer)
);
priceButton.addEventListener('click', e =>
  setFilterSubmit(e, 'price', priceSelector)
);
areaButton.addEventListener('click', e =>
  setFilterSubmit(e, 'area', areaSelector)
);
locationButton.addEventListener('click', e => {
  const active = locationSelectorContainer.querySelector('.active').innerText;
  locationInput.querySelector('span').innerText = active;
  toggleSelector.call(locationSelectorContainer);
});
const burger = document.querySelector('.burger');
burger.addEventListener('click', e => {
  e.currentTarget.classList.toggle('open');
  document.querySelector('.side-container').classList.toggle('side-bar-closed');
});
panelHeaders.forEach(item =>
  item.addEventListener('click', e => {
    const { nextElementSibling: panelContent } = item;
    const activeHeader = document.querySelector('.panel-header.active');
    const activeContent = document.querySelector('.panel-content.active');
    if (activeHeader && activeContent) {
      activeHeader.classList.remove('active');
      activeContent.style.maxHeight = 0;
      activeContent.classList.remove('active');
      if (activeHeader === item) return;
    }
    item.classList.toggle('active');
    if (item.classList.contains('active')) {
      panelContent.style.maxHeight = `${panelContent.scrollHeight}px`;
      panelContent.classList.add('active');
    } else {
      panelContent.style.maxHeight = 0;
      panelContent.classList.remove('active');
    }
  })
);
export { searchSubmit, selectElement, toggleSelector, renderProperties };
