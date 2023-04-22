const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');


const { isDate } = require('../helpers/isDate')
const {crearPrestamo, getPrestamo, actualizarPrestamo, eliminarPrestamo}= require('../controllers/prestamo');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(validarJWT);

// {{url}}/api/Videobeam


//obtener prestamo
router.get('/',getPrestamo);


//crear un prestamo

router.post('/',[
    check('nombrevideo', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom(isDate),
    check('end','fecha de fin es obligatoria').custom(isDate),
    validarCampos
],
crearPrestamo)   
   

//actualizar prestamo
router.put(
    '/:id',
   [ check('nombrevideo', 'El nombre de usuario es obligatorio').not().isEmpty(),
    
    check('start', 'Fecha de inicio obligatoria').custom(isDate),
    check('end','fecha de fin es obligatoria').custom(isDate),
    validarCampos
],
actualizarPrestamo
);


//eliminar prestamo

router.delete('/:id', eliminarPrestamo)

module.exports = router;