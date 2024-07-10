import { Request, Response } from 'express';
import Funcionario from '../models/Funcionario';


class FuncionarioController {
  async create(req: Request, res: Response) {
    try {
      const funcionario = await Funcionario.create(req.body);
      return res.status(201).json(funcionario);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const funcionarios = await Funcionario.find();
      return res.status(200).json(funcionarios);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const funcionario = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(200).json(funcionario);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await Funcionario.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Funcionario deleted successfully' });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new FuncionarioController();
