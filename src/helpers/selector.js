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
  if (newUser.likedTweet) {
    newUser.likedTweet.push(tweet_id);
  } else {
    newUser.likedTweet = [];
    newUser.likedTweet.push(tweet_id);
  }

  return newUser;
};

export const userObjectWithAccountHeFollows = (user, state) => {
  const newUser = { ...user };
  newUser.userFollows = state.followingData
    .filter((elm) => elm.follower_id === user.id)
    .map((elm) => elm.followed_id);

  return newUser;
};

export const finalUserObject = (user, state) => {
  const user1 = userObjectWithLikesArray(user, state);
  const user2 = userObjectWithAccountHeFollows(user1, state);
  return user2;
};
