const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');



const {crearAgregar, getAgregar, actualizarAgregar, eliminarAgregar}= require('../controllers/agregar');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(validarJWT);

// {{url}}/api/agregar


//obtener agregar
router.get('/',getAgregar);


//crear un agregar

router.post('/',[
    check('nombre','nombre de dispositivo es  obligatorio').not().isEmpty(),
    check('descripcion','descripcion de dispositivo es  obligatorio').not().isEmpty(),

    validarCampos
],
crearAgregar)   
   

//actualizar agregar
router.put(
    '/:id',
   [check('nombredispositivo','nombre de dispositivo es  obligatorio').not().isEmpty(),
   check('descripcion','descripcion de dispositivo es  obligatorio').not().isEmpty(),

    validarCampos
],
actualizarAgregar
);


//eliminar agregar

router.delete('/:id', eliminarAgregar)

module.exports = router;