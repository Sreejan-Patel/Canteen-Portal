import Grid from "@mui/material/Grid";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { Component } from "react";
import { Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import validator from "validator";


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password:''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeEmail(e){
        this.setState({email: e.target.value});
    }

    onChangePassword(e){
        this.setState({password: e.target.value})
    }

    onSubmit(e){ 
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

  
        if(!this.state.email || !this.state.password){
            alert('Please fill in all the fields');
        }
        else if(!validator.isEmail(this.state.email)){
            alert('Please enter a valid email: a@b.com');
        }
        else{
            console.log(user);
            axios.post('http://localhost/api/vendor/login', user).then(res => {
                console.log(res.data,"response1");
                if(res.data.status === 'success'){
                    localStorage.setItem("email", this.state.email);
                    localStorage.setItem("type", "Vendor");
                    window.location.href = '/vendor/dashboard';
                }
                else if(res.data.status === 'Password is incorrect'){
                    alert('Incorrect Password');
                }
                else if(res.data.status === 'Email does not exist'){
                    axios.post('http://localhost/api/buyer/login', user).then(res => {
                        console.log(res.data,"response2");
                        if(res.data.status === 'success'){
                            axios.post('http://localhost/api/wallet/', user).then(res => {
                                console.log(res.data,"response3");
                        })
                            localStorage.setItem("email", this.state.email);
                            localStorage.setItem("type", "Buyer");
                            window.location.href = '/buyer/dashboard';
                        }
                        else if(res.data.status === 'Password is incorrect'){
                            alert('Incorrect Password');
                        }
                        else if(res.data.status === 'Email does not exist'){
                            alert('Register first');
                        }
                })
            }
            
        })
        }
    }


    render() {

        return(

        
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand href="/">
                    Canteen Portal
                    </Navbar.Brand>
                    </Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav.Link href="/signup">Signup</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Navbar.Collapse>
                </Navbar>
                <br></br>

                <Container
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    align={'center'}>
                    
                    <Grid item xs={12}>
                            <TextField
                            label="E-mail"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            margin="normal"
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12}>
                            <TextField
                            label="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            margin="normal"
                            variant="outlined"
                            />
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={this.onSubmit}>
                        Login
                    </Button>
                    </Grid>


                </Container>
            </div>
        )
    }

}

export default Login;