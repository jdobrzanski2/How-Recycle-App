## HOW RECYCLE WEB APP
* [Disclaimer](#disclaimer)
* [Team information](#team-information)
* [General info](#general-info)
* [Content](#content)
* [Instruction](#instruction)
   * [Technologies](#technologies)
   * [Third Party APIs](#third-party-apis)
   * [Step By Step Instruction](#step-by-step-instruction)

## Disclaimer
Project was re-uploaded with personal information/API keys removed. Parts of the project Joseph worked on include the menu system (menuFunctions.js, menu.html), Google Maps API functions (mapFunctions.js, testMapScripts.js), the bottle refund calculator (refundCalc.html, refundCalcFunctions.js), general code cleanup/documentation of all files, minor formatting corrections of pages, and other support files (supportFunctions.js)

## Team Information
| First Name    | Last Name     |
| ------------- |:-------------:|
| Joseph        | Dobrazanski   |
| Prabhjeet     | Sokhey        |
| Thi Thuy      | Le            |
| Jongsik       | Kim           |

## General Info
A group project for COMP2800 at BCIT, which let users find out how to get rid of their recycle items. They can find more information about the recycle items, depot location near by, direction to the depot from their current location. The app has a profile, favorite list of depot, depot information, menu page, help page, news page, refund calculator page. This repo is organized using a GitFlow Workflow structure. Merges to main from dev must be done through a pull request approved by another contributor. 

## Content
Content of the project folder
 Top level of project folder: 
* html     &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; &nbsp; # folder for html file
* images   &emsp; &emsp; &emsp;  &ensp;&ensp; &nbsp; # folder only for menu system images. [<sup>1</sup>](#1)
* script   &emsp; &emsp; &emsp; &emsp; &ensp;  &nbsp; # folder for javascript file 
* lib      &emsp;&emsp;&emsp;&emsp;&emsp; &emsp; &emsp; # library will use
* resource &emsp; &emsp; &emsp; &emsp; # folder for image, video, audio [<sup>1</sup>](#1)
* routes   &emsp; &emsp; &emsp; &emsp; &emsp;# library and function for search page
* style    &emsp;&emsp; &emsp; &emsp; &emsp; &nbsp; &nbsp;# folder for stylesheet, css file
* test     &emsp; &emsp; &emsp; &emsp;&emsp;&emsp;&ensp;# folder for test files for app. Test plan can be found at: https://docs.google.com/spreadsheets/d/1XOZlptafdUSi7ySqCt-soiZbWpuQc3cBgyH9UVpyX7w/edit?usp=sharing
* .gitignore &emsp; &emsp; &emsp;&emsp; # Git ignore file
* README.md
* 404.html   &emsp; &emsp; &emsp; &emsp; # Firebase hosting file for when a page is not found
* index.html  &emsp;&emsp;&emsp;&emsp; # Firebase hosting landing page
* Other files of this hierarchy level used for firebase app hosting  


## Instruction
### Technologies
Technologies were used for this project
* HTML, CSS
* JavaScript
* jQuery
* NodeJS
* Bootstrap
* PixiJS
* Firebase
* Selenium

### Third party API
* Google Map API (no installation required)
* Twitter API (no installation required)
* Firebase API (use your Gmail account to access Firebase database (https://firebase.google.com/), Firebase hosting covered below)

### Step By Step Instruction
For the following instructions, assume installation location is unimportant, and version to be latest stable version unless otherwise specified. Assume a Windows work environment.
1. Install Visual Studio Code (VSC) IDE for Windows from: https://code.visualstudio.com/download
2. Install Git according to the following document: https://drive.google.com/file/d/1mX0fmblifAuLAEWRVYvvs8tOep3zrdhH/view?usp=sharing 
3. (Optional) Install Sourcetree according to the following URL: https://www.sourcetreeapp.com/ 
4. Install nodeJS, latest LTS version for Windows from: https://nodejs.org/en/download/
5. Install Selenium for Chrome (used for unit testing), latest version, from: https://www.selenium.dev/selenium-ide/ 
6. Create a folder to keep the project repo in
7. Open command line in that folder (e.g. type "cmd" in address bar of a file explorer opened in that folder)
8. Type the following in command line: git clone https://github.com/pinodo/COMP-2800-Team-BBY-29-How-Recycle.git
9. Open VSC IDE
10. Open the folder containing the project: File > Open Folder > [navigate to folder you cloned repo into] > [go into “COMP-2800-Team_BBY-29-How-Recycle” folder] > Select Folder
11. Open terminal in VSC: Terminal > New Terminal
12. Ensure nodeJS is up to date and install inside the (version 6.14.9 or newer) by running the following in command line: npm install -g npm 
13. Install firebase hosting tools by running the following in command line: npm install -g firebase-tools
14. Ensure you have the latest versions of main and dev branches by typing the following into the VSC terminal:
git pull origin main
git checkout dev
git pull origin dev
15. Create additional feature branches from dev by typing the following into the VSC ternimal:
git checkout dev
git checkout -b [name of your branch] dev 
16. The Firebase API was stored under script/firebase_api.js, change this if you work with other firebase databases
17. The Google Map API key is: AIzaSyDnKbz8jwM2MR8J5u16wM8VORnkWDmaYiw
18. The Twitter API key is stored under script/twitter.js 
19. jQuery 3.2.1 or newer, Bootstrap 5.0.0 or newer, Firebase app / auth / firestore 8.0.0 or newer, and Firebase UI 3.5.2 or newer are used and included as <script src="..."></script> (see bottom of <body> of html/index.html for example usage)
20. Start developing the app

# Others
<a id = "1"><sup>1</sup></a> All the images, video, audio information was used can be found at : https://docs.google.com/document/d/18KM4Na7CDSAgHgLOMyF4kJU254vvO_qGMWZwpUnFldM



