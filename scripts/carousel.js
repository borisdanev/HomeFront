import $ from 'jquery';
import 'slick-carousel';
const renderSlider = () => {
  $('.testimonial-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: document.querySelector('.next-arrow'),
    prevArrow: document.querySelector('.prev-arrow'),
    speed: 600,
  });
};
const playSlider = () => $('.testimonial-slider').slick('slickNext');

export { renderSlider, playSlider };
