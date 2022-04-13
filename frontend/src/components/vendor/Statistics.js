import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { Component } from "react";
import { Container } from "@mui/material";
import axios from "axios";

class Statistics extends Component {

    constructor(props){
        super(props);
        this.state = {
            type: localStorage.getItem("type"),
            email: localStorage.getItem("email"),
            allOrders: [],
            totalOrders: 0,
            pendingOrders: 0,
            completedOrders: 0,
            topFive: []
        }

        this.handleOrders = this.handleOrders.bind(this);
        this.handle = this.handle.bind(this);
        this.handleTopFive = this.handleTopFive.bind(this);
      }  

      componentDidMount(){
        if(this.state.type !== "Vendor"){
            window.location.href = '/'; 
        }
        else{
            this.handleOrders();
        }
      }

        handleOrders(){
            const user = {
                email: this.state.email
            }

            axios.post('http://localhost/api/orders/email/vendor' , user)
            .then(response => {

                this.setState({
                    allOrders: response.data,
                    totalOrders: response.data.length
                })
                console.log(this.state.allOrders);
                this.handle();
                this.handleTopFive();
            })

        }

        handleTopFive(){
            const ordersArray = [];
            const ordersQuantity = [];
            const ordersFreq = [];
            const ordersDistinct = [];
            var count = 0;
            var counter = 0;

            for(let i = 0; i < this.state.allOrders.length; i++){
                if(this.state.allOrders[i].status !== "REJECTED" && this.state.allOrders[i].status !== "PLACED"){
                ordersArray.push(this.state.allOrders[i].itemname);
                ordersQuantity.push(this.state.allOrders[i].quantity);
                count = count + 1;
                }
            }

            for (let i = 0; i < count; i++) {
                if (ordersDistinct.indexOf(ordersArray[i]) <= -1) {
                    ordersDistinct.push(ordersArray[i]);
                    ordersFreq[counter] = ordersQuantity[i];
                    counter = counter + 1;
                }
                else {
                    ordersFreq[ordersDistinct.indexOf(ordersArray[i])] = ordersFreq[ordersDistinct.indexOf(ordersArray[i])] + ordersQuantity[i];
                }
            }

            let temp;
            var temp2 = 0;
            let j;
        
            for (let i = 1; i < ordersFreq.length; i++) {
                temp = ordersFreq[i];
                temp2 = ordersDistinct[i];
                j = i - 1;
        
                while (j >= 0 && ordersFreq[j] > temp) {
                    ordersFreq[j + 1] = ordersFreq[j];
                    ordersDistinct[j + 1] = ordersDistinct[j];
                    j = j - 1;
                }
                ordersFreq[j + 1] = temp;
                ordersDistinct[j + 1] = temp2;
            }

            const topFives = [];
            
            if (ordersFreq.length < 5) {
                for (let i = ordersFreq.length - 1; i >= 0; i--) {
                    topFives.push(ordersDistinct[i]);
                }
            }
            else {
                for (let i = 4; i >= 0; i--) {
                    topFives.push(ordersDistinct[i]);
                }
            }
            console.log(topFives);
            this.setState({
                topFive: topFives
            })

        }



        handle(){
            const completed = this.state.allOrders.filter(order => order.status === "COMPLETED");
            const rejected = this.state.allOrders.filter(order => order.status === "REJECTED");
            const completedLength = completed.length;
            const rejectedLength = rejected.length;
            const pending = this.state.totalOrders - completedLength - rejectedLength;

            console.log(completedLength);
            console.log(rejectedLength);
            this.setState({
                pendingOrders: pending,
                completedOrders: completedLength
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
                <Grid
                  container
                  item
                  direction="column"
                  alignItems="center"
                  style={{ padding: "80px", minHeight: "30px" }}
                > 
                  <Grid item>
                    <Typography variant="h4" >Top 5 Items Sold</Typography>
                    <br/>
                    {this.state.topFive.map((item,index) => (
                        <Typography variant="h6" key={index}>{item}</Typography>
                    ))}
                  </Grid>
                </Grid>
                <br/>
                    <hr />
                <Grid
                  container
                  item
                  direction="column"
                  alignItems="center"
                  style={{ padding: "80px", minHeight: "30px" }}
                > 
                  <Grid item>
                    <Typography variant="h4" >Order Statistics:</Typography>
                    <br/>
                    <Typography variant="h5">Orders Placed: {this.state.totalOrders}</Typography>
                    <Typography variant="h5">Pending Orders: {this.state.pendingOrders}</Typography>
                    <Typography variant="h5">Completed Orders: {this.state.completedOrders}</Typography>
                  </Grid>
                </Grid>


                
            </div>
        )
    }


}

export default Statistics;
