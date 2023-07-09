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
    // Sync the models with the database
    syncModels();
    // Start the server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the MongoDB database:', error);
  });

// Import the models
const User = require('./models/User');
const Thought = require('./models/Thought');
const Reaction = require('./models/Reaction');

// Sync the models with the database
const syncModels = async () => {
  try {
    await User.syncIndexes();
    await Thought.syncIndexes();
    await Reaction.syncIndexes();
    console.log('Models synced with the database');
  } catch (error) {
    console.error('Error syncing models with the database:', error);
  }
};

// Import and use the route files
const usersRoutes = require('./routes/users');
const thoughtsRoutes = require('./routes/thoughts');
const reactionsRoutes = require('./routes/reactions');

app.use(usersRoutes);
app.use(thoughtsRoutes);
app.use(reactionsRoutes);



