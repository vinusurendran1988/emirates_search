# Emirates Flight Status Search Page
A responsive webpage for tracking the status of flights for a selected route on a given date.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Assumptions
 - Flight-status API has a CORS error while accessing it form localhost. For a development I have used a proxyserver to access the API. From the Github code, I removed the proxy and used the API as it is given. Please consider that if you are running the code your side.
 - I assume the flights status are returned for single leg. Multi leg routes are not handled in my code. Couldn't find out such decord in API too.

## Comments
- Unit testing is not included in the code due to lack of time. I had some commitments in office and worked over the weekend to meet the deadline. 
- Responsiveness, Validations and Fallbacks are handled.
- Theming also not handled perfectly because it requires more time. There are inline CSS written in some places.


## How to run the app
In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
