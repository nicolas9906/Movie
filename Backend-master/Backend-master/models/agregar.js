const { Schema, model } = require('mongoose');

const AgregarSchema = Schema({
    
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    img: {
        type: String,
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }


    
}); 

// imagneSchema.methods.setImg= function setImg (){

// }

AgregarSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
module.exports = model( 'Agregar', AgregarSchema );