const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
    try {    
        const userArray = await User.find()
        // console.log(userArray)
        
        res.render("users", {
            userArray: userArray
        });
    } catch (error) {
        console.log(error)
    }
})

router.get('/new', (req, res) => {
    res.render("new", {
      title: "crear usuario"
    });
})

router.post('/', async (req, res) => {
    const body = req.body
    //console.log(body)
    try {
      await User.create(body)
        res.redirect('/users')
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const UserDb = await User.findOne({_id: id})
        //console.log(UserDb)
        res.render('select', {
            user: UserDb,
            error: false,

        })
    } catch (error) {
        console.log('error', error)
        res.render('select', {
            error: true,
            mensaje: 'no se encontro el id'

        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const UserDb = await User.findByIdAndDelete({_id: id})

        if (UserDb) {
            res.json({
                status: true,
                mensaje: 'usuario eliminado'
            })
        } else {
            res.json({
                status: false,
                mensaje: 'error al eliminar'
            })
        }
    } catch (error) {
        console.log('error', error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const UserDb = await User.findByIdAndUpdate(id, body, {useFindAndModify: false})
        console.log(UserDb)

        res.json({
            status: true,
            mensaje: 'usuario editado'
        })
    } catch (error) {
        console.log('error', error)
        res.json({
            status: false,
            mensaje: 'error al editar'
        })
    }
})

module.exports = router;