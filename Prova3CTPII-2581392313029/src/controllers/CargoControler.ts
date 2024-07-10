import { Request, Response } from 'express';
import Cargo from '../models/Cargo';

class CargoController {
  async create(req: Request, res: Response) {
    try {
      const cargo = await Cargo.create(req.body);
      return res.status(201).json(cargo);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const cargos = await Cargo.find();
      return res.status(200).json(cargos);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const cargo = await Cargo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(200).json(cargo);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await Cargo.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Cargo deleted successfully' });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new CargoController();
