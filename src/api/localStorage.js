const storageName = 'selectedCities';

export const getSelectedCities = () =>
  JSON.parse(localStorage.getItem(storageName)) || [];

export const addSelectedCity = city => {
  const cities = getSelectedCities();
  localStorage.setItem(
    storageName,
    JSON.stringify([...cities.filter(c => c.key !== city.key), city]),
  );
};

export const initLocalStorage = (force = false) => {
  const storage = localStorage.getItem(storageName);
  if (storage && !force) return;
  localStorage.setItem(
    storageName,
    JSON.stringify([
      {
        key: '2459115',
        label: 'New York, NY',
      },
    ]),
  );
};
