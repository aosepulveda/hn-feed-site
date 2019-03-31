const mongoose = require('mongoose');

// blueprint
const feedSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  deleted: { type: Boolean, required: false }
});

// export model
module.exports = mongoose.model('Feed', feedSchema);
