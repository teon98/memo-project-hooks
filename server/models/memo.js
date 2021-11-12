const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema(
  {
    memoID: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: false },
  },
  {
    timestamps: true,
    collection: "memos",
  }
);

memoSchema.statics.findAll = function () {
  return this.find({});
};

memoSchema.statics.create = function (payload) {
  const memo = new this(payload);
  return memo.save();
};

memoSchema.statics.findOneByMemoId = function (memoID) {
  return this.findOne({ memoID });
};

memoSchema.statics.updateByMemoID = function (memoID, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ memoID }, payload, { new: true });
};

memoSchema.statics.deleteByMemoID = function (memoID) {
  return this.remove({ memoID });
};

module.exports = module.exports = mongoose.model("memo", memoSchema);
