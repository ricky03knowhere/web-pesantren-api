'use strict';
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    desc: {
      type: Array
    },
    periode: {
      type: String
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const kegiatan = mongoose.model('Kegiatan', newSchema);
  return kegiatan;
};