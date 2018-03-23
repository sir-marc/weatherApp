const transformData = data => ({
  ...data,
  lastUpdated: new Date(data.created),
  sunrise: data.channel.astronomy.sunrise,
  sunset: data.channel.astronomy.sunset,
  current: data.channel.item.condition,
  humidity: data.channel.atmosphere.humidity,
  wind: data.channel.wind,
});

export const getWeatherForcastForCity = ({ key, label }, callback) => {
  const statement = 'select * from weather.forecast where woeid=' + key;
  const url =
    'https://query.yahooapis.com/v1/public/yql?format=json&q=' + statement;

  if ('caches' in window) {
    caches.match(url).then(response => {
      if (response) {
        response.json().then(resp =>
          callback({
            ...transformData(resp.query.results),
            key,
            label,
            created: resp.query.created,
          }),
        );
      }
    });
  }

  fetch(url).then(response =>
    response.json().then(resp =>
      callback({
        ...transformData(resp.query.results),
        key,
        label,
        created: resp.query.created,
      }),
    ),
  );
};
