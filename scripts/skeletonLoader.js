const loadSkeleton = category => {
  if (category === 'property')
    return `<div class='col-md-6 col-lg-4 col-xl-3 mb-4'>
   <div class='skeleton skeleton-img'></div>
   <div class='skeleton skeleton-title mt-3'></div>
   <div class='d-flex'>
   <div class='skeleton skeleton-property'></div>
   <div class='skeleton skeleton-property'></div>
   <div class='skeleton skeleton-property'></div>
   </div>
   <div class='skeleton skeleton-price'></div>
  </div>`;
  if (category === 'detailedProperty')
    return `<div class="container">
  <div class="row g-3">
      <div class="col-lg-7">
          <div class="row g-3">
              <div class="col-12">
                 <div class="skeleton skeleton-cover"></div>
              </div>
              <div class="col-12">
                  <div class="row">
                     ${new Array(6)
                       .fill(0)
                       .slice(1, 7)
                       .map(
                         photo => `
                      <div class="col-2 px-1">
                          <div class="skeleton skeleton-img"></div>
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
             <div class="skeleton skeleton-title"></div>
          </p>
          <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-price"></div>
          <div>
              <span class="me-3">
                  <span>
                      <div class="skeleton skeleton-price"></div>
                  </span>
              </span>
              <span>
                  <span>
                      <div class="skeleton skeleton-price"></div>
                  </span>
              </span>
          </div>
          <div class="skeleton skeleton-contact my-4"></div>
          <div>
                  <div class="skeleton skeleton-price"></div>
                  <div class="skeleton skeleton-map mt-3"></div<
          </div>
      <div>
  </div>
</div>`;
  if (category === 'cover')
    return `<div class="skeleton skeleton-cover">
</div>`;
  if (category === 'image') {
    return `<div class="skeleton skeleton-img">
</div>`;
  }
};
export { loadSkeleton };
