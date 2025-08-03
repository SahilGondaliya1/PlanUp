///import modules to use
import express from 'express';
import {readFile , writeFile } from 'fs/promises';

//create basic app features
const app = new express();
const port = 3000;
const file = 'D:\PlanUp\src\script\tasks.json';

app.use(express.static('public'))

app.get('/task', (req, res)=>{
    res.send('adding tassk');
})
app.post('/task', (req , res) => {
    
});
app.delete('/task');
app.put('/task');

//create the server on the port
app.listen(port)