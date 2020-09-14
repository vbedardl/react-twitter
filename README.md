# Twitter Copy cat

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It uses a PostgreSQL database and an [express server](https://github.com/vbedardl/react-twitter-api-sql).

It is a basic Twitter copycat.

- You can register/login
- Create a tweet
- Like/dislike a tweet
- Follow/Unfollow someone
- Leave a comment on a tweet

## Dependencies

- Front End
  axios: 0.19.2
  react: 16.13.1
  react-dom: 16.13.1
  react-scripts: 3.4.1
- Back end
  bcrypt: 5.0.0
  body-parser: 1.19.0
  cookie-session: 1.4.0
  dotenv: 8.2.0
  express: 4.17.1
  pg: 8.3.0

## Getting Started

- Clone and install all the required dependencies using `npm install` on the following repo:

  - [Back end API](https://github.com/vbedardl/react-twitter-api-sql)
  - [Front end](https://github.com/vbedardl/react-twitter-frontend)

- Copy the .env.example file with your own psql db information
- Create the database tables `\i db/schema/01_tweet_schema.sql`
- Seed the database using `\i db/seeds/01_tweet_seeds.sql`
- Run the server with `npm start`, then the front end with `npm start`

## Current functionalities

- A user can register/login and logout.
- A user can create a new tweet
- A user can like/dislike a tweet
- A user can follow/unfollow another user
- A user can comment on another tweet

## Further development

- Using Breadth-first Search to display relations degree between users.
- Building a feed algorithm that would take into account who you follow and what tweets you have liked
- Creating the bases of a Neural Language Processing algorithm to categorize tweets and help for the feed algorithm

## Screenshot

!["Registration"](https://raw.githubusercontent.com/vbedardl/react-twitter-frontend/master/doc/TwitterScreencast_register.gif)

!["Tweet"](https://raw.githubusercontent.com/vbedardl/react-twitter-frontend/master/doc/TwitterScreencast_tweet.gif)

!["Like/Dislike & Follow/Unfollow"](https://raw.githubusercontent.com/vbedardl/react-twitter-frontend/master/doc/TwitterScreencast_like.gif)

!["Comment"](https://raw.githubusercontent.com/vbedardl/react-twitter-frontend/master/doc/TwitterScreencast_comment.gif)
