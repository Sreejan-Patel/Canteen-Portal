import Grid from "@mui/material/Grid";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { Component } from "react";
import { Container, MenuItem, Button , TextField } from "@mui/material";
import axios from "axios";
import validator from "validator";



class BuyerProfile extends Component {

    constructor(props){
      super(props);
      this.state = {
            type: localStorage.getItem("type"),
            email: localStorage.getItem("email"),
            name: "",
            age: "",
            mobile: "",
            batch: "",
            password: "",
            balance: 0

      }

        this.handle = this.handle.bind(this);

        // handle changes
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeBatch = this.onChangeBatch.bind(this);

        // handle updates
        this.handleName = this.handleName.bind(this);
        this.handleAge = this.handleAge.bind(this);
        this.handleBatch = this.handleBatch.bind(this);
        this.handleMobile = this.handleMobile.bind(this);



    }  

    componentDidMount(){
        if(this.state.type !== "Buyer"){
            window.location.href = '/'; 
        }
        else{
            this.handle();
        }
    }

    onChangeAge(e){
        this.setState({age: e.target.value})
    }

    onChangeMobile(e){
        this.setState({mobile: e.target.value})
    }

    onChangeBatch(e){
        this.setState({batch: e.target.value})
    }

    onChangeName(e){
        this.setState({name: e.target.value});
    }

    handleName(){

        const user = {
            name: this.state.name,
            email: this.state.email
        }
        axios.post('http://localhost/api/buyer/update/name' , user).then(res => {
            console.log(res.data,"response1");
        })
    }

    handleAge(){

        const user = {
            age: this.state.age,
            email: this.state.email
        }
        if(!validator.isInt(this.state.age)){
            alert("Age should be a number");
            this.setState({age: ""})
            return;
        }
        if(this.state.age <= 0){
            alert("Age should be greater than 0");
            this.setState({age: ""})
            return;
        }
        
        axios.post('http://localhost/api/buyer/update/age' , user).then(res => {
            console.log(res.data,"response1");
        })
    }

    handleBatch(){

        const user = {
            batch: this.state.batch,
            email: this.state.email
        }
        axios.post('http://localhost/api/buyer/update/batch' , user).then(res => {
            console.log(res.data,"response1");
        })
    }

    handleMobile(){

        const user = {
            mobile: this.state.mobile,
            email: this.state.email
        }
        if(!validator.isNumeric(this.state.mobile) || this.state.mobile.length !== 10){
            alert("Mobile number should be a 10 digit number");
            this.setState({mobile: ""})
            return;
        }

        axios.post('http://localhost/api/buyer/update/mobile' , user).then(res => {
            console.log(res.data,"response1");
        })
    }



    handle(){

        const user = {
            email: this.state.email
        }
        axios.post('http://localhost/api/buyer/email' , user).then(res => {
            console.log(res.data,"response1");
                this.setState({
                    name: res.data.name,
                    email: res.data.email,
                    password: res.data.password,
                    type: res.data.type,
                    mobile: res.data.mobile,
                    age: res.data.age,
                    batch: res.data.batch

                })
        })
        axios.post('http://localhost/api/wallet/balance', user).then(res => {
            console.log(res.data,"response1");
                this.setState({
                    balance: res.data.balance
                })
        })
    }



    render() {


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

        return(
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/buyer/dashboard">
                    Buyer Dashboard
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav.Link href="/buyer/profile">Profile</Nav.Link>
                    <Nav.Link href="/buyer/items">Items</Nav.Link>
                    <Nav.Link href="/buyer/order">Order</Nav.Link>
                    <Nav.Link href="/buyer/search">Search</Nav.Link>
                    <Nav.Link href="/buyer/myorders">MyOrders</Nav.Link>
                    <Nav.Link href="/buyer/wallet">Wallet</Nav.Link>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                </Navbar.Collapse>
                <Navbar.Brand>Balance: {this.state.balance}</Navbar.Brand>
                </Navbar>
                <br />
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
                                    label="Name"
                                    value={this.state.name}
                                    onChange={this.onChangeName}

                                    />
                                </Grid>
                                <Button variant="contained"  onClick={this.handleName}>Update</Button>


                                <Grid item xs={12}>
                                    <TextField
                                    value={this.state.email}
                                    label="Email"
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                    value={this.state.age}
                                    onChange={this.onChangeAge}
                                    label="Age"
                                    />
                                
                                </Grid>
                                <Button variant="contained"  onClick={this.handleAge}>Update</Button>

                                <Grid item xs={12}>

                                    <TextField
                                    value={this.state.mobile}
                                    onChange={this.onChangeMobile}
                                    label="Mobile"
                                    />
                                
                                </Grid>
                                <Button variant="contained"  onClick={this.handleMobile}>Update</Button>
                                
                                <Grid item xs={12}>
                                    <TextField
                                    select
                                    label="Batch"
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
                                <Button variant="contained"  onClick={this.handleBatch}>Update</Button>
                        
                </Container>

                
            </div>

            
        )
    }


}

export default BuyerProfile;