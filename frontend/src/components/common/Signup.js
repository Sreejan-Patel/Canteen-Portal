import Grid from "@mui/material/Grid";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { Component } from "react";
import { Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import axios from "axios";
import validator from "validator";



//Signup Component
class Signup extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            password:'',
            email:'',
            type:'Buyer',
            mobile:'',
            age:'',
            batch:'UG1',
            shop:'BBC',
            openingTime:'00:00 AM',
            closingTime:'00:00 PM'
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeBatch = this.onChangeBatch.bind(this);
        this.onChangeShop = this.onChangeShop.bind(this);
        this.onChangeOpening = this.onChangeOpening.bind(this);
        this.onChangeClosing = this.onChangeClosing.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }



    onChangeName(e){
        this.setState({name: e.target.value});
    }

    onChangeType(e){
        this.setState({type: e.target.value});
    }

    onChangePassword(e){
       this.setState({password: e.target.value})
    }
    
    onChangeAge(e){
        this.setState({age: e.target.value})
    }

    onChangeEmail(e){
        this.setState({email: e.target.value})
    }

    onChangeMobile(e){
        this.setState({mobile: e.target.value})
    }

    onChangeBatch(e){
        this.setState({batch: e.target.value})
    }

    onChangeShop(e){
        this.setState({shop: e.target.value})
    }

    onChangeOpening(e){
        this.setState({openingTime: e.target.value})
    }

    onChangeClosing(e){
        this.setState({closingTime: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        
        const buyerInfo = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            type: this.state.type,
            mobile: this.state.mobile,
            age: this.state.age,
            batch: this.state.batch
        };

        const vendorInfo = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            type: this.state.type,
            mobile: this.state.mobile,
            shop: this.state.shop,
            openingTime: this.state.openingTime,
            closingTime: this.state.closingTime

        }

        if(this.state.type === 'Buyer'){
            console.log(buyerInfo);
            if(!this.state.name || !this.state.email || !this.state.password || !this.state.age || !this.state.mobile){
                alert('Please enter all the fields');
            }
            else if(!validator.isEmail(this.state.email)){
                alert('Please enter a valid email: a@b.com');
            }
            else if(!validator.isNumeric(this.state.mobile) || this.state.mobile.length !== 10){
                alert('Please enter a valid mobile number: 10 digit number');
            }
            else if(!validator.isNumeric(this.state.age)){
                alert('Please enter a valid age: number');
            }
            else if(this.state.age <= 0){
                alert('Please enter a valid age: number greater than 0');
            }
            
            else{
                axios.post("http://localhost/api/buyer/register", buyerInfo).then(res => {
                    if(res.data.status === 'Email already exists'){
                        alert('You are already registered');
                    }
                    else if(res.data.status === 'Buyer registered successfully'){
                        alert('Registration Successful');
                    }
            
                })
                this.setState({
                    name: "",
                    email: "",
                    password: "",
                    type: "Buyer",
                    mobile: "",
                    age: "",
                    batch: "UG1"
                  });

                window.location.href = "/login";

            }
        }
        else if(this.state.type === 'Vendor'){
            console.log(vendorInfo);
            if(!this.state.name || !this.state.email || !this.state.password || !this.state.shop || !this.state.mobile || !this.state.openingTime || !this.state.closingTime){
                alert('Please enter all the fields');
            }
            else if(!validator.isEmail(this.state.email)){
                alert('Please enter a valid email: a@b.com');
                this.setState({email: ''});
                return;
            }
            else if(!validator.isNumeric(this.state.mobile) || this.state.mobile.length !== 10){
                alert('Please enter a valid mobile number: 10-digit number');
                this.setState({mobile: ''});
                return;
            }
            else{
                axios.post("http://localhost/api/vendor/register", vendorInfo).then(res => {
                    if(res.data.status === 'Email already exists'){
                        alert('You are already registered');
                    }
                    else if(res.data.status === "Vendor registered successfully"){
                        alert('Registration Successful');
                    }
            
                })

                this.setState({
                    name: "",
                    email: "",
                    password: "",
                    type: "Buyer",
                    mobile: "",
                    shop: "JC",
                    openingTime: "",
                    closingTime: "",

                });

                window.location.href = "/login";

        }
    }
            
        


    }


    render(){
        const types = [
            {
                value: "Buyer",
                label: "Buyer",
            },
            {
                value: "Vendor",
                label: "Vendor",
            }
        ];
        
        const batches = [
            {
                value: "UG1",
                label: "UG1",
            },
            {
                value: "UG2",
                label: "UG2",
            },
            {
                value: "UG3",
                label: "UG3",
            },
            {
                value: "UG4",
                label: "UG4",
            },
            {
                value: "UG5",
                label: "UG5",
            }
        ];
        
        const shops = [
            {
                value: "JC",
                label: "JC",
            },
            {
                value: "VC",
                label: "VC",
            },
            {
                value: "BBC",
                label: "BBC",
            }
        ];


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
                        id="outlined-select-type"
                        select
                        label="Select"
                        value={this.state.type}
                        onChange={this.onChangeType}
                        helperText="Please select the type of User."
                        >
                        {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}

                    
                        </TextField>
            
                    </Grid>
                
                {((this.state.type === "Buyer") ? (
                    
                    <div>

                        <Grid item xs={12}>
                            <TextField
                            label="Name"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            margin="normal"
                            variant="outlined"
                            />
                        </Grid>
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
                            <TextField
                            label="Age"
                            value={this.state.age}
                            onChange={this.onChangeAge}
                            margin="normal"
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            label="Mobile"
                            value={this.state.mobile}
                            onChange={this.onChangeMobile}
                            margin="normal"
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            id="outlined-select-type"
                            select
                            label="Select"
                            value={this.state.batch}
                            onChange={this.onChangeBatch}
                            helperText="Please select the Batch."
                            >
                            {batches.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}

                        
                            </TextField>
            
                        </Grid>
                        </div>

                    

                ) : (
                    <div>
                        <Grid item xs={12}>
                            <TextField
                            label="Name"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            margin="normal"
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            label="Email"
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
                            <TextField
                            id="outlined-select-type"
                            select
                            label="Select"
                            value={this.state.shop}
                            onChange={this.onChangeShop}
                            helperText="Please select the Shop."
                            >
                            {shops.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}

                        
                            </TextField>
            
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            label="Mobile"
                            value={this.state.mobile}
                            onChange={this.onChangeMobile}
                            margin="normal"
                            variant="outlined"
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                        <input
                            type="time"
                            step="1"
                            value={this.state.openingTime}
                            className="form-control"
                            placeholder="Time"
                            onChange={(ev) => {this.setState({openingTime: ev.target.value})}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <input
                            type="time"
                            step="1"
                            value={this.state.closingTime}
                            className="form-control"
                            placeholder="Time"
                            onChange={(ev) => {this.setState({closingTime: ev.target.value})}}
                            />
                        </Grid>
                    </div>
                ))}
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={this.onSubmit}>
                        Signup
                    </Button>
                </Grid>
            </Container>
            </div>
        );
    }
                    
}










export default Signup;
