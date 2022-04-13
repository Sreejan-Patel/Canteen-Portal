import Grid from "@mui/material/Grid";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { Component} from "react";
import { Container, Table, Button} from "@mui/material";
import axios from "axios";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Time from 'react-time';
import emailjs from '@emailjs/browser';




class Orders extends Component {

    constructor(props){
        super(props);
        this.state = {
            type: localStorage.getItem("type"),
            email: localStorage.getItem("email"),
            orders: [],
            MaxOrders: 10,
            AcceptedOrders: 0,
            CookingOrders: 0
        }

        this.handle = this.handle.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleRejection = this.handleRejection.bind(this);
      }  

      componentDidMount(){
        if(this.state.type !== "Vendor"){
            window.location.href = '/'; 
        }
        else{
            this.handle();
        }
      }

        handle(){  
            const user = {
                email: this.state.email
            }

            axios.post('http://localhost/api/orders/email/vendor' , user)
            .then(response => {

                this.setState({
                    orders: response.data
                })

                console.log(this.state.orders);
                const num = this.state.orders.filter(x => x.status === "ACCEPTED").length;
                const num2 = this.state.orders.filter(x => x.status === "COOKING").length;

                this.setState({
                    AcceptedOrders: num,
                    CookingOrders: num2
                })

            })
        }


        handleStatus(user){
            const order = user;

            if(order.status === "PLACED"){
                if(this.state.MaxOrders > (this.state.AcceptedOrders + this.state.CookingOrders)){
                order.status = "ACCEPTED";
                axios.post('http://localhost/api/orders/update/status/'+order._id , order)
                .then(response => {
                    this.handle();
                    })
                    emailjs.send('service_s2dbvt9', 'template_wpgw9rf', {
                        to_name: order.emailBuyer,
                        from_name: this.state.email,
                        message: "Your order has been Accepted"
                    }, 'user_fTenSHQRdEHyRuwdhc3lN')
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
                
                }else{
                    alert("Max Orders Reached");
                }
            } else if(order.status === "ACCEPTED"){
                order.status = "COOKING";
                axios.post('http://localhost/api/orders/update/status/'+order._id , order)
                .then(response => {
                    this.handle();
                })
            } else if(order.status === "COOKING"){
                order.status = "READY FOR PICKUP";
                axios.post('http://localhost/api/orders/update/status/'+order._id , order)
                .then(response => {
                    this.handle();
                })
            } else if(order.status === "READY FOR PICKUP"){
                alert("Order is already ready for pickup");
            }
        }


        handleRejection(user){
            const order = user;
            if(order.status === "COMPLETED" || order.status === "REJECTED" || order.status === "READY FOR PICKUP" || order.status === "COOKING" || order.status === "ACCEPTED"){
                alert("Order is Accepted");
                return;
            }
            else
            {
                order.status = "REJECTED";
                axios.post('http://localhost/api/orders/update/status/'+order._id , order)
                .then(response => {
                    const user = {
                        email: this.state.email
                    }
        
                    axios.post('http://localhost/api/orders/email/vendor' , user)
                    .then(response => {
        
                        this.setState({
                            orders: response.data
                        })
                        console.log(this.state.orders);
                    })
                })
                const newBalance = (order.price*order.quantity) + (order.quantity*order.addon.map(x => x.addonPrice).reduce((a,b) => a+b, 0));
                const newUser = {
                    email: order.emailBuyer,
                    balance: newBalance
                }

                axios.post('http://localhost/api/wallet/add', newUser)
                .then(response => {
                    console.log(response.data);
                })
                emailjs.send('service_s2dbvt9', 'template_wpgw9rf', {
                    to_name: order.emailBuyer,
                    from_name: this.state.email,
                    message: "Your order has been rejected"
                }, 'user_fTenSHQRdEHyRuwdhc3lN')
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                }, function(error) {
                    console.log('FAILED...', error);
                });
            }

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
                <br></br>
                <Grid item >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell>Sr No.</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Addons</TableCell>
                            <TableCell>Tags</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Placed Time</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                            
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.orders.map((user, ind) => (
                            <TableRow key={user._id}>
                                <TableCell>{ind}</TableCell>
                                <TableCell>{user.itemname}</TableCell>
                                <TableCell>{user.price}</TableCell>
                                <TableCell>{user.rating}</TableCell>
                                <TableCell>{user.vnv}</TableCell>
                                <TableCell>{user.addon.map((add,index) => <p key={index}>{add.addonName}</p>)}</TableCell>
                                <TableCell>{user.tags.map((tag,index) => <p key={index}>{tag}</p>)}</TableCell>
                                <TableCell>{user.quantity}</TableCell>
                                <TableCell><Time value={user.placedtime} format="DD/MM/YYYY HH:mm:ss"></Time></TableCell>
                                <TableCell>{user.status}</TableCell>
                                <TableCell><p><Button variant="outlined" onClick={() => this.handleStatus(user)}>MOVE TO NEXT STAGE</Button></p><p><Button variant="outlined" onClick={() => this.handleRejection(user)}>REJECT</Button></p></TableCell>

                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                       
                        

                
            </div>
        )
    }


}

export default Orders;
