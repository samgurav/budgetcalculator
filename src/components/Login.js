
import * as React from 'react';
import { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { useRef } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Paper } from '@mui/material';
import { Redirect,Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import SocialButton from './SocialButton';
import { Dashboard } from './Dashboard';

 const paperStyle={padding:20,height:'90vh', width:350, margin:'60px auto'}
const URL = "http://localhost:3001/users";
const bcrypt = require('bcryptjs')
export const Login = () => {
    const [userdata, setdata] = useState('')
    const [userdetails, setuserdetails] = useState([])
    const[flag,setFlag]=useState(false)
    const[flag1,setFlag1]=useState(false)
    
    const [login, setlogin] = useState([])
    const navigate=useNavigate()
    const emailInput = useRef(null);
    const passInput = useRef(null);

  
     
    const handleSocialLogin = (user) => {
        console.log(user);

        refresh()
        
        let userlogin= login.find(x=>x.email===user._profile.email)
        let userIndex = login.indexOf(userlogin)
        console.log(userlogin)
        console.log(userIndex)

        if(userIndex +1){
            localStorage.setItem('userdata',JSON.stringify(login[userIndex]));
            // setflag(1);navigate to home
            setFlag1(true)
        }
        else{
            let formData = {
                fname: user._profile.firstName,
                lname: user._profile.lastName,
                uername: user._profile.id,
                email: user._profile.email,
                password: 'socialLogin',
                totalbudget:0,
                balance:0,
                budget:[]
              };
              axios.post(URL,formData)
            localStorage.setItem('userdata',JSON.stringify(formData));
            //   setflag(1);navigate
            setFlag1(true)
        }
};
    
             
       
    
    const handleSocialLoginFailure = (err) => {
        console.error(err);
      };
      const refresh = () => {
        axios.get(URL)
            .then(res => {
                console.log(res.data)
                setlogin(res.data)
            })
    }

    const handler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
    
        setdata({
          [name]: value
        })
        // console.log(this.state)
    }
    const submit=(event)=>{
        event.preventDefault();
     
        var data = false;
        
        userdetails.forEach(user => {
            const doesPasswordMatch = bcrypt.compareSync(passInput.current.value, user.password)
                if(user.email===emailInput.current.value&& doesPasswordMatch){
                        let arr=user
                        alert('login succesfully');
                    setFlag(true)
                        if(sessionStorage.getItem('userdata')!==undefined){
                            sessionStorage.setItem('userdata', JSON.stringify(arr))
                        }
                        
                        data= true;
                        return
                }
         
        });
        if(data!==true){
            alert('Email id or password is incorrect');
        //   history.push('/');
        }
        
        
    }
    useEffect(() => {
        const URL = "  http://localhost:3001/users";
        fetch(URL)
        .then(res=>res.json())
        .then(data=>{
         
            setuserdetails(data)
        })
    }, [])
    return (
        <>
         <Paper elevation={10} style={paperStyle }>
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                  
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={submit}  sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        inputRef={emailInput}
                        onChange={handler}
                       
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        inputRef={passInput}
                        onChange={handler}
                        id="password"
                        autoComplete="current-password"
                      
                    />
                 
                    <Button
                     
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                                <SocialButton
                className="btn btn-info"
                fullWidth
                provider="google"
                appId="172836625657-4lu0sr9c5ok1cf0a5q80p7tbr32ipaqc.apps.googleusercontent.com"
                onLoginSuccess={handleSocialLogin}
                onLoginFailure={handleSocialLoginFailure}
                >
                Login with Google
                </SocialButton>
                {flag1? navigate('/dashboard'):null}
                {/* {flag1 && <Dashboard/>} */}
             
                    <p>New User? Register Here</p>
                       <Button
                      component={Link} to='/'
                      exact activeClassName="active"
                     type="submit"
                     fullWidth
                   
                     sx={{ mt: 1, mb: 2 }}
                 >
                     Sign Up
                 </Button>
                 {flag? navigate('/dashboard'):null}
                      
                </Box>
         
              
            </Box>
            </Container>
        </Paper>
            
        </>
    )
}
