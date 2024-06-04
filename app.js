const express = require('express');
//const { Pool } = require('pg');
const pool = require('./db');

require('dotenv').config();

const app = express();
app.use(express.json()); // Middleware para parsear JSON

 // const pool = new Pool({
        //     user: process.env.DB_USER,
        //     host: process.env.DB_HOST,
        //     database: process.env.DB_NAME,
        //     password: process.env.DB_PASSWORD,
        //     port: process.env.DB_PORT,
        //   });
/**
 * 
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error al conectar la base de datos', err);
  } else {
    console.log('Conexion establecida:', res.rows[0]);
  }
  pool.end();
});
*/


//listar
app.get("/users", async (req,res )=>{
    try{

       

        const result = await pool.query("select * from users");
        res.json(result.rows);    
       // pool.end();
    }catch(err){
            console.log(err);
            return res.status(500).send("Error de servidor")
    }

});



app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error interno');
    }
  });

//insertar
 app.post('/users', async (req, res) => {
    const { nombres, paterno,nombreusuario,clave } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO users (nombres, paterno,nombreusuario,clave) VALUES ($1, $2,$3,$4) RETURNING *',
        [nombres,paterno,nombreusuario,clave]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error de servidor');
    }
  });

//actualizar
  app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { nombres,paterno,clave } = req.body;
    try {
      const result = await pool.query(
        'UPDATE users SET nombres = $1, paterno = $2,clave=$3 WHERE id = $4 RETURNING *',
        [nombres,paterno,clave, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).send('User not found');
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  

  //eliminar
  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
      console.log(result.rows.length )
      if (result.rows.length === 0) {
        return res.status(404).send('usuario no encontrado');
      }
      res.status(204).send(); //usuario eliminado
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });


var server = app.listen(3200,function(){
    console.log("el servidor express se encuentra en ejecucion");
});