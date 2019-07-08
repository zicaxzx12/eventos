/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    async create(req, res) {
        const attributes = ['firstName', 'lastName', 'email', 'password', 'gender'];
		var obj = {}
		
		var user = await Usuario.findOne({ email: req.param('email', null) });

		if (user)
			return res.forbidden('La cuenta con ese correo electrónico ya existe');

        try{
            attributes.forEach(item => {
                obj[item] = Usuario.validate(item, req.param(item, null));
            });
            
        }catch(err){
            return res.badRequest('Datos Inválidos');
        }
        var result = await Usuario.create(obj).fetch();

        return res.ok( result.id );
    },
    async login(req, res){

        var user = await Usuario.findOne({ email: req.param('email', null), password: req.param('password', null) });
        if(user) {
            req.session.userId = user.id;
            res.ok({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            });
        } else res.badRequest('Credenciales inválidas');
    },
    logout(req, res){
        
        delete req.session.userId;
        return res.ok();
    }
};
