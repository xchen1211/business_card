# Business card online application 

Please note you may not be able to run the code directly because I have removed my AWS account information.

To see how the app works, check the demo here: https://youtu.be/mEs2sWRAzeQ

## Description:
This is a simple business card online application. A user can create his own business card in his account. He can create/read/update/delete his information, including name, age, birthday, job title, employer, city, email, phone number, and profile picture. There is also an admin of the application. As the admin, if he logs into the admin account, he can create/read/update/delete all users' information. He can see a table of all users' information, which can be sorted by age, job title, employer, or city. All the users can sign up/sign in/sign out.

## Tech stack:
React.js, Amazon AWS Lambda, Python Boto3, DynamoDB, Cognito, Amplify, S3.

The front end used React.js and the app is host on Amazon AWS. S3 was set up for profile picture upload, and Amplify and Cognito are used for users' sign up/sign in/sign out. 




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.




