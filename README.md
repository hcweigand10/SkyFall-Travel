# SkyFall-Travel

![badgeImg](https://shields.io/badge/license-MIT-green)
## Table of Contents
- [Description](#description)
- [Authors](#authors)
- [Github Link](#github-link)
- [Installation](#installation)
- [Usage](#usage)
- [Test](#test)
- [How to Contribute](#contribute)
- [Resources](#resources)

## Description

Instead of having to manually enter your team information into a Excel sheet that can be easily lost or altered, you can use this application to store the data of your employees into a database using the Employee Tracker App. This program allows users to choose what they want to do then easily display or store the desired information into a sql database. The data is stored forever on the database and will not be lost unless completely deleted. Once the user has completed what they want to do, they can choose the exit option to exit from the application.

THis project allowsed me to better understand sql and how to manipulate database data. I learned to then combine Inquirer to listen for user input and to then store that data into the database using SQL commands. The main issue I encountered while completing this project was fully understanding JOIN and how to implement that to get the desired data to display. Additionally, it took extra effort to understand how to connect SQL and inquirer since it was a new concept for me and I could not get user input to save. Once I understood this better, the project was easily completed since the user input could be saved. 

In the future, I want to add more style to make the application more appealing to the eye because currently the only display is the main menu option. Adding a title with the cFonts package or ascii-art package would be a nice addition. Additionally I plan to add more options for users to choose from such as updating the employees manager, deleting roles, departments, and employees, or to view employees by department. 
## Author 
- Takara Truong

## Github Link

* https://github.com/truont2/Employee-Tracker-App

## Installation

To install this application:
1. clone the necessary files in the github repository.
2. Open up the terminal in the index.js file where you will enter npm install. This will install the necessary packages needed to run this application. 
3. Application is ready to be used. Refer to the Usage section for futher instructions.

## Usage

The application will be invoked by using the following command:

```bash
node index.js
```

1. First download any dependencies by opening your index,js terminal and entering "npm install". 
2. Once completed, you must enter mysql -u root -u and then provide your password for mysql. MySQL must be already downlaoded for this to work. If not donwloaded, go here: https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide 
3. Once completed, in the terminal, type "SOURCE db/schema.sql then db/seeds.sql. This initializes the database compnay_db to be used. 
4. enter node index.js to run the application. 
5. Choose one of the available options provided in the list and answer any questions that come up to complete the task.
6. Terminal will display a text to notifying the user that the desired task they chose has been completed altering the database in any way. If a user chooses to view data, a table will appear in the console.

### Video Walkthrough: 

This video shows the steps to install any packages and run the application after the reposition has been cloned.

Set up Database
![video walkthrough](./assets/sql.gif)

Use the application: 
![video walkthrough](./assets/functionality.gif)

## Test 

screenshot of some options to choose from:

![screenshot](./assets/mainMenu.PNG)
![screenshot](./assets/allemployees.PNG)
![screenshot](./assets/roles.PNG)

## Contribute

To contribute, contact me at https://github.com/truont2/

## Resources 

* https://www.youtube.com/watch?v=p3qvj9hO_Bo&t=1575s
* https://www.youtube.com/watch?v=L72fhGm1tfE
