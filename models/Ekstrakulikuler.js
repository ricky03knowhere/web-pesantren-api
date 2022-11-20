'use strict';
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    name: {
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
  const Ekstrakulikuler = mongoose.model('Ekstrakulikuler', newSchema);
  return Ekstrakulikuler;
};