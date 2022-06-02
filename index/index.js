const mongoose = require('mongoose');
var app=require('express')();
mongoose.connect('mongodb://127.0.0.1:27017/movies',{
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log('CONECTADO A MONGO'))
.catch((e)=>console.log('El error de conexión'+e))

const peli_schema= mongoose.Schema({
    nombre: String,
    protagonista: String,
    año:Number,
    sinopsis: String,
    },
);
const peli_model = mongoose.model('peliculas',peli_schema)

var express =require('express');
app.use(express.urlencoded({extended:false}));
app.listen(8181,'148.213.177.195', function(){
    console.log('Servidor listo');
});
var peli;

app.get('/',async(req,res)=>
{  
    res.sendFile(__dirname+'/index.html');
});
app.get('/agregar.html',function(req,res)
{
    res.sendFile(__dirname+'/agregar.html');
});
app.get('/index.html',function(req,res)
{
    res.sendFile(__dirname+'/index.html');
    
});
app.get('/eliminar.html',function(req,res)
{
    res.sendFile(__dirname+'/eliminar.html');
    
});
app.get('/buscar.html',function(req,res)
{
    res.sendFile(__dirname+'/buscar.html');
});
app.post('/buscar',async(req,res)=>
{
    const nombre1=req.body.nombre;
    const peli = await peli_model.find({nombre:nombre1})
    var json = JSON.stringify(peli);

    res.send(json);
});
app.post('/buscartodos',async(req,res)=>
{
    const peli = await peli_model.find({})
    var json = JSON.stringify(peli);

    res.send(json);
});
app.post('/eliminar',async(req,res)=>
{
    const nombre1=req.body.nombre_E;
    const peli = await peli_model.deleteOne({nombre:nombre1})
    
    res.redirect("/")
});
app.post("/add", async(req,res)=>{
    const peli = peli_model(req.body);
    await peli.save()
    console.log(peli)
    res.redirect("/")
});