import { v4 } from 'node-uuid';

export const createClimate = initState => {
  let currentState = initState;
  let followers = [];

  const forecast = () => currentState;

  const storm = zeus => {
    return newStats => {
      currentState = zeus(currentState, newStats);
      _informFollowers(currentState);
    };
  };

  const follow = following => {
    const id = v4();
    followers.push({ fn: following, id });
    return id;
  };

  const unfollow = id => {
    followers = followers.filter(follower => follower.id !== id);
  };

  const _informFollowers = newClimate => {
    followers.forEach(follower => follower.fn(newClimate));
  };

  return {
    forecast,
    storm,
    follow,
    unfollow,
  };
};
