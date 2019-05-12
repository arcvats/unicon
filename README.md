# Unicon

A simple way to connect, create ideas and meetups, and collaborate between different departments in a college. (For live demo visit: [http://uniconrides.herokuapp.com/](http://uniconrides.herokuapp.com/))

## Screenshots

### Screen One: Landing Page

![landing page](/screens/landing.png)

### Screen Two: Signup Page

![signup page](/screens/signup.png)

### Screen Three: Profile Page

![profile page](/screens/profile.png)

### Screen Four: Idea Page

![idea page](/screens/idea.png)

### Screen Five: Find Collaborators

![collaborators page](/screens/collaborators.png)

### Screen Six: Pending Requests

![pending requests](/screens/requests.png)

### Screen Seven: Community & Meetups

![community page](/screens/meetups.png)

## Prerequisites

- MongoDB (For MongoDB installation instructions click [here](https://docs.mongodb.com/manual/installation))
- Node.js (For Node installation instructions click [here](https://nodejs.org/en/download/))
- NPM

## Installation

Clone or download the repository and run-

`npm install`

## Config

In the config.js file-

```json
{
    "port": "port for server",
    "database": {
          "local": "mongodb://url/unicon",
          "production": "url"
    },
    "rideshare_api": "url if rideshare feature is needed",
    "secret": "secret for jwt"
}
```

## Usage

After installation and configuration run:

`node index.js`

## Built Using

Node.js, Express.js, Angular.js, MongoDB, Mongoose, Gulp, Stylus and Bulma CSS

## Contributing

1. Fork or Clone the repository.
2. Do the changes.
3. Submit Pull Request.

## License

[MIT](/LICENSE)