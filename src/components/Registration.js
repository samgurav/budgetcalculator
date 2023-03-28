import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState ,useRef} from 'react';
import { useNavigate } from 'react-router'
import axios from 'axios'
const paperStyle={padding:20,height:'130vh', width:650, margin:'20px auto'}
const bcrypt = require('bcryptjs')

const regForName = RegExp(/^[A-Za-z]{3,10}$/);
const regForUName = RegExp(/^[A-Za-z]{2,12}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);

const theme = createTheme();
export const Registration = () => {
    const fNameInput = useRef(null);

  const lNameInput = useRef(null);
  const emailInput = useRef(null);
  const usernameInput = useRef(null);
  const passInput = useRef(null);
  const cPassInput = useRef(null);
  const[data,setData]=useState();
  const navigate=useNavigate()
  const[flag,setFlag]=useState(false)
 const [select,setSelect]=useState()

const [Errors,SetError]=useState({
  fname:'',
  lname:'',
  email:'',
  username:'',
  password:'',
  cpassword:'',
})
const handler=(e)=>{
  const {name,value}= e.target;
  switch(name){
    case 'fname':
      Errors.fname= regForName.test(value)?'':'first name should be between 2 to 10 letters';
      break;
      case 'lname':
        Errors.lname= regForName.test(value)?'':'last name should be between 2 to 10 letters';
   break;
   case 'username':
                Errors.username= regForUName.test(value)?'':'username should be between 2 to 12 letters';
           break;
           case 'email':
            Errors.email= regForEmail.test(value)?'':'invalid email';
       break;
       case 'password': 
       Errors.password=regForPass.test(value)?'':'Password must be between 6 to 16 characters and must contain one number and one special character';
        break;
     case 'cpassword':
        Errors.cpassword=passInput.current.value===cPassInput.current.value?'':'Password do not match';
      break; 
    
  }
  setSelect({Errors,[name]:value},()=>{
    console.log(Errors)
  })
  
}
const validate=(errors)=>{
    let valid = true;
    Object.values(errors).forEach((val)=> 
        val.length>0 && (valid = false));
        return valid;
        }
        
        const submit = (event)=>{
          event.preventDefault();
          const hashPass = bcrypt.hashSync(passInput.current.value, bcrypt.genSaltSync());
          if(validate(Errors))
          {
            const URL="  http://localhost:3001/users"
            let formData={
              fname:fNameInput.current.value,
              lname:lNameInput.current.value,
              email:emailInput.current.value,
              username:usernameInput.current.value,
            // password:passInput.current.value,
              cpassword:cPassInput.current.value,
              password : hashPass,
              budget:[]
      
            }
        
            axios.post(URL,formData)
            setFlag(true)
            axios.get(URL)
            .then(res=>{
              console.log(res.data)
              setData(res.data)
            })
  
              alert("Form Submitted SuccesFully");
             
          }
          else{
              alert("Invalid Form");
          }
  
      } 
         const callback = () => {
        console.log('Done!!!!');
    };
  
    // specifying verify callback function
    const verifyCallback = (response) => {
        console.log(response);
    };
    return (
        <>
            <Paper elevation={10} style={paperStyle }>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
           
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
         
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" required onSubmit={submit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="firstName"
                  inputRef={fNameInput}
                  label="First Name"
                  onChange={handler}
                  autoFocus
                >
          
                </TextField>
                {Errors.fname.length>0 &&
                  <span style={{color:"red"}}>{Errors.fname}</span>}   
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lname"
                  autoComplete="family-name"
                  inputRef={lNameInput}
                  onChange={handler}
                ></TextField>
                  {Errors.lname.length>0 &&
                  <span style={{color:"red"}}>{Errors.lname}</span>}   
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  inputRef={emailInput}
                  autoComplete="email"
                  onChange={handler}
                />
                  {Errors.email.length>0 &&
                  <span style={{color:"red"}}>{Errors.email}</span>}   
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                    inputRef={usernameInput}
                  autoComplete="username"
                  onChange={handler}
                />
                 {Errors.username.length>0 &&
                  <span style={{color:"red"}}>{Errors.username}</span>}   
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  inputRef={passInput}
                  autoComplete="new-password"
                  onChange={handler}
                />
                 {Errors.password.length>0 &&
                  <span style={{color:"red"}}>{Errors.password}</span>}  
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  inputRef={cPassInput}
                  autoComplete="new-password"
                  onChange={handler}
                />
                 {Errors.cpassword.length>0 &&
                  <span style={{color:"red"}}>{Errors.cpassword}</span>}  
              </Grid>
              <Grid item xs={12}>
             
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {flag? navigate('/login'):null}
            <p>Already Registered? Login Here</p>
            <Button
              type="submit"
              fullWidth
              component={Link} to='/login'
              exact activeClassName="active"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
           
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
    </Paper>
            
        </>
    )
}
