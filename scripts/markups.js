const capitalize = word => word?.charAt(0).toUpperCase() + word?.slice(1);
const getMarkup = (name, property) => {
  const info = [
    { name: 'Type', value: property.category[1].nameSingular },
    {
      name: 'Purpose',
      value: property.purpose
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    },
    {
      name: 'Furnished',
      value: capitalize(property.furnishingStatus) || 'Unfurnished',
    },
    {
      name: 'Added on',
      value: new Date(property.approvedAt * 1000).toLocaleDateString('eu-EU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    },
    { name: 'Completion', value: capitalize(property.completionStatus) },
    {
      name: 'TruCheck on',
      value: new Date(
        property.verification.trucheckedAt * 1000
      ).toLocaleDateString('gb-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    },
  ];
  switch (name) {
    case 'mainContentMarkup': {
      return `
        <div class="container">
            <div class="row g-3">
                <div class="col-lg-7">
                    <div class="row g-3">
                        <div class="col-12">
                            <img class="cover-photo img-fluid" src="${
                              property.coverPhoto.url
                            }"/>
                        </div>
                        <div class="col-12">
                            <div class="row">
                               ${property.photos
                                 .slice(1, 7)
                                 .map(
                                   photo => `
                                <div class="col-2 px-1">
                                    <img class="img-fluid" src="${photo.url}"/>
                                </div>
                                `
                                 )
                                 .join('')}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <p class="title">
                        ${property.title}
                    </p>
                    <p> 
                        ${property.location
                          .slice(0, 4)
                          .reverse()
                          .map(item => `<span>${item.name}</span>`)
                          .join(',')}
                    </p>
                    <p class="h3">
                            $${property.price.toLocaleString('en-US')}
                    </p>
                    <div>
                        <span class="me-3">
                            <img src="images/bed.png" style="width:1rem;height:1rem" />
                            <span>
                                ${property.rooms} Beds
                            </span>
                        </span>
                        <span>
                            <img src="images/bathtub.png" style="width:1rem;height:1rem" />
                            <span>
                                ${property.baths} Baths
                            </span>
                        </span>
                    </div>
                    <div class="my-4 border border-primary rounded-3 p-2">
                            <p class="h5">
                                Connect with an agent
                            </p>
                            <p class="text-secondary">
                                ${property.contactName}
                            </p>
                            <p>
                                <i class="fa-solid fa-phone text-primary me-2"></i>
                                ${property.phoneNumber.mobile}
                            </p>
                    </div>
                    <div class="map-container">
                            <p class="h4 mb-3">
                                Location
                            </p>
                    </div>
                <div>
            </div>
        </div>`;
    }
    case 'propertyInfoMarkup': {
      return `
      <div class="container">
        <p class="h2 mb-4">Property Information</p>
        <div class="row gy-4">
            ${info
              .map(
                item => `
            <div class="col-sm-6 col-lg-4">
                <div class="row">
                    <div class="col-6">
                        <p class="h5 text-secondary">${item.name}</p>
                    </div>
                    <div class="col-6">
                        <p class="h5">${item.value}</p>
                    </div>
                </div>
            </div>
            `
              )
              .join('')}
        </div>
      </div>`;
    }
    case 'descriptionMarkup': {
      return `
        <div class="container rounded-3 p-3">
            <p class="h2">
                Property Description
            </p>
            <div class="content-manager mb-3">
              <div class="full-desc">
              ${property.description
                .split(/\n\s*\n/)
                .map(paragraph => `<p >${paragraph}</p>`)
                .join('\n')}
              </div>
            </div>
            <div class="d-flex justify-content-center">
            <button class="toggle-desc btn btn-light rounded-pill">Read More</button>
          </div>
        </div>
        `;
    }
    case 'amenitiesMarkup': {
      return `
        <div class="container rounded-3 p-3">
            <p class="h2">Property Amenities</p>
            <div class="row ps-0 ps-sm-3 ps-lg-5 content-manager">
                ${property.amenities
                  .map(
                    item =>
                      `
                    <div class="col-12">
                        <p class="p-2 fw-bold">${item.text}</p>
                        <div class="row">
                           ${item.amenities
                             .map(
                               amenitie =>
                                 `
                                <div class="col-6">
                                <p>• ${amenitie.text}</p>
                                </div>
                           `
                             )
                             .join('')}
                        </div>
                    </div>
                `
                  )
                  .join('')}
            </div>
            <div class="d-flex justify-content-center mt-4">
              ${
                property.amenities.length > 0
                  ? '<button class="btn btn-light toggle-amenities h6 rounded-pill">View More</button>'
                  : '<p class="h4 text-danger">No amenities available for this property</p>'
              }
            </div>
        </div>
        `;
    }
  }
};
export { getMarkup };
