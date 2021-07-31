const db = require('../mysqlconnection')
const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    const sql = 'SELECT * FROM tickets'
    db.query(sql, (err, result)=>{
        if (err) throw err
        res.status(200).json(result)
    })
})

router.get('/destinations/:destination', (req, res) => {
    const sql = 'SELECT * FROM tickets WHERE loc_chegada = ?'
    db.query(sql, [ req.params.destination ], (err, result)=>{
        if(err) throw err
        res.status(200).json(result)
    })
})

router.get('/destinations', (req, res) => {
    const sql = 'select * from tickets group by loc_chegada'
    db.query(sql, (err, result)=>{
        if(err) throw err
        res.status(200).json(result)
    })
})

router.get('/user/:id', (req, res )=>{
    const id = req.params.id
    const sql = 'SELECT tickets.numero, tickets.loc_chegada, usuarios.name, usuarios.id  FROM tickets, usuarios WHERE usuarios.id = tickets.id_user AND tickets.id_user = ?';
    db.query(sql, id , (err, result)=>{
        if(err) throw err
        res.status(200).json(result)
    })
})

router.post('/', (req, res)=>{
    const sql = 'INSERT INTO tickets VALUES (?,?,?,?,?,?,?)'
    db.query(sql, [req.body.numero, req.body.cia, req.body.loc_partida, req.body.loc_chegada, req.body.data_partida, req.body.data_chegada, req.body.preco ],
        (err, result)=>{
            if(err) throw err
            res.status(200).json(result)
        })
})

router.put('/:id', (req, res)=>{
    const sql = 'UPDATE tickets SET numero = ?, cia = ?, loc_partida = ?, loc_chegada = ?, data_partida = ?, data_chegada = ?, preco = ?  WHERE id = ?'
    db.query(sql, [ req.body.numero, req.body.cia, req.body.loc_partida, req.body.loc_chegada, req.body.data_partida, req.body.data_chegada, req.body.preco, req.params.id ], 
        (err, result)=>{
            if(err) throw err
            res.status(200).json(result)
        })
})

router.delete('/:id', (req, res)=>{
    const sql = 'DELETE FROM tickets WHERE id = ?'
    db.query(sql, [ req.params.id ], (err, result)=>{
        if(err) throw err
        res.status(200).json(result)
    })
})

module.exports = router