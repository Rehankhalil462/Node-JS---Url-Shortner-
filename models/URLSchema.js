import mongoose from "mongoose";

const UrlsSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
  },
  urlId: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

export const URLModal = mongoose.model("URLModal", UrlsSchema);
