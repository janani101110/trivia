//imports Mongoose library
const mongoose = require("mongoose");

//define the structure of documents (key, value pairs) in MongoDB database
const projectpostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    project_name: {
      type: String,
      required: true,
    },
    components: {
      type: String,
      required: true,
    },
    objectives: {
      type: String,
      required: true,
    },
    intro: {
      type: String,
      required: true,
    },
    project_photo: {
      type: String,
      required: true,
    },
    project_video:{
      type: String,
      required: true,
      //unique: true
  },
    explanation: {
      type: String,
      required: true,
    },
    circuit_diagram: {
      type: String,
      required: true,
    },
    pcb_design: {
      type: String,
      required: true,
    },
    git_link: {
      type: String,
      required: true,
    },
   /* time:{
      type:Date,
      default: Date.now,
    },*/
    approved: {
      type: Boolean,
      default: false,
    },

  },
  { timestamps: true } // additional 2 fields fore createdAt and updatedAt
); 

//Create Mongoose model as Projectpost based on the projectpostSchema
module.exports = mongoose.model("Projectpost", projectpostSchema);
