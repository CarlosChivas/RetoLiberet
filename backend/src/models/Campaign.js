const { Schema, model } = require("mongoose");

const CampaignSchema = new Schema({
    name: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: "User" },
}, {
  writeConcern: {
    j: true,
    wtimeout: 10000
  },
  timestamps: () => Date.now()
});

module.exports = model("Campaign", CampaignSchema);