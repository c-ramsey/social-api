const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  // Add other fields as needed
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;

const express = require('express');
const router = express.Router();
const Reaction = require('../models/Reaction');

// POST a new reaction to a thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const newReaction = await Reaction.create(req.body);
    res.status(201).json(newReaction);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create reaction' });
  }
});

// DELETE a reaction
router.delete('/reactions/:id', async (req, res) => {
  try {
    const deletedReaction = await Reaction.findByIdAndDelete(req.params.id);
    if (!deletedReaction) {
      return res.status(404).json({ error: 'Reaction not found' });
    }
    res.json({ message: 'Reaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete reaction' });
 
  }
});