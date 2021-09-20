# useUser

## Features

`useUser` composable can be used to:
- manage user authentication
- manage authentication data

## API

- `user` - main data object

- `logIn` - function to sign in the user and associate/fetch user's cart if successful. It requires the following params:
  - `username: string`
  - `password: string`

- `logOut` - function to sign out the user and remove current cart from browser's session.

- `register` - function to register a new user. It requires the following params:
  - `email: string`
  - `password: string`

- `changePassword` - function to change password of current user. It requires the following params:
  - `newPassword: string`
