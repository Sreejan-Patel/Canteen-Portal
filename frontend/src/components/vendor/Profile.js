import Grid from "@mui/material/Grid";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { Component } from "react";
import { Container, MenuItem, Button , TextField , Paper} from "@mui/material";
import axios from "axios";
import validator from "validator";



class VendorProfile extends Component {

    constructor(props){
      super(props);
      this.state = {
            type: localStorage.getItem("type"),
            email: localStorage.getItem("email"),
            name: "",
            mobile: "",
            password: "",
            shop: "",
            openingTime: "",
            closingTime: ""

      }

        this.handle = this.handle.bind(this);

        // handle changes
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onChangeShop = this.onChangeShop.bind(this);
        this.onChangeOpening = this.onChangeOpening.bind(this);
        this.onChangeClosing = this.onChangeClosing.bind(this);

        // handle updates
        this.handleName = this.handleName.bind(this);
        this.handleShop = this.handleShop.bind(this);
        this.handleMobile = this.handleMobile.bind(this);
        this.handleOpening = this.handleOpening.bind(this);
        this.handleClosing = this.handleClosing.bind(this);



    }  

    componentDidMount(){
        if(this.state.type !== "Vendor"){
            window.location.href = '/'; 
        }
        else{
            this.handle();
        }
    }

    onChangeShop(e){
        this.setState({shop: e.target.value})
    }

    onChangeMobile(e){
        this.setState({mobile: e.target.value})
    }

    onChangeOpening(e){
        this.setState({openingTime: e.target.value})
    }

    onChangeClosing(e){
        this.setState({closingTime: e.target.value})
    }

    onChangeName(e){
        this.setState({name: e.target.value});
    }

    handleName(){

        const user = {
            name: this.state.name,
            email: this.state.email
        }
        axios.post('http://localhost/api/vendor/update/name' , user).then(res => {
            console.log(res.data,"response1");
            this.setState({
                name: res.data.name,
            })
        })

        localStorage.setItem("vendorName", this.state.name);


    }

    handleShop(){

        const user = {
            shop: this.state.shop,
            email: this.state.email
        }
        axios.post('http://localhost/api/vendor/update/shop' , user).then(res => {
            console.log(res.data,"response1");
            this.setState({
                shop: res.data.shop,
            })
        })

        localStorage.setItem("vendorShop", this.state.shop);


    }

    handleOpening(){

        const user = {
            openingTime: this.state.openingTime,
            email: this.state.email
        }
        axios.post('http://localhost/api/vendor/update/opening' , user).then(res => {
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
            

        axios.post('http://localhost/api/vendor/update/mobile' , user).then(res => {
            console.log(res.data,"response1");
        })
    }

    handleClosing(){

        const user = {
            closingTime: this.state.closingTime,
            email: this.state.email
        }
        axios.post('http://localhost/api/vendor/update/closing' , user).then(res => {
            console.log(res.data,"response1");
        })
    }



    handle(){

        const user = {
            email: this.state.email
        }
        axios.post('http://localhost/api/vendor/email' , user).then(res => {
            console.log(res.data,"response1");
                this.setState({
                    name: res.data.name,
                    email: res.data.email,
                    password: res.data.password,
                    type: res.data.type,
                    mobile: res.data.mobile,
                    shop: res.data.shop,
                    openingTime: res.data.openingTime,
                    closingTime: res.data.closingTime

                })

                localStorage.setItem("vendorName", this.state.name);
                localStorage.setItem("vendorShop", this.state.shop);
        })
    }



    render() {


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
                <Navbar.Brand href="/vendor/dashboard">
                    Vendor Dashboard
                </Navbar.Brand>
                </Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav.Link href="/vendor/profile">Profile</Nav.Link>
                    <Nav.Link href="/vendor/menu">Menu</Nav.Link>
                    <Nav.Link href="/vendor/orders">Orders</Nav.Link>
                    <Nav.Link href="/vendor/statistics">Statistics</Nav.Link>
                    <Nav.Link href="/logout">Logout</Nav.Link>

                </Navbar.Collapse>
                </Navbar>
                <br />
                <Paper>
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
                            
                                <br></br>
                                <Grid item xs={12}>

                                    <TextField
                                    value={this.state.mobile}
                                    onChange={this.onChangeMobile}
                                    label="Mobile"
                                    />
                                
                                </Grid>
                                <Button variant="contained"  onClick={this.handleMobile} >Update</Button>
                                <br></br>
                                <br />
                                <Grid item xs={12}>
                                    <TextField
                                    select
                                    label="Shop"
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
                                <Button variant="contained"  onClick={this.handleShop}>Update</Button>
                                <br></br> 
                                <br></br>
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
                                <br></br>
                                <Button variant="contained"  onClick={this.handleClosing}>Update</Button>
                                <br></br>
                                <br></br>
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

                                <br></br>
                                <Button variant="contained"  onClick={this.handleOpening}>Update</Button>
                        
                </Container>
                </Paper>
                
            </div>

            
        )
    }


}

export default VendorProfile;