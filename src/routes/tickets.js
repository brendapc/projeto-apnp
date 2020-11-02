const db = require('../mysqlconnection')
const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    const sql = 'SELECT * FROM passagens'
    db.query(sql, (err, result)=>{
        if (err) throw err
        res.status(200).json(result)
    })
})

router.get('/:destination', (req, res) => {
    const sql = 'SELECT * FROM passagens WHERE loc_chegada = ?'
    db.query(sql, [ req.params.destination ], (err, result)=>{
        if(err) throw err
        res.status(200).json(result)
    })
})

router.get('/user/:id', (req, res )=>{
    console.log(req.params.id)
    const id = req.params.id
    const sql = 'SELECT passagens.numero, passagens.loc_chegada, usuarios.name, usuarios.id  FROM passagens, usuarios WHERE usuarios.id = passagens.id_user AND passagens.id_user = ?';
    db.query(sql, id , (err, result)=>{
        if(err) throw err
        res.status(200).json(result)
    })
})

router.post('/', (req, res)=>{
    const sql = 'INSERT INTO passagens VALUES (null, ?,?,?,?,?,?,?)'
    db.query(sql, [req.body.numero, req.body.cia, req.body.loc_partida, req.body.loc_chegada, req.body.data_partida, req.body.data_chegada, req.body.preco ],
        (err, result)=>{
            if(err) throw err
            res.status(200).json(result)
        })
})

router.put('/:id', (req, res)=>{
    const sql = 'UPDATE passagens SET numero = ?, cia = ?, loc_partida = ?, loc_chegada = ?, data_partida = ?, data_chegada = ?, preco = ?  WHERE id = ?'
    db.query(sql, [ req.body.numero, req.body.cia, req.body.loc_partida, req.body.loc_chegada, req.body.data_partida, req.body.data_chegada, req.body.preco, req.params.id ], 
        (err, result)=>{
            if(err) throw err
            res.status(200).json(result)
        })
})

router.delete('/:id', (req, res)=>{
    const sql = 'DELETE FROM passagens WHERE id = ?'
    db.query(sql, [ req.params.id ], (err, result)=>{
        if(err) throw err
        res.status(200).json(result)
    })
})

module.exports = router