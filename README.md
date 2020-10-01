# OAuth-2.0-with-Google
Demonstrate the usage of OAuth 2.0 framework to access the resources made available by the Google Authorization Server. The Resource Server is developed using Node JS with the help of middleware library called 'Passport JS'. Frontend web application is developed using React JS. MongoDB is used as the database.

# How to deploy the project

1. Install Node JS and MongoDB, if you do not have them in your machine.
2. Clone this repository to your machine.(git clone <repository url>)
3. Copy the **'credentials.json'** file inside the zip file uploaded to Courseweb.
4. Paste it inside **'OAuth-2.0-with-Google/Services/config'** folder.
5. Open command prompt and go inside 'Services' folder of cloned repository.
6. Run **'npm install'** command.
7. After that run **'npm run server'** command.
8. Open another command prompt and go inside 'Client' folder.
9. Run **'npm install'** command.
10. After that run **'npm run dev'** command and go to the link displayed in the command prompt after running the command.
11. Click the 'Google' button to initiate OAuth flow in the application.

**Enter the Time field in reservation form as 'time' 'space' 'am' or 'pm' (10.30 am / 10.30 pm)**
