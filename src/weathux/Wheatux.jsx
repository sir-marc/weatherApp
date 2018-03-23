import React from 'react';

const { Provider, Consumer } = React.createContext({});

export class Jupiter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: props.climate.forecast() || {},
    };
    this.unfollowRef = props.climate.follow(forecast =>
      this.setState({ forecast }),
    );
    if (props.dev) {
      this.unfollowDevRef = props.climate.follow((forecast, old, attrs) => {
        console.group('weather changed');
        console.log('weather before', old);
        console.log('attrs', attrs);
        console.log('actual weather', forecast);
        console.groupEnd('weather changed');
      });
    }
  }

  componentWillUnmount() {
    this.props.climate.unfollow(this.unfollowRef);
    if (this.props.dev) this.props.climate.unfollow(this.unfollowDevRef);
  }

  render() {
    return (
      <Provider
        value={{
          forecast: this.state.forecast,
          storm: this.props.climate.storm,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export const Mars = Consumer;
