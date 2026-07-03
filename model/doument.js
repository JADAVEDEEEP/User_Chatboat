const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
     
    fileName: {
      type: String,
      required: true,
    },
    chunkIndex: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Document", DocumentSchema)