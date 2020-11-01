const db = require('../mysqlconnection')
const express = require('express')
const router = express.Router()

router.get('/me', (req, res)=>{
    const  _id  = req.query.id
    const sql = 'SELECT * FROM usuarios WHERE id = ?'
    db.query(sql, [ _id ], (err, result)=>{
        if(err) throw err
        res.status(200).json(result)
    })
})

router.post('/', (req, res)=>{
    const sql = 'INSERT INTO usuarios VALUES (null, ?, ?)'
    db.query(sql, [ req.body.name, req.body.email ], (err, result)=>{
        if(err) throw err
        res.status(200).json(result)
    })
})

module.exports = router