/**
 * EventoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    async list(req, res) {
        var wherefilter = {}
        var filter = { 
            skip: (req.param("page", 1) - 1) * req.param("limit", 10), 
            limit: req.param("limit", 10)
        }

        if (req.param("lat", null)) wherefilter["Lat"] = req.param("lat")
        if (req.param("lng", null)) wherefilter["Lon"] = req.param("lng")

        if (req.param("title", null))
            wherefilter["title"] = {'contains': req.param("title")}

        Evento.find({where: wherefilter, limit: filter.limit, skip: filter.skip})
        .then(data => { console.log(data); return res.ok(data) });
        
    },
    async create (req,res){
        const attributes = ['title', 'description', 'date', 'imagen']
        var obj = {}

        try {
            attributes.forEach(item => {
                obj[item] = Evento.validate(item, req.param(item, null));
            });

            obj['attendances'] = Evento.validate('attendances', req.param('attendances', 0));
            obj['willYouAttend'] = Evento.validate('willYouAttend', req.param('willYouAttend', false));
            
            var location = req.param('location', [null,null]);
            
            obj['Lat'] = Evento.validate('Lat', location[1]);
            obj['Lon'] = Evento.validate('Lon', location[0]);

        } catch (err) {
            return res.badRequest('Datos Inválidos');
        }
        
        var result = await Evento.create(obj).fetch();

        return res.ok(result.id);
    },
    async attend(req, res){
        
        var eventoid = req.param('id');
        if(!isNaN(eventoid)){
           var event = await Evento.find({where: {id: eventoid}});
            
           if(!event[0]) return res.notFound("Evento no encontrado")
            
            var user = req.session.userId;
            if(user){
                
                var attend = await Asistente.find({ where: { Evento: eventoid, Usuario: user } });
                if (attend[0]) return res.forbidden("Asistencia registrada anteriormente")
                else {
                    Asistente.create({ Evento: eventoid, Usuario: user }).then(
                        data => {
                            var attendances = event[0].attendances + 1;
                            Evento.update({ id: eventoid }).set({ attendances: attendances });

                            var response = { id: eventoid, attendances: attendances };
                            Evento.publishUpdate(eventoid, response);

                            return res.ok(response);
                        }
                    )
                }
            } else {
                return res.badRequest("Error al eliminar la asistencia al evento")
            }
            
        }else{
            res.status(406)
            return res.send("ID inválido")
        }
        
    },
    async deleteattend(req, res){
        
        var eventoid = req.param('id');
        if (!isNaN(eventoid)) {
            
            var event = await Evento.find({ where: { id: eventoid } });
            if (!event[0]) return res.notFound("Evento no encontrado")
            
            var user = req.session.userId;
            if (user) {
                
                var attend = await Asistente.find({ where: { Evento: eventoid, Usuario: user } });
                if (!attend[0]) return res.forbidden("Asistencia no registrada anteriormente")
                else {
                    Asistente.destroy({ Evento: eventoid, Usuario: user }).then(
                        data => {
                            var attendances = event[0].attendances - 1;
                            Evento.update({ id: eventoid }).set({ attendances: attendances });
                            
                            var response = { id: eventoid, attendances: attendances };
                            Evento.publishUpdate(eventoid, response);

                            return res.ok(response);
                        }
                    )
                }
            } else {
                return res.badRequest("Error al eliminar la asistencia al evento")
            }

        } else {
            res.status(406)
            return res.send("ID inválido")
        }
    },
    subscribe(req, res){
        console.log(eventos)
        Evento.find( function foundEventos(err, eventos){
            console.log(eventos)
            if(err) return next(err);

            Evento.subscribe(req.socket);

            Evento.subscribe(req.socket, eventos);

            return res.ok();
        })
    }
};

