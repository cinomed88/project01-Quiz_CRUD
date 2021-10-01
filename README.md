# Project 01 - Quiz CRUD App (ver 2.0.0)

 [Live](https://lucaswgong.com/portfolio/01/) <- Click

 - Developed an online quiz app using `React` on the client-side and provided `RESTful API` on the server-side.
 - Built the React app using `Axios` to send HTTP requests, `React Router` for routing, and `Hooks API` to handle states.
 - Built CRUD API server using `Node.js` and `Express.js`, and database using `MySQL`.
 - Deployed in a web hosting server using `cPanel`.
 
 
 ## Skills used : React, Node.js, Express.js, MySQL, Material-UI
 
 
 ## Issues Solved
|Issue | Solution|
|:--|:--|
|Little Slow initiation | Changed the data retrieving structure, and used Axios instead of XMLHttpRequest|
|Worse UX (3 Pages) | Used React and React Router (SPA)|
|Wrong address hosting on router | added 'basename' prop on 'BrowserRouter' |
|'refresh' cannot find a proper page, 404 error | added .htaccess file with redirect option (Apache Server) |
|Can't cover various screen sizes and resolutions | Implement more detailed responsible design |
 
 
 ## In Progress Issues & Promising Solutions
|Issue | Solution|
|:--|:--|
|Difficult to collect data and deliver them to the upper component when making a scoring system | Apply Context API|
|Ambiguous data type (hard to debug when delivering data) | Use TypeScript|
|Worse SEO with SPA | Apply Next.js|


 ## Future Work: 
 
 - Add SignIn, SignUp function
 - More detailed exception handling (Especially in data communication)


 ## History

### 1. Ver 1.0.0 - Sep 2021
#### (1) Skills used
JavaScript, Node.js, MySQL/MariaDB, Bootstrap

#### (2) Feature
Users are able to read/create/edit/delete a quiz, solve the quiz, and get score. Provide REST API, Node.js server and MySQL Database. 

#### (3) Issues
Slow initial loading, Worse UX/UI (little slow page transition, not intuitive interface).

#### (4) Screen Shots
|Admin Page|Student Page|
|:--:|:--:|
| <img src="https://user-images.githubusercontent.com/45385949/134595623-8ae3c289-074b-4f90-83f3-fde225665de7.png" width="500"/> | <img src="https://user-images.githubusercontent.com/45385949/134595640-e2587775-9419-4b90-aab1-8d1dfe2a29f9.png" width="500"/> |

