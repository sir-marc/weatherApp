const selectedCities = 'selectedCities';

export const getSelectedCities = () =>
  JSON.parse(localStorage.getItem(selectedCities)) || [];

export const addSelectedCity = city => {
  const cities = getSelectedCities();
  localStorage.setItem(selectedCities, JSON.stringify([...cities, city]));
};

export const initLocalStorage = () => {
  localStorage.setItem(
    selectedCities,
    JSON.stringify([
      {
        key: '2459115',
        label: 'New York, NY',
      },
    ]),
  );
};
