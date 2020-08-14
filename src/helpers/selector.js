export const selectorComment = (tweetId, state) => {
  return state.filter((elm) => elm.tweet_id === tweetId);
};

export const userObjectWithLikesArray = (user, state) => {
  const newUser = { ...user };
  newUser.likedTweet = state.likedData
    .filter((elm) => elm.user_id === user.id)
    .map((elm) => elm.id);
  return newUser;
};
