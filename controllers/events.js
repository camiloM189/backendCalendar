const {response} = require('express');
const Eventos  = require('../model/Eventos')



const getEventos = async(req,res = response) => {
    const eventos = await mongoose.model('Eventos').find()
                    .populate('user','name')
                            
    res.json({
        ok:true,
        eventos


    });
    
}
const createEventos = async(req,res = response) => {



    const evento = new Eventos(req.body);




    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();
        res.json({
            ok:true,
            evento:eventoGuardado
    
    
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'no hablar con el admin'


        })
    }

   

}
const actualizarEventos = async(req,res = response) => {

    const eventoId = req.params.id;
    
    try {
        const evento = await mongoose.model('Eventos').findById(eventoId);
        const uid = req.uid

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg_:'Ese evento no existe',   
            })
        } 
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg_:'Usted no puede actualizar este evento ',
            })
        }

        const nuevoEvento = {
            ...req.body,
            user:uid,
         
        }
        
      const eventoActualizado = await Eventos.findByIdAndUpdate(eventoId, nuevoEvento,{new:true});

      res.json({
        ok:true,
        evento:eventoActualizado,
      })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg_:'hable con el admin',
    
    
        });
    }


  

}
const deleteElement = async(req,res = response) => {
    const eventoId = req.params.id;

    try {
        const evento = await mongoose.model('Eventos').findById(eventoId);
        const uid = req.uid

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg_:'Ese evento no existe',   
            })
        } 
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg_:'Usted no puede borrar este evento ',
            })
        }

       

      const BorrarEvento = await mongoose.model('Eventos').findByIdAndDelete(eventoId);

      res.json({
        ok:true,
    
      })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg_:'hable con el admin',
    
    
        });
    }


}

module.exports = {
    getEventos,
    actualizarEventos,
    createEventos,
    deleteElement,

}