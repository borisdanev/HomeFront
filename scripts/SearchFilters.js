const setValue = (targetEl, range, value, type) => {
  if (value.length > 3 && value.length <= 6) value = `${+value / 1000}K`;
  if (value.length > 6) value = `${+value / 1000000}M`;
  if (range === 'min')
    targetEl.innerText = `${type === 'price' ? '$' + value : value + '㎡'} -`;
  else targetEl.innerText = ` ${type === 'price' ? '$' + value : value + '㎡'}`;
};
const manageFilters = (e, type) => {
  const target = e.target.closest(`.${type}-selector`).dataset.target;
  const range = e.target.dataset.range;
  const targetEl = document.querySelector(`${target}-${range}`);
  let value = e.target.value;
  if (value.length === 0) {
    if (range === 'min')
      targetEl.innerText = type.charAt(0).toUpperCase() + type.slice(1);
    else targetEl.innerText = 'any';
    return;
  }
  setValue(targetEl, range, value, type);
};
const submitFilter = (min, max, type) => {
  return [min.value || 0, max.value];
};
const setLocation = () => {};
export { manageFilters, submitFilter, setLocation };
