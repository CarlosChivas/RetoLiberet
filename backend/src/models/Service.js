const { Schema, model } = require("mongoose");

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" }
}, {
  writeConcern: {
    j: true,
    wtimeout: 10000
  }
});

module.exports = model("Service", ServiceSchema);