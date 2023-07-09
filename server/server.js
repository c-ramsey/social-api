// Import required packages
const express = require('express');
const mongoose = require('mongoose');

// Create the Express app
const app = express();

// Set up the port
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log('Connected to the MongoDB database');
    // Start the server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the MongoDB database:', error);
  });
