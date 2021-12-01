const express = require('express');
const client = require('../Database/dbConn');
const queries = require('../Database/Queries');
const fs = require('fs');
const path = require('path');
let {PythonShell} = require('python-shell');

const router = express.Router();

let baseDir = path.join(__dirname, '../../ML/');


router.post('/addEvent', (req, res) => {

    const date = req.body.date;
    const event = req.body.event;
  
    client.execute(queries.AddEvent,
      [event, date],
      (err, result) => {
        console.log(err);
      });
})

router.post('/deleteEvent', (req, res) => {

    const id = req.body.id;
  
    console.log("Delete:", id);
    client.execute(queries.DeleteEvent,
        [id], {prepare : true},
        (err, result) => {
            console.log(err);
        });
})

router.get('/eventDisplay', (req, res) => {
    client.execute(queries.EventDisplay,
        (err, result) => {
          //console.log("Event Display:", result);
            res.send(result);
        });
    
});

router.post('/predict', (req, res) => {
    const date = req.body.date;
    console.log(date);
    console.log({baseDir});

    fs.writeFileSync(path.join(`${baseDir}`,"input.txt"), date);

    let options = {
        mode: 'text',
        //Make sure to change this to your python path (on terminal type: which python) => that address should be pasted into the pythonPath
        pythonPath: '/Users/isouthernms/opt/anaconda3/bin/python3',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: '../../ML/',
        args: ['value1', 'value2', 'value3']
      };
      
      PythonShell.run('index.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);

    const data = fs.readFileSync(path.join(`${baseDir}`,"prediction.txt"), 'utf8')
      res.send(data);
      
        });
    
   
      
      
});

router.post('/updateAttendance', (req, res) => {

    const id = req.body.id;
    const nursery = req.body.nursery;
    const pre_school = req.body.pre_school;
    const kinder = req.body.kinder;
    const early_elementary = req.body.early_elementary;
    const late_elementary = req.body.late_elementary;
    const teachers_assistants = req.body.teachers_assistants;
    const sanctuary = req.body.sanctuary;
    const media_room = req.body.media_room;
    const ushers = req.body.ushers;
    const visitors = req.body.visitors;
    const w_baptisms = req.body.w_baptisms;
    const h_g_baptisms = req.body.h_g_baptisms;
    const name = req.body.name;
    const date = req.body.date;
    console.log(req.body.name);
    console.log(req.body.date);
    console.log(req.body.nursery);
    console.log(req.body.sanctuary);
    client.execute(queries.UpdAtt, [nursery, pre_school, kinder, early_elementary, late_elementary, teachers_assistants, sanctuary, media_room, ushers,visitors, w_baptisms,h_g_baptisms, id], {prepare : true},
        (err, result) => { 
            console.log(err);
        });
});


module.exports = router;
