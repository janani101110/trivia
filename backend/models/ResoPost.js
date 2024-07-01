const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");

const ResoPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
    pdf: {
      type: String,
      required: false,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
      required: false 
    },
    categories: {
      type: [String],
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    rejected: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResoPost", ResoPostSchema);
