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
  }

  componentWillUnmount() {
    this.props.climate.unfollow(this.unfollowRef);
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
