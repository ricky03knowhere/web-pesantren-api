'use strict';
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    title: {
      type: String
    },
    author: {
      type: String
    },
    genre: {
      type: String
    },
    desc: {
      type: String
    },
    picture: {
      type: String
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const Kitab = mongoose.model('Kitab', newSchema);
  return Kitab;
};