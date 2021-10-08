const express = require('express');
const router = express.Router();
const Task= require('../models/task')
const Infocon = require('../models/tcontacts')
var app = express();

const Usuario = require ( './')
//Leer desde la base de datos
router.get('/', async (req, res)=> {
    const tasks = await Task.find();
    res.render('index', {
    tasks //tasks: tasks
    });

    const info = await Infocon.find();
    res.render('index', {
        info //info:info
    });
})

//ruta para index
router.get('/index', async (req, res)=> {
    const tasks = await Task.find();
    //console.log(tasks);
    res.render('index', {
    tasks //tasks: tasks
    });
})


//ruta a admin
router.get('/admin', async (req, res)=> {
    const tasks = await Task.find();
    const info =  await Infocon.find();
    //console.log(tasks);
    res.render('admin', {
    tasks,info //tasks: tasks 
    });
})

//ruta a Contactenos
router.get('/contactenos', (req, res)=> {
    res.render('contactenos', {
    });
})

//ruta a Adoptar
router.get('/adoptar', async (req, res)=> {
    const tasks = await Task.find();
    res.render('adoptar', {
    tasks //tasks: tasks
    });
})

//Guardar en base de datos
router.post('/add', async (req, res)=> { //Recibiendo los datos que vienen desde el formulario
const task = new Task(req.body);
    await task.save();
    res.redirect('/');
    //res.send('received');
})

//Boton Done
router.get('/turn/:id', async (req, res) => {
    const {id} = req.params;
    const task= await Task.findById(id);
    task.status = !task.status;
    res.redirect('/admin');
    await task.save();
    //console.log(task);
    //res.send('Receidved!')
});

//Editar
router.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const task= await Task.findById(id);
    res.render('edit', {
    task
    });
});

router.post('/edit/:id', async (req, res) => {
    const {id} = req.params;
    await Task.updateOne({_id: id}, req.body);
    res.redirect('/admin');
})

//Borrar
router.get('/delete/:id', async (req, res) => {
    const {id} = req.params;
    await Task.remove({_id: id});
    res.redirect('/admin');
    //console.log(req.params.id)
    //res.send('received!');
});


//Perfil Mascota
router.get('/perfil/:id', async (req, res) => {
    const {id} = req.params;
    const task= await Task.findById(id);
    res.render('perfil', {
    task
    });
});

router.post('/perfil/:id', async (req, res) => {
    const {id} = req.params;
    await Task.updateOne({_id: id}, req.body);
    res.redirect('/adoptar');
});

//Boton Done2
router.get('/turn2/:id', async (req, res) => {
    const {id} = req.params;
    const task= await Task.findById(id);
    task.status = !task.status;
    res.redirect('/adoptar');
    await task.save();
    //console.log(task);
    //res.send('Receidved!')
});

router.get('/correo', async (req,res)=>{
    const info = await Infocon.find();
    res.render('correo', {
        info
    })
})

router.post('/add2', async (req,res)=>{
    const info = new Infocon(req.body);
    await info.save();
    res.redirect('/contactenos'); //Recargar la pagina
})

//Boton Status Leido/Noleido
router.get('/turn3/:id', async (req, res) => {
    const {id} = req.params;
    const info = await Infocon.findById(id);
    console.log(info);
    info.status = !info.status;
    res.redirect('/correo');
    await info.save();
});

//Borrar Mensaje de la bandeja de entrada
router.get('/delete2/:id', async (req, res) => {
    const {id} = req.params;
    await Infocon.remove({_id: id});
    res.redirect('/correo');
});
module.exports = router; // permite exportar para que se lea desde otro lugar