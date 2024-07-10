import mongoose, { Schema, Document } from 'mongoose';
import Funcionario from './Funcionario';

interface Mensalista extends Document {
  matricula: string;
  salario: number;
  funcionario: mongoose.Types.ObjectId;
}

const MensalistaSchema: Schema = new Schema({
  matricula: { type: String, 
    required: true,
    unique: true },

  salario: { type: Number,
    required: true,
    min: 0.01 },

  funcionario: { 
    type: mongoose.Types.ObjectId, 
    ref: 'Funcionario', 
    required: true, 
    unique: true,
    validate: {
      validator: async function(value: mongoose.Types.ObjectId) {
        const count = await mongoose.model('Funcionario').countDocuments({ _id: value });
        return count > 0;
      },
      message: 'Funcionario não encontrado.'
    }
  }
});

export default mongoose.model<Mensalista>('Mensalista', MensalistaSchema);
