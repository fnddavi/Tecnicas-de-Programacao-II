import { Request, Response } from 'express';
import Mensalista from '../models/Mensalista';

class MensalistaController {
  async create(req: Request, res: Response) {
    try {
      const mensalista = await Mensalista.create(req.body);
      return res.status(201).json(mensalista);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const mensalistas = await Mensalista.find();
      return res.status(200).json(mensalistas);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const mensalista = await Mensalista.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(200).json(mensalista);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await Mensalista.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Mensalista deleted successfully' });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new MensalistaController();
