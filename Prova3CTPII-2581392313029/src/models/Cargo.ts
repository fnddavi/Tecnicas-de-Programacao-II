import mongoose, { Schema, Document } from "mongoose";

interface Cargo extends Document {
  cbo: string;
  descricao: string;
}

const CargoSchema: Schema = new Schema({
  cbo: { type: String, required: true, 
    match: /^[0-9]{4}-[0-9]{2}$/ },

  descricao: { type: String, 
    required: true },
});

export default mongoose.model<Cargo>("Cargo", CargoSchema);
