const mongoose = require('mongoose');

const memoSchema = new mongoose.Schema({
  index: { type: String, default: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: false }
},
{
  timestamps: true,
  collection: 'memos'
}, );

memoSchema.statics.findAll = function () {
  return this.find({});
};

memoSchema.statics.create = function (payload) {
  try {
  const memo = new this(payload);
  return memo.save();
  } catch (err){
    return err;
  }
};

memoSchema.statics.update = function (index) {
  try {
  const memo = new this(index);
  return memo.save();
  } catch (err){
    return err;
  }
};

memoSchema.statics.delete = function (index) {
  return memo.remove({ index });
};
module.exports = module.exports = mongoose.model('memo', memoSchema);