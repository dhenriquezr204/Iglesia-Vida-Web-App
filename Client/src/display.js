import React, { useEffect, useState} from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';

import styles from './display.css'

// var nursery, kinder, pre_school, early_elementary, late_elementary;
// var teachers_assistants, sanctuary, media_room, ushers, visitors, w_baptisms, h_g_baptisms;


function Display(props) {

  // const [err, setError] = useState(null)
  // const [isLoaded, setIsLoaded] = useState(false)
  let [info, setInfo] = useState([])
  let [nursery, setNursery] = useState(0)
  let [pre_school, setPreSchool] = useState(0)
  let [kinder, setKinder] = useState(0)
  let [early_elementary, setEarlyElementary] = useState(0)
  let [late_elementary, setLateElementary] = useState(0)
  let [teachers_assistants, setTeachersAssistants] = useState(0) 
  let [sanctuary, setSanctuary] = useState(0) 
  let [media_room, setMediaRoom] = useState(0) 
  let [ushers, setUshers] = useState(0) 
  let [visitors, setVisitors] = useState(0)
  let [w_baptisms, setWBaptisms] = useState(0)
  let [h_g_baptisms, setHGBaptisms] = useState(0)
  let [e_name, setEName] = useState("")

  

  function updateAttendance(ename, date, id) {


    console.log("Inside update name", ename);
    console.log("Inside update date ", date);
    console.log("Inside update id ", id);

    Axios.post('http://localhost:3001/updateAttendance', {
        id: id,
        nursery: nursery,
        pre_school: pre_school,
        kinder: kinder,
        early_elementary: early_elementary,
        late_elementary: late_elementary,
        teachers_assistants: teachers_assistants,
        sanctuary: sanctuary,
        media_room: media_room,
        ushers: ushers,
        visitors: visitors,
        w_baptisms: w_baptisms,
        h_g_baptisms: h_g_baptisms,
        name: ename,
        date: date

    }).then((response) => {

      console.log("Post ", response.body);
    });

    window.location.reload();
  
  }

  function deleteEvent(ename, date, id) {

    
    if (window.confirm('Are you sure you want to delete this event?')) {
    console.log("delete:", ename);

   


    Axios.post('http://localhost:3001/deleteEvent', {

        id: id,
        name: ename,
        date: date,

    }).then((response) => {


    });

    window.location.reload();

  }
  else{

  }
  
  }

  const test = () => {
    return <h1>{"Test"}</h1>
  }

const data = () => {Axios.get('http://localhost:3001/eventDisplay')
                .then((response) => {
                  setInfo(response.data.rows)
                })
              }

useEffect(() => {    
  data()    
console.log("Out ", info);
  setNursery(info.nursery)
  setPreSchool(info.pre_school)
  setKinder(info.kinder)
  setEarlyElementary(info.early_elementary)
  setLateElementary(info.late_elementary)
  setSanctuary(info.sanctuary)
  setMediaRoom(info.media_room)
  setUshers(info.ushers)

}, [])
      
  return(
  <div className="Display">{console.log("Inside the return", info)}
  {info.map((val) => (
    
    <div className="event">
      <div className="title_wrapper">
        <div className="name">
          {val.event_name}
        </div>
        <label className="f_name" for="f_name">
          
          {"Name:"}
        </label>

        <label className="f_name_data" for="f_name_data">
          {"PlaceHolder"}
        </label>

        <label className="date_label" for="date_label">
          {"Date:"}
        </label>

        <label className="f_name_data" for="f_name_data">
          {val.date}
        </label>
        <label className="name" id="ministry" for="name">
          {"Kid's Ministry"}
        </label>
        </div>

        <div className="form" autoComplete="off">
        <label id="item_label" for="item_label">
          {"Nursery (0-2 y/o):"}
        </label>
          <input id="item" type="number" placeholder={val.nursery}  name="nursery"  onChange={(e) => setNursery(e.target.value)} autoComplete="off"></input>
        
          <label id="item_label" for="item_label">
          {"Pre-School (2 y/o):"}
        </label>
          <input id="item" type="number" placeholder={val.pre_school}  name="pre_school"  onChange={(e) => setPreSchool(e.target.value)} autoComplete="off"></input>

          <label id="item_label" for="item_label">
          {"Kinder (4-5 y/o):"}
        </label>
          <input id="item" type="number" placeholder={val.kinder}  name="kinder"  onChange={(e) => setKinder(e.target.value)} autoComplete="off"></input>
          
          <label id="item_label" for="item_label">
          {"Early Elementary (1st-4th grade):"}
        </label>
          <input id="item" type="number" placeholder={val.early_elementary}  name="early_elementary"  onChange={(e) => setEarlyElementary(e.target.value)} autoComplete="off"></input>
        
          <label id="item_label" for="item_label">
          {"Late Elementary (5th-6th grade):"}
        </label>
          <input id="item" type="number" placeholder={val.late_elementary}  name="late_elementary"  onChange={(e) => setLateElementary(e.target.value)} autoComplete="off"></input>

          <label id="item_label" for="item_label">
          {"Total Teachers & Assitants:"}
        </label>
          <input id="item" type="number" placeholder={val.teachers_assistants}  name="teachers_assistants"  onChange={(e) => setTeachersAssistants(e.target.value)} autoComplete="off"></input>          
        
          <label className="name" id="sunday_service" for="name">
          {"Sunday Service Experience"}
        </label>

        <label id="item_label2" for="item_label">
          {"Sanctuary:"}
        </label>
          <input id="item" type="number" placeholder={val.sanctuary}  name="sanctuary"  onChange={(e) => setSanctuary(e.target.value)} autoComplete="off"></input>
        
          <label id="item_label2" for="item_label">
          {"Media Room:"}
        </label>
          <input id="item" type="number" placeholder={val.media_room}  name="media_room"  onChange={(e) => setMediaRoom(e.target.value)} autoComplete="off"></input>

          <label id="item_label2" for="item_label">
          {"Ushers:"}
        </label>
          <input id="item" type="number" placeholder={val.ushers}  name="ushers"  onChange={(e) => setUshers(e.target.value)} autoComplete="off"></input>         
        
        </div>

        <button type="submit" class="attend" onClick={updateAttendance.bind(this,val.event_name, val.date, val.event_id)}>Update Attendance</button>
 
         {/* <button type="submit" class="delete" onClick={deleteEvent(val.event_name, val.date, val.event_id)}>Delete Event</button> */}
     
        </div>
  ))}
</div>
  )
}

export default Display;
