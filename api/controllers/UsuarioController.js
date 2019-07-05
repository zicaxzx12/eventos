/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var helper = include('../helpers')

module.exports = {
  
    async create(req, res) {
        const attributes = ['firstName', 'lastName', 'email', 'password', 'gender'];
		var obj = {}
		
		var user = await Usuario.findOne({ email: req.params(e, null) });

		if (user)
			return res.forbidden('La cuenta con ese correo electrónico ya existe');

        try{
            attributes.forEach(e => {
                obj[e] = Usuario.validate(e, req.params(e, null));
            });
            
        }catch(err){
            return res.badRequest('Datos Inválidos');
        }
        return helper.serialize(await Usuario.create(obj).then(data => { return res.ok(data); }).fetch() );
    },
    async login(req, res){

        var user = await Usuario.findOne({ email: req.params('email', null), password: req.params('password', null) });
        if(user) {
            
        } else res.badRequest('Credenciales inválidas');
    }
};
