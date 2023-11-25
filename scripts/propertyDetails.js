import { fetchData } from './fetchData.js';
import { getMarkup } from './markups.js';
import L from 'leaflet';
import { loadSkeleton } from './skeletonLoader.js';
const mainContent = document.querySelector('.main-content');
const propertyInfo = document.querySelector('.property-info');
const propertyDesc = document.querySelector('.property-description');
const propertyAmenities = document.querySelector('.property-amenities');
const id = window.location.search.split('=')[1];
const burger = document.querySelector('.burger');
const panelHeaders = document.querySelectorAll('.panel .panel-header');
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
const skeleton = loadSkeleton('detailedProperty');
mainContent.insertAdjacentHTML('afterbegin', skeleton);
const property = await fetchData(
  `https://bayut.p.rapidapi.com/properties/detail?externalID=${id}`
);
mainContent.innerHTML = '';
mainContent.insertAdjacentHTML('afterbegin', '<div id="map"></div>');
const mapEl = document.querySelector('#map');
const map = L.map('map').setView(
  [property.geography.lat, property.geography.lng],
  18
);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
L.marker([51.5, -0.09]).addTo(map).openPopup();
const mainContentMarkup = getMarkup('mainContentMarkup', property);
const propertyInfoMarkup = getMarkup('propertyInfoMarkup', property);
const propertyDescMarkup = getMarkup('descriptionMarkup', property);
const propertyAmenitiesMarkup = getMarkup('amenitiesMarkup', property);
mainContent.insertAdjacentHTML('afterbegin', mainContentMarkup);
propertyInfo.insertAdjacentHTML('afterbegin', propertyInfoMarkup);
propertyDesc.insertAdjacentHTML('afterbegin', propertyDescMarkup);
propertyAmenities.insertAdjacentHTML('afterbegin', propertyAmenitiesMarkup);
const images = document.querySelectorAll('.main-content .img-fluid');
images.forEach((img, i) => {
  const parentEl = img.parentElement;
  const skeleton = loadSkeleton(i > 0 ? 'image' : 'cover');
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', skeleton);
  img.addEventListener('load', () => {
    parentEl.innerHTML = '';
    parentEl.insertAdjacentElement('afterbegin', img);
  });
});
const toggleDesc = document.querySelector('.toggle-desc');
const toggleAmenities = document.querySelector('.toggle-amenities');
const toggleContent = e => {
  const textArr = e.target.innerText.split(' ');
  e.target.innerText = `${textArr[0]} ${
    textArr[1] === 'More' ? 'Less' : 'More'
  }`;
  const contentManager = e.target
    .closest('.container')
    .querySelector('.content-manager');
  contentManager.classList.toggle('expanded-content');
};
toggleDesc.addEventListener('click', toggleContent);
toggleAmenities.addEventListener('click', toggleContent);
document
  .querySelector('.map-container')
  .insertAdjacentElement('beforeend', mapEl);
