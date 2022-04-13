import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { Component } from "react";
import { Button,TextField } from "@mui/material";
import axios from "axios";


class Wallet extends Component {

    constructor(props){
      super(props);
      this.state = {
          type: localStorage.getItem("type"),
          email: localStorage.getItem("email"),
          balance: 0,
          amount: ''
      }

        this.handleAmount = this.handleAmount.bind(this);
        this.handleAdd = this.handleAdd.bind(this);


    }  

    componentDidMount(){
        if(this.state.type !== "Buyer"){
            window.location.href = '/'; 
        }
        else{
            this.handleAmount();
        }
    }

    handleAmount(){

        const user = {
            email: this.state.email
        }
        axios.post('http://localhost/api/wallet/balance', user).then(res => {
            console.log(res.data,"response1");
                this.setState({
                    balance: res.data.balance
                })
        })
    }

    handleAdd(){
        const user = {
            email: this.state.email,
            balance: this.state.amount
        }

        if(user.balance <= 0){
            alert("Enter Valid Amount");
            return;
        }

        axios.post('http://localhost/api/wallet/add', user).then(res => {
            console.log(res.data,"response1");
                this.setState({
                    balance: res.data.balance,
                    amount: ''
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
                    <Typography variant="h2" >Wallet Balance: {this.state.balance}</Typography>
                  </Grid>
                <br></br>
                <br></br>
                  <Grid item>
                    <TextField
                        id="outlined-basic"
                        value={this.state.amount}
                        onChange={(e) => this.setState({ amount: e.target.value })}
                        helperText="Price in Integer"
                    />
                    
                  </Grid>
                  <Button variant="contained" color="primary" onClick={this.handleAdd}>Add Money</Button>

                </Grid>
            </div>
        )
    }


}

export default Wallet;
