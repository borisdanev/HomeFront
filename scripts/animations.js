import { wait } from './fetchData.js';
import { playSlider } from './carousel.js';
const slideFromLeft = document.querySelectorAll('.slide-from-left');
const collapsed = document.querySelectorAll('.collapsed');
const zoomIn = document.querySelectorAll('.zoom-in');
const showText = document.querySelectorAll('.show-text');
const slideFromDown = document.querySelectorAll('.slide-from-down');
const grow = document.querySelectorAll('.grow');
const numbers = document.querySelectorAll('.about-us .number');
const appear = document.querySelectorAll('.appear');
const slider = document.querySelector('.testimonial-slider');
const loadAnimation = (el, className) => el.classList.remove(className);
const createObserver = (className, threshold) =>
  new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        loadAnimation(el, className);
      });
    },
    {
      root: null,
      threshold,
    }
  );
const setObserver = (observer, list) =>
  list.forEach(item => observer.observe(item));
const setNum = (num, inc, target) => {
  let current = 0;
  const increaseNum = async () => {
    await wait(0.05);
    num.innerText = current;
    if (current >= target) return;
    current += inc;
    increaseNum();
  };
  increaseNum();
};
let i = 0;
const setCounter = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const current = entry.target;
    if (i === 0) {
      setNum(current, 200, 7000);
    }
    if (i === 1) {
      setNum(current, 200, 5000);
    }
    if (i === 2) {
      setNum(current, 300, 12000);
    }
    i++;
    observer.unobserve(current);
  });
};
const counterObserver = new IntersectionObserver(setCounter, {
  root: null,
  threshold: 0.2,
});
if (slider) {
  new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        setTimeout(playSlider, 300);
        observer.unobserve(slider);
      });
    },
    {
      root: null,
      threshold: 0.5,
    }
  ).observe(slider);
}
const fromLeftObserver = createObserver('slide-from-left', 0.05);
const collapsedObserver = createObserver('collapsed', 0.1);
const zoomInObserver = createObserver('zoom-in', 0.5);
const showTextObserver = createObserver('show-text', 0.1);
const fromDownObserver = createObserver('slide-from-down', 0.1);
const growObserver = createObserver('grow', 0.1);
const appearObserver = createObserver('appear', 0.1);
setObserver(fromLeftObserver, slideFromLeft);
setObserver(collapsedObserver, collapsed);
setObserver(zoomInObserver, zoomIn);
setObserver(showTextObserver, showText);
setObserver(fromDownObserver, slideFromDown);
setObserver(growObserver, grow);
setObserver(counterObserver, numbers);
setObserver(appearObserver, appear);
export { createObserver, setObserver };
