export const selectorComment = (tweetId, state) => {
  return state.filter((elm) => elm.tweet_id === tweetId);
};
