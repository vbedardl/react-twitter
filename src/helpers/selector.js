export const selectorComment = (tweetId, state) => {
  return state.filter((elm) => elm.tweet_id === tweetId);
};

export const userObjectWithLikesArray = (user, state) => {
  const newUser = { ...user };
  newUser.likedTweet = state.likeData
    .filter((elm) => elm.user_id === user.id)
    .map((elm) => elm.tweet_id);
  return newUser;
};

export const userObjectWithNewLike = (user, tweet_id) => {
  const newUser = { ...user };
  user.likedTweet.push(tweet_id);

  return newUser;
};
