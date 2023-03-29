const { Router } = require('express');
const { check } = require('express-validator');
const { getEventos, createEventos, actualizarEventos, deleteElement } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-json-jwt');

const router = Router();

router.use(validarJWT)

router.get('/',getEventos);

router.post('/',[
    check('title','El titulo es obligatorio').not().notEmpty(),
    check('start','La Fecha de inicio es obligatoria').custom(isDate),
    check('end','La Fecha de finalizacion es obligatoria').custom(isDate),

    validarCampos


]

    
,createEventos);

router.get('/:id',actualizarEventos);

router.delete('/:id',deleteElement)




module.exports = router;


