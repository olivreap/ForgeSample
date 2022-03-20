const fs = require('fs')
const express = require('express')
let router = express.Router()

router.get('/test', (req, res) => {
    console.log(req.query)
    res.send('este endpoint funcion')
})

router.post('/test', (req, res) => {
    var email = req.body.email
    if (email === undefined) {
        return res.json({
            status: 'failed',
            message: 'Es necesario indicar el email'
        })
    }
    res.json({
        status: 'success', 
        data: req.body
    })
})

router.post('/escribir', (req, res) => {
    const texto = req.body.texto
    const fichero = req.body.fichero
    fs.writeFileSync(`./${fichero}.txt`, texto)

    res.json({
        status: 'success', 
        data: {
            fichero: `${fichero}.txt`,
            texto
        }
    })
})

router.get('/leer', (req, res) => {
    const fichero = req.query.fichero
    const texto = fs.readFileSync(`./${fichero}.txt`, 'utf-8')
    res.send(texto)
})

router.get('/seleccion', (req, res) => {
    const texto = fs.readFileSync('./seleccion.txt', 'utf-8')
    const seleccion = texto.split(',').map((dbId) => { return parseInt(dbId)})
    res.json({
        status: 'success',
        data: seleccion
    })
})

router.post('/seleccion', (req, res) => {
  const seleccion = `${req.body}` 
  fs.writeFileSync('./seleccion.txt', seleccion)

  res.json({
    status: 'success',
    message: 'Selección guardada correctamente.',
  })
})

router.post('/check', (req, res) => {
    const data = Object.values(req.body).join(';')
    console.log(data)


    fs.writeFileSync('./checks.csv', data)
    res.json({
        status: 'success',
        message: 'Comprobacion guardada correctamente'
    })
})


module.exports = router