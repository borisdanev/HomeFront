import { fetchData } from './fetchData.js';
const getProperty = property => {
  const title =
    property.title.split(',').length === 1
      ? property.title.split('|')
      : property.title.split(',');
  return `
    <div class="col-md-6 col-lg-4 col-xl-3 mb-4" data-id=${
      property.id
    } style="cursor:pointer">
    <div class="position-relative">
      <img class="img-fluid w-100" src='${
        property.coverPhoto.url
      }' alt="Real estate property"/>
      <p class="position-absolute text-white">${property.location[0].name}, ${
    property.location[1].name
  }</p>
      <button class="position-absolute btn btn-dark rounded-pill">${
        property.category[1].nameSingular
      }</button>
      </div>
      <p class="title h6 mt-3">${title.slice(0, 2).join(' ')}</p>
      <div class="d-flex icons">
      <div class="me-2 me-md-3">
        <span>
        <img src="images/bed.png" alt="Bed"/>
        </span>
        <span>${property.rooms ? property.rooms : 1} room</span>
          </div>
          <div class="me-2 me-md-3">
          <span>
        <img src="images/bathtub.png" alt="Bathtub"/>
        </span>
        <span >${property.baths} room</span></div>
          <div class="me-2 me-md-3">
          <span>
        <img src="images/scale.png" alt="Area">
        </span>
        <span>${Math.trunc(property.area)} m²</span></div>
        </div>
        <p class="fw-bold h5 mt-2">${new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(property.price)}</p>
      </div>
    </div>
`;
};
const getLocation = async (value, length) => {
  try {
    const location = value.replaceAll(' ', '%20').toLowerCase();
    const { hits } = await fetchData(
      `https://bayut.p.rapidapi.com/auto-complete?query=${location}&hitsPerPage=${length}&page=0&lang=en`
    );
    const ids = hits.map(item => item.externalID);
    return ids;
  } catch (err) {
    throw err;
  }
};
const getProperties = async ({
  ids,
  length,
  category,
  purpose = 'sale',
  minPrice,
  maxPrice,
  minArea,
  maxArea,
}) => {
  try {
    const { hits } = await fetchData(
      `https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=${ids.join(
        '%2C'
      )}&purpose=for-${purpose}&hitsPerPage=${length}&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=${
        category || ''
      }&priceMin=${minPrice || ''}&priceMax=${maxPrice || ''}&areaMin=${
        minArea || ''
      }&areaMax=${maxArea || ''}`
    );
    if (hits.length === 0) throw new Error('No properties found!');
    return hits;
  } catch (err) {
    throw err;
  }
};
export { getProperty, getLocation, getProperties };
