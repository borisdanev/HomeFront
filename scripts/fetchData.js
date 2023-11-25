let currentKeyIndex = 0;
const keys = [
  '742a0f9453msh3485f2c5c773787p14b320jsn915ba24bc924',
  'e4bb5e8b98msh11bbe8e3436b6bdp177755jsn371bb4f3c0da',
  '05af4455aamshc28fa602c8aa46ap1e663cjsn048569db156c',
];
const fetchData = async url => {
  const key = keys[currentKeyIndex];
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok)
      if (response.status === 429) {
        currentKeyIndex = (currentKeyIndex + 1) % keys.length;
        return fetchData(url);
      }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Property not found!');
  }
};
const wait = sec => new Promise(resolve => setTimeout(resolve, sec * 1000));

export { fetchData, wait };
