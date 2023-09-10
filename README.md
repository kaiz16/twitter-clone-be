### Twitter Clone API

This is a Twitter Clone API application built using Node.js, Express.js, and Sequelize ORM. It is a REST API for a Twitter clone application that allows users to create accounts, post tweets, follow other users, and more.

### Project Structure

```
├── config                       # Configuration files
│   ├── db.config.js                # Database configuration
├── controllers                  # Controllers
│   ├── auth.controller.js          # Authentication controller
│   ├── follows.controller.js       # Follows controller
│   ├── likes.controller.js      # Likes controller
│   ├── replies.controller.js       # Replies controller
│   ├── tweets.controller.js      # Tweets controller
│   └── users.controller.js         # Users controller
├── db                           # Database related files
│   ├── migrations.dev.sql          # Database migrations (development)
│   └── migrations.prod.sql         # Database migrations (production)
├── middlewares                  # Middlewares
│   └── auth.middleware.js          # Authentication middleware
├── index.js                     # Express.js application entry point
├── models                       # Models
│   ├── Follow.js                   # Follow model
│   ├── Like.js                  # Like model
│   ├── Reply.js                    # Reply model
│   ├── Tweet.js                    # Tweet model
│   └── User.js                     # User model
├── routes                       # Routes
│   ├── auth.route.js               # Authentication routes
│   ├── follows.route.js            # Follows routes
│   ├── likes.route.js              # Likes routes
│   ├── replies.route.js            # Replies routes
│   ├── tweets.route.js             # Tweets routes
│   └── users.route.js              # Users routes
└── utils                        # Utility functions
    └── bcrypt.util.js              # Bcrypt utility functions
```

### Setting up the Application

This application uses MySQL database to store the data. You can use the `migrations.[stage].sql` file to create the required database and tables. By default, this app tries to connect to the database on `localhost` with the username `root` and password `sigma12345`. You can change these settings by editing the environment variables in the `.env.[stage]` file.

1. Setting up the database

   ```bash
   docker run --name=mysql-local-server -p 3306:3306 -e MYSQL_ROOT_PASSWORD=sigma12345 -d mysql:8.0
   ```

   Note: you might need to use sudo depending on your platform.

2. Follow the instructions in the `migrations.sql` file to create the database and tables.

3. Install dependencies

   ```bash
   npm install
   ```

4. Run the application

   ```bash
   npm run dev # For development
   npm run prod # For production
   ```

5. Test the application

   Do whatever you want to do with the application. Perhaps, create a really nice looking frontend for it and integrate it with the API? The sky is the limit!

### Testing the Routes

Following are the routes available in this application. You can use Postman or Insomnia to test these routes. Alternatively, you may use the `Insomnia_[date].json` file to import the collection into Insomnia and test the routes.

All routes require the `Authorization` header to be set with the `[token]` value. The token can be obtained by logging in.

- **POST /auth/login** - Login
- **POST /auth/register** - Register
<hr>

- **GET /users** - Get all users
- **GET /users/:id** - Get a single user
- **PUT /users/:id** - Update a user
- **DELETE /users/:id** - Delete a user
<hr>

- **GET /users/:userId/followers** - Get all followers of a user
- **GET /users/:userId/followings** - Get all followings of a user
- **POST /users/:userId/follow** - Follow a user
- **DELETE /users/follow/:id** - Unfollow a user

<hr>

- **GET /tweets** - Get all tweets
- **GET /tweets/:id** - Get a single tweet
- **POST /tweets** - Create a tweet
- **PUT /tweets/:id** - Update a tweet
- **DELETE /tweets/:id** - Delete a tweet

<hr>

- **GET /tweets/:tweetId/likes** - Get all likes of a tweet
- **POST /tweets/:tweetId/likes** - Like a tweet
- **DELETE /tweets/likes/:id** - Unlike a tweet

<hr>

- **GET /tweets/:tweetId/replies** - Get all replies of a tweet
- **POST /tweets/:tweetId/replies** - Reply to a tweet
- **PUT /tweets/:tweetId/replies/:id** - Update a reply
- **DELETE /tweets/replies/:id** - Delete a reply
