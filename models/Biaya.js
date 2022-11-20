'use strict';
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    desc: {
      type: String
    },
    price: {
      type: Number
    },
    type: {
      type: String
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const Biaya = mongoose.model('Biaya', newSchema);
  return Biaya;
};