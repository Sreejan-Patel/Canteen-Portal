import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { Component } from "react";
import { Container } from "@mui/material";
import axios from "axios";

class VendorDashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            type: localStorage.getItem("type"),
            email: localStorage.getItem("email")
        }

        this.handleName = this.handleName.bind(this);
      }  

      componentDidMount(){
        if(this.state.type !== "Vendor"){
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
          axios.post('http://localhost/api/vendor/email' , user).then(res => {
              console.log(res.data,"response1");
                  this.setState({
                      name: res.data.name
                  })
                  localStorage.setItem("vendorName", res.data.name);
                  localStorage.setItem("vendorShop", res.data.shop);
          })
      }


    render() {
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
                <br></br>
                <Grid
                  container
                  item
                  direction="column"
                  alignItems="center"
                  style={{ padding: "100px", minHeight: "30px" }}
                >
                  <Grid item>
                    <Typography variant="h2">Welcome {this.state.name}</Typography>
                  </Grid>
                </Grid>
            </div>
        )
    }


}

export default VendorDashboard;
