// Import the router
const apiRoutes = require('express').Router();

// Put your routes here
apiRoutes.all('*', (req, res) => {
  res.status(200).json({message: 'Welcome to the api!'});
})


// Export the router
module.exports = apiRoutes;
