var express = require('express');
var router = express.Router();
const jfs = require("jsonfile");
var middleware = require("../middleware.js");

/* GET usuarios. */
router.get('/',middleware.checkToken, function(req, res, next) {
    let data= jfs.readFileSync('./JSON/usuario.json','utf8');
    console.log(data);
    res.send(data);
});

/* GET usuario por id*/
router.get('/:idUsuario', middleware.checkToken , function (req, res) {
    var idusuario = req.params.idUsuario;
    var temp;
    console.log(idusuario);

    let data= jfs.readFileSync('./JSON/usuario.json','utf8');

    data.forEach(searchById);

    function searchById(value, index, array){
      
        if(value.id==idusuario){
         console.log(value)
         temp=value;
      }
    }
    res.send(temp);
  });

  /* POST usuario*/
  router.post('/', middleware.checkToken, function (req, res){

    let dataJSON=jfs.readFileSync('./JSON/usuario.json','utf8')
    let idTemp=1;

    dataJSON.forEach(conteo);

    function conteo(value, index, array){
      idTemp++;
    }

    console.log("El id del siguiente elemento es: "+ idTemp);

    let data= JSON.stringify(dataJSON);
    var jsonTR=req.body;

    jsonTR["id"]=idTemp;

    var newTR=JSON.stringify(jsonTR);
    data=data.slice(0, data.length-1);
    data=data+", "+ newTR+"]";
    console.log(data);

    jfs.writeFile('./JSON/usuario.json', JSON.parse(data), function (err) {
      console.log(err);
    });

    res.send(JSON.parse(data));
  });

  /* PUT usuario por id */
  router.put('/:idUsuario', middleware.checkToken,function (req, res) {

    var idusuario = req.params.idUsuario;
    var inp=req.body;
    console.log(idusuario);

    let data= jfs.readFileSync('./JSON/usuario.json','utf8');

    data.forEach(searchById);

    function searchById(value, index, array){
      if(value.id==idusuario){

        console.log(value)

        if(inp.nombre!=null){
          value.nombre=inp.nombre;
        }

        if(inp.email!=null){
          value.email=inp.email;
        }

        if(inp.username!=null){
          value.username=inp.username;
        }

        if(inp.password!=null){
          value.password=inp.password;
        }

        if(inp.compras!=null){
          value.compras=inp.compras;
        }

        if(inp.facturas!=null){
          value.facturas=inp.facturas;
        }
      }
    }

    jfs.writeFile('./JSON/usuario.json', data, function (err) {
      console.log(err);
    });
    res.send(data)
  })

  /* DELETE usuario*/
  router.delete('/:idUsuario', middleware.checkToken,function (req, res) {

    var idusuario = req.paramss.idUsuario;

    let data= jfs.readFileSync('./JSON/usuario.json','utf8');
    let final =new Array();

    data.forEach(searchByIdDelete);

    function searchByIdDelete(value, index, array){
      
        if(value.id!=idusuario){
        final.push(value);
      }
    }

    jfs.writeFile('./JSON/usuario.json', final, function (err) {
      console.log(err);
    });

    res.send(final);
  })

module.exports = router;
