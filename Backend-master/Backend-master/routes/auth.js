const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');


const { login, googleSignin, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post(
    '/login',
    [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],
login );


router.post('/google',[
    check('id_token', 'id_token es necesario').not().isEmpty(),
    
    validarCampos
],googleSignin );


router.get('/renew', validarJWT,revalidarToken);

module.exports = router;