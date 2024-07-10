import { Router } from 'express';
import FuncionarioController from '../controllers/FuncionarioControler';
import MensalistaController from '../controllers/MensalistaControler';
import CargoController from '../controllers/CargoControler';

const router = Router();

router.post('/funcionarios', FuncionarioController.create);
router.get('/funcionarios', FuncionarioController.list);
router.put('/funcionarios/:id', FuncionarioController.update);
router.delete('/funcionarios/:id', FuncionarioController.delete);

router.post('/mensalistas', MensalistaController.create);
router.get('/mensalistas', MensalistaController.list);
router.put('/mensalistas/:id', MensalistaController.update);
router.delete('/mensalistas/:id', MensalistaController.delete);

router.post('/cargos', CargoController.create);
router.get('/cargos', CargoController.list);
router.put('/cargos/:id', CargoController.update);
router.delete('/cargos/:id', CargoController.delete);

export default router;
