const { Schema, model } = require('mongoose');

const PrestamoSchema = Schema({
    
    nombrevideo: {
        type: String,
        required: [true, 'El id del videobeam es obligatorio']
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    
}); 

PrestamoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
module.exports = model( 'Prestamo', PrestamoSchema );