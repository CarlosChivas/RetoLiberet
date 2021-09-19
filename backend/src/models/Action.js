const { Schema, model } = require("mongoose");

const ActionSchema = new Schema({
  name: { type: String, required: true },
  client: { type: Schema.Types.ObjectId, ref: "User" },
  cost: { type: Number, required: true },
}, {
  writeConcern: {
    j: true,
    wtimeout: 10000
  },
  timestamps: () => Date.now()
});

module.exports = model("Action", ActionSchema);