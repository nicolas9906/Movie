const { response } = require('express');
const { restart } = require('nodemon');
const agregar = require('../models/agregar');



const Agregar = require('../models/agregar');


const getAgregar = async(req,res=response)=>{
    const agregar= await Agregar.find()
    .populate('user','name');
    res.json({
        ok:true,
        agregar
    })
}


const crearAgregar = async( req, res=response)=>{
    const agregar = new Agregar(req.body);

    try{

    agregar.user= req.uid;


    const agregarGuardado = await agregar.save();

        res.json({
            ok:true,
            msg:'se agrego?',
            agregar: agregarGuardado
        })

    } catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'algo mal en el agregar/hable con el admin'
        });
    }
    
}


const actualizarAgregar = async(req,res = response) =>{
    const agregarId= req.params.id;
    const uid=req.uid;

    try {
        const agregar = await Agregar.findById(agregarId);
        
        if(!agregar){
            return res.status(404).json({
                ok:false,
                msg:'agregar no existe con ese id'
            });

        }

        if(agregar.user.toString() !==uid){
            return res.status(401).json({
                ok:false,
                msg: ' no tiene privilegios de editar este evento'
            });
        }
        const nuevoAgregar={
            ...req.body,
            user:uid
        }

        const agregarActualizado = await Agregar.findByIdAndUpdate(agregarId,nuevoAgregar,{new:true});
        
        res.json({
            ok:true,
            agregar: agregarActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con el admin/actualizar agregar'
        })
    }
}


const eliminarAgregar =async ( req, res = response)=>{
    const agregarId= res.params.id;
    const uid= req.uid;
    try {
        const agregar= await Agregar.findById(agregarId);
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg: 'agregar no existe por ese id'
            });

        }

        if( evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'no tiene privilegio de eliminar este evento'
            });
        }
        
        await Agregar.findByIdAndDelete(agregarId);
        res.json({
            ok:true,
            msg:'evento eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con el administrado/ eliminar'
        })
    }
}


module.exports={
    crearAgregar,
    getAgregar,
    actualizarAgregar,
    eliminarAgregar
}