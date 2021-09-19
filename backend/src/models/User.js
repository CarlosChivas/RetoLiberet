const { Schema, model } = require("mongoose");


const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true/*, unique: true*/ },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  credits: { type: Number, required: true },
}, {
  writeConcern: {
    j: true,
    wtimeout: 10000
  }
});

module.exports = model("User", UserSchema);