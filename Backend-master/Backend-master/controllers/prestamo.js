const { response } = require('express');
const { restart } = require('nodemon');


const Prestamo = require('../models/prestamo');


const getPrestamo = async(req,res=response)=>{
    const prestamo= await Prestamo.find()
    .populate('user','nombre');
    res.json({
        ok:true,
        prestamo
    })
}


const crearPrestamo = async( req, res=response)=>{
    const prestamo = new Prestamo(req.body);

    try{

    prestamo.user= req.uid;


    const prestamoGuardado = await prestamo.save();

        res.json({
            ok:true,
            msg:'se presto?',
            prestamo: prestamoGuardado
        })

    } catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'algo mal en el prestamo/hable con el admin'
        });
    }
    
}


const actualizarPrestamo = async(req,res = response) =>{
    const prestamoId= req.params.id;
    const uid=req.uid;

    try {
        const evento = await Prestamo.findById(prestamoId);
        
        if(!prestamoId){
            return res.status(404).json({
                ok:false,
                msg:'prestamo no existe con ese id'
            });

        }

        if(prestamoId.user.toString() !==uid){
            return res.status(401).json({
                ok:false,
                msg: ' no tiene privilegios de editar este evento'
            });
        }
        const nuevoPrestamo={
            ...req.body,
            user:uid
        }

        const prestamoActualizado = await Prestamo.findByIdAndUpdate(prestamoId,nuevoPrestamo,{new:true});
        
        res.json({
            ok:true,
            prestamo: prestamoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con el admin/actualizar evento'
        })
    }
}


const eliminarPrestamo =async ( req, res = response)=>{
    const prestamoId= res.params.id;
    const uid= req.uid;
    try {
        const prestamo= await Prestamo.findById(prestamoId);
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg: 'Prestamo no existe por ese id'
            });

        }

        if( evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'no tiene privilegio de eliminar este evento'
            });
        }
        
        await Prestamo.findByIdAndDelete(prestamoId);
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
    crearPrestamo,
    getPrestamo,
    actualizarPrestamo,
    eliminarPrestamo
}