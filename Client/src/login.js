import React, { useEffect, useState, location } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Axios from 'axios';
import auth from './auth';
import styles from './login.css';




export const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      email: email,
      password: password,
    }).then((response) => {

      
      if(response.data.message){

        setLoginStatus(response.data.message);

      }

      else {
        window.location.reload();
      }
   

     
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {

    if (response.data.loggedIn == true) {
      setLoginStatus(response.data.user.rows[0].user_email);
      //console.log(response.data.user.rows[0].user_email);

      auth.login(() => {
       
        props.history.push("/loggedin");
        
      });
      

    
    }

    if (response.data.loggedIn == false) {
      //console.log(response.data[0]);
      setLoginStatus(response.data.message);
    }
  });

  }, []);

  return (

    <div>

    <div className="Login" >

   
    <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">

          <emaillabel>
            <Form.Label>Email address:</Form.Label>
          </emaillabel>

          <inputemail>
          <Form.Control
            autoFocus
            type="email"
            placeholder= "Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
          </inputemail>
        </Form.Group>
        <Form.Group size="lg" controlId="password">

        <passwordlabel>
        <Form.Label >Password:</Form.Label>
        </passwordlabel>

          <inputpassword>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
         </inputpassword>

        </Form.Group>

        <logButton>
          <Button onClick={login} block size="lg" type="submit" disabled={!validateForm()}>
           Login
          </Button>
        </logButton>

    <register>
        <Link to="/register">
          Register
        </Link>

    </register>

    <h4>{loginStatus}</h4>
    
      </Form>
     
    </div>


    <style jsx>{`

body {
  font: 13px/20px "Lucida Grande", Tahoma, Verdana, sans-serif;
  color: #404040;
  background: #0ca3d2;
 }


.Login {
 position: relative;
 margin: 40px auto;
 padding: 20px 20px 100px;
 width: 310px;
 background: white;
 border-radius: 3px;
 -webkit-box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);
 box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);

}




.Login h1 {
margin: -20px -20px 21px;
line-height: 40px;
font-size: 15px;
font-weight: bold;
color: #555;
text-align: center;
text-shadow: 0 1px white;
background: #f3f3f3;
border-bottom: 1px solid #cfcfcf;
border-radius: 3px 3px 0 0;
background-image: -webkit-linear-gradient(top, whiteffd, #eef2f5);
background-image: -moz-linear-gradient(top, whiteffd, #eef2f5);
background-image: -o-linear-gradient(top, whiteffd, #eef2f5);
background-image: linear-gradient(to bottom, whiteffd, #eef2f5);
-webkit-box-shadow: 0 1px whitesmoke;
box-shadow: 0 1px whitesmoke;
}



.Login register {
position: relative;

top : 0px;
left: 0px;
}

.Login logButton {
position :relative;
top: 0px;
left : 0px;
}
.Login inputpassword {

position: relative;
top: 0px;
margin : 20px 0 0;
width : 200px;
left: 0px;

}

.Login inputemail {

position: relative;
top: 0px;
left: 0px;

}

.Login passwordlabel {

position: relative;
top: 0px;
left: 0px;


}

.Login emaillabel {
position: relative;
left: 0px;
}

.Login h4 {
position: relative;
top: 0px;
left: 0px;
font-size: medium;
text-align: center;
}
         

          `}

          
          


        </style>
    </div>
  );
}

