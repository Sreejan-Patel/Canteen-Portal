import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { Component } from "react";
import axios from "axios";



class BuyerDashboard extends Component {

    constructor(props){
      super(props);
      this.state = {
          type: localStorage.getItem("type"),
          email: localStorage.getItem("email")
      }

      this.handleName = this.handleName.bind(this);


    }  

    componentDidMount(){
        if(this.state.type !== "Buyer"){
            window.location.href = '/'; 
        }
        else{
            this.handleName();
        }
    }

    handleName(){

        const user = {
            email: this.state.email
        }
        axios.post('http://localhost/api/buyer/email' , user).then(res => {
            console.log(res.data,"response1");
                this.setState({
                    name: res.data.name
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

                <Grid
                  container
                  item
                  direction="column"
                  alignItems="center"
                  style={{ padding: "100px", minHeight: "30px" }}
                >
                  <Grid item>
                    <Typography variant="h2" >Welcome {this.state.name}</Typography>
                  </Grid>
                </Grid>
            </div>
        )
    }


}

export default BuyerDashboard;
