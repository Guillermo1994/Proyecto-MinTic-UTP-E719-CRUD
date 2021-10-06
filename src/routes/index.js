const express = require('express');
const router = express.Router();

const Task= require('../models/task')

//Leer desde la base de datos
router.get('/', async (req, res)=> {
    const tasks = await Task.find();
    //console.log(tasks);
    res.render('index', {
    tasks //tasks: tasks
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
    //console.log(tasks);
    res.render('admin', {
    tasks //tasks: tasks 
    });
})

//ruta a Contactenos
router.get('/contactenos', async (req, res)=> {
    const tasks = await Task.find();
    res.render('contactenos', {
    tasks //tasks: tasks
    });
})

//ruta a Contactenos
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

//ruta a Adoptar
router.get('/adoptar', async (req, res)=> {
    const tasks = await Task.find();
    //console.log(tasks);
    res.render('adoptar', {
    tasks //tasks: tasks 
    });
})

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


module.exports = router; // permite exportar para que se lea desde otro lugar