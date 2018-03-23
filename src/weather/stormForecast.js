import { getWeatherForcastForCity } from '../api/api';

export const stormForecast = ({ key, label }, storm) =>
  getWeatherForcastForCity(
    { key, label },
    storm(({ cities }, newForecast) => ({
      cities: [...cities.filter(c => c.key !== newForecast.key), newForecast],
    })),
  );
