/**
 * ImagenController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    async create(req, res) {

        req.file('imagen').upload({
            dirname: require('path').resolve(sails.config.appPath, 'media/images')
        }, function (err, uploadedFiles) {
            if (err) return res.serverError(err);

            var fn = uploadedFiles[0].fd.split('\\').slice(-1).pop().split('.')[0];

            Imagen.create({
                fileName: fn,
                description: uploadedFiles[0].fd
            }).then(data => console.log(data));

            return res.ok({ fileName: fn });
        });
    },
    async load(req, res){

        var fn = req.param('fileName');
        var img = await Imagen.find({where:{fileName: fn}});

        var SkipperDisk = require('skipper-disk');
        var fileAdapter = SkipperDisk();

        if (img[0]){
            res.set("Content-disposition", "attachment; filename='" + img[0].fileName + "'");

            fileAdapter.read(img[0].description)
                .on('error', function (err) {
                    return res.serverError(err);
                })
                .pipe(res);
        }else{
            return res.notFound("Imagen no encontrada");
        }

    }
};

