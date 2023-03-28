import React, { Component } from 'react'
import { NavigationBar } from './NavigationBar';
import { Box,Grid ,styled,Paper, Typography,TextField} from '@mui/material'
import { useState ,useRef,useEffect} from 'react';
import { Card,CardGroup } from 'react-bootstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button} from '@mui/material';
export const Dashboard = () => {
    const [addData, setAddData] = useState();

    const [expenses, setexpenses] = useState([])

    const [budget, setbudget] = useState(0)

    const [isEditId, setisEditId] = useState(null)
    const [index, setindex] = useState(0);
  //  const [budgetdisplay, setbudgetdisplay] = useState(0)
    const [expensesdisplay, setexpensesdisplay] = useState(0)
    const [balance, setbalance] = useState(0)

    const [toggleBtn, settoggleBtn] = useState(true)

    const expTitleRef = useRef(null)
    const expAmountRef = useRef(null)
            let total=0;
            let a=0;
  
    const add = () => {
        console.log(addData)
        console.log(expenses)
        setbudget(addData)
    
           
    }




   
    const AddExpense = () => {
        const URL=" http://localhost:3001/users"
        var dataloade = { id: new Date().toString(), title: expTitleRef.current.value, expences: expAmountRef.current.value }
        setexpenses([...expenses, dataloade])
        console.log(expenses)

        let id = JSON.parse(sessionStorage.getItem('userdata')).id;
        let _fname = JSON.parse(sessionStorage.getItem('userdata')).fname;
        let _lname = JSON.parse(sessionStorage.getItem('userdata')).lname;
        let _email = JSON.parse(sessionStorage.getItem('userdata')).email;
        let _username = JSON.parse(sessionStorage.getItem('userdata')).username;
        let _password = JSON.parse(sessionStorage.getItem('userdata')).password;

        var newURl = `${URL}/${id}`
        let formData = {
            password: _password, email: _email, fname: _fname, lname: _lname, username: _username,
            totalbudget: addData,
            budget: [...expenses,{
               
                title: expTitleRef.current.value,
                expences: expAmountRef.current.value
            }]
        }
        console.log(formData)
        const user1 = JSON.parse(sessionStorage.getItem('userdata'))

        const budget = {
          
            title: expTitleRef.current.value,
            expences: expAmountRef.current.value
        }
        user1.budget = [...user1.budget,budget]
        setexpenses([...user1.budget])

        sessionStorage.setItem('userdata', JSON.stringify(user1))
      
        fetch(newURl, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                "content-type": "application/json",
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                alert("data Updated");
                fetch(URL)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err =>
                        console.log(err)
                    )
            })

    }
    useEffect(() => {
        if (sessionStorage.getItem('userdata') != undefined) {
            const user1 = JSON.parse(sessionStorage.getItem('userdata'))
            const userd = user1.budget
            setexpenses([...userd])
        }

    }, [])
    const delete1 = (id)=>{
        var newData = [...expenses]
        var todo = newData.filter((exp,i)=>{
            return i !== id;
        })
        setexpenses(todo)
    //     const user1 = JSON.parse(localStorage.getItem('userdata'))
    //  const userd=user1.budget
    //     const bool = window.confirm("Do You really want to delele this?")
    //     if (bool === true) {
    //         userd.splice(index, 1)
    //         setAddData({ ...user1 });
    //         localStorage.setItem('userdata', JSON.stringify(user1));



    //     }
    //     const user2 = JSON.parse(localStorage.getItem('userdata'))
    //     const userd1 = user2.budget
    //     setexpenses([...userd1])
    //     refresh()

    }
 

    const edit = () => {
        const expenseData = expTitleRef.current.value;
        const amountData = expAmountRef.current.value;
        expenses[isEditId] = { id: isEditId, title: expenseData, expences: amountData }
        setexpenses([...expenses])
        settoggleBtn(true)
        

    }

    const update = (id, data) => {
        expTitleRef.current.value = data.title
        expAmountRef.current.value = data.expences;
        settoggleBtn(false)
        setisEditId(id)

    }

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
    return (
        <>
        <NavigationBar/>
                  <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      
      <Grid item xs={3}
     sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
      
       
        height:600,
     
        borderRadius:'10px',
        },
    }}
    >
        <Item>
           
            {/* <TextField type="text" className="form-control" placeholder="Enter Task" id="title" inputRef={titleRef} /> */}
            <Grid container spacing={2}>

                
              <Grid item xs={12} sm={12} style={{marginTop:'50px'}}>
   <Grid>
           <h4> Budget Details</h4>
              <TextField
                  autoComplete="given-name"
                 
                  required
                  type="number"
                  fullWidth
                  value={addData}
                  onChange={(e) => setAddData(e.target.value)}
                  required
               
                  label="Enter Budget"
               
                  autoFocus
                ></TextField>
                 <Button
              type="submit"
              fullWidth
              value="Add"
              variant="contained"
              onClick={add}
              sx={{ mt: 3, mb: 2 }}
            >
                
             Add
            </Button>
            </Grid>
                <h4> Details</h4>



                <TextField
                  autoComplete="given-name"
                 
                  required
                  type="text"
                  fullWidth
                
                //  onChange={onchange}
              
                  inputRef={expTitleRef}
                  label="Enter your Expense Title here.."
               
                 
                ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                  <TextField
                  autoComplete="given-name"
                  className="head"
                  required
                  type="number"
                
                  fullWidth
                
                inputRef={expAmountRef}
                  label="Enter your Expense Amount here.."
               
                 
                ></TextField>
                </Grid>
        
          
      
          </Grid>
            {/* <label>Description</label>
            <input className="head"/> */}
            <br/>
            {/* <Button
              type="submit"
              fullWidth
              value="Add"
              variant="contained"
              onClick={add}
              sx={{ mt: 3, mb: 2 }}
            >
                
             Add
            </Button> */}
            {
              toggleBtn? 
              <Button
              type="submit"
              fullWidth
              value="Add"
              variant="contained"
              onClick={AddExpense}
              sx={{ mt: 3, mb: 2 }}
            >
                
             Add
            </Button>
            :
            <Button
            type="submit"
            fullWidth
            value="Edit"
            variant="contained"
            onClick={edit}
            sx={{ mt: 3, mb: 2 }}
          >
              
           Edit
          </Button>
           
            }
            {/* <input type="submit" value="Add" className="btn btn-success" onClick={add} /> */}
            {/* {state.category.map((task, id) =>
                                <tr key={id}>
                                    <td>{id + 1}</td>
                                    <td sidebars>{task.tit}</td>

                                    <td>
                                        <button className="btn btn-danger" onClick={() => { del(id) }}>Delete</button> &nbsp;
                                        <button className="btn btn-warning text-white" onClick={() => { update(id, task.tit) }}>Update</button>

                                    </td>
                                </tr>
                            )} */}
           
        </Item>
    </Grid>
        <Grid item xs={9}>
        <Item>
       
    
            <h4 className='head'>
              welcome </h4>
{/* {JSON.parse(sessionStorage.getItem('userdata')).fname}  {JSON.parse(sessionStorage.getItem('userdata')).lname} </h4> */}
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 1000,
             
                borderRadius:'10px',
                },
            }}
            >
            {/* <Paper elevation={0} />
            <Paper /> */}
            <Paper elevation={10} style={{backgroundColor:'white'}}>
                <h4>Category Details</h4>
                <CardGroup>
  <Card>
   
    <Card.Body>
      <Card.Title>BUDGET</Card.Title>
      <Card.Img variant="top" src="./Images/dollar.jpg" style={{width:'100px',height:'100px',borderRadius:'50%'}} />
     
      <Card.Text>
        <h1 style={{color:'green'}}> 
        <br/>
         $ {budget}</h1>
       
      </Card.Text>
    </Card.Body>
   
  </Card>
  <Card>
   
    <Card.Body>
    <Card.Title>EXPENSES</Card.Title>
    <Card.Img variant="top" src="./Images/expense.png" style={{width:'100px',height:'100px',borderRadius:'50%'}} />
     
     <Card.Text>
       <h1 style={{color:'green'}}>  
       {
                expenses.forEach(add=>
                    a=total+=parseInt(add.expences)

                    )
            }<br/>
       $ {a}</h1>
      
     </Card.Text>
    </Card.Body>
    
  </Card>
  <Card>
    
    <Card.Body>
    <Card.Title>BALANCE</Card.Title>
    <Card.Img variant="top" src="./Images/walet.png" style={{width:'100px',height:'100px',borderRadius:'50%'}} />
     
     <Card.Text>
       <h1 style={{color:'green'}}> 
      
          
        $ {parseInt(budget-a)}</h1>
      
     </Card.Text>
    </Card.Body>
    
  </Card>
</CardGroup>
           
                              
                         
     <TableContainer component={Paper} className="container" style={{marginTop:'20px',padding:'10px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{background:'#007acc'}}>
            <TableCell>ID</TableCell>
            <TableCell align="right">Expense Title</TableCell>
            <TableCell align="right">Expense Value</TableCell>
            <TableCell align="right"> Action </TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        {expenses.map((exp, index) =>
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{background:'#ccebff'}}
            >
              <TableCell component="th" scope="row">
                {index}
              </TableCell>
              <TableCell align="right">{exp.title}</TableCell>
              <TableCell align="right">{exp.expences}</TableCell>
              <TableCell align="right">
              <button className="btn btn-danger" onClick={() => { delete1(index) }}>Delete</button> &nbsp;
             <button className="btn btn-warning text-white" onClick={() => { update(index, exp) }}>Update</button>

          
                  </TableCell>
           
            </TableRow>
                )} 
         
        </TableBody>
      </Table>
    
    </TableContainer>
   
       
                          
            </Paper>
           
            </Box>    
        </Item>
        <Item>
      

     
        </Item>
    </Grid>
      </Grid>
    </Box>
           
        </>
    )
}
