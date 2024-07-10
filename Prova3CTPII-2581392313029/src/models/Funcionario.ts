import mongoose, { Schema, Document } from 'mongoose';

interface ValidatorProps {
  value: string;
}

interface Funcionario extends Document {
  nome: string;
  idade: number;
  email: string;
  fone: string;
}

const ddds = [11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,34,35,37,38,41,42,
43,44,45,46,47,48,49,51,53,54,55,61,62,63,64,65,66,67,68,69,71,73,74,75,77,79,81,82,
83,84,85,86,87,88,89,91,92,93,94,95,96,97,98,99];

const FuncionarioSchema: Schema = new Schema({
  nome: { type: String, required: true },
  idade: { type: Number, required: true, min: 14 },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[^\s@]+@(adm|fiscal|dev)\.xpto\.tec\.br$/ 
  },
  fone: { 
    type: String, 
    required: true, 
    match: /^\d{10,11}$/, 
    validate: {
      validator: function(v: string) {
        return ddds.includes(parseInt(v.substring(0, 2)));
      },
      message: (props: ValidatorProps) => `${props.value} não é um DDD válido!`
    } 
  }
});

export default mongoose.model<Funcionario>('Funcionario', FuncionarioSchema);