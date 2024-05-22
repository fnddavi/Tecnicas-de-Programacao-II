import mongoose, { Schema } from "mongoose";

/*
const mongoose = require("mongoose");
const Schema = mongoose.Schema; também funciona
*/

// CPF Validator
function isValidCPF(value: string) {
  if (typeof value !== "string") {
    return false;
  }

  value = value.replace(/[^\d]+/g, "");

  if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) {
    return false;
  }

  const values = value.split("").map((el) => +el);
  const rest = (count: number) =>
    ((values
      .slice(0, count - 12)
      .reduce((soma, el, index) => soma + el * (count - index), 0) *
      10) %
      11) %
    10;

  return rest(10) === values[9] && rest(11) === values[10];
}

const userSchema = new Schema({
  user_cpf: {
    type: String,
    validate: [isValidCPF, "Invalid CPF"],
    required: true,
    unique: true,
  },
  user_nome: { type: String, required: true },
  user_usuario: { type: String, required: true, unique: true },
  user_password: { type: String, required: true, select: false },
  user_created_at: { type: Date, default: Date.now },
  user_updated_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

const estadoSchema = new Schema({
  est_nome: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Estado = mongoose.model("Estado", estadoSchema);
module.exports = Estado;

const cidadeSchema = new Schema({
  cid_nome: { type: String, required: true },
  cid_est_id: { type: Schema.Types.ObjectId, ref: "Estado", required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Cidade = mongoose.model("Cidade", cidadeSchema);
module.exports = Cidade;

const aoiSchema = new Schema({
  aoi_cid_id: { type: Schema.Types.ObjectId, ref: "Cidade", required: true },
  area_km2: { type: Number, required: true },
  geom: { type: String, required: true }, // Assuming geometry is stored as a string (e.g., GeoJSON)
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Aoi = mongoose.model("Aoi", aoiSchema);
module.exports = Aoi;
