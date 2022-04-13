import Grid from "@mui/material/Grid";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { Component } from "react";
import {Table} from "@mui/material";
import axios from "axios";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




class Items extends Component {

    constructor(props){
        super(props);
        this.state = {
            type: localStorage.getItem("type"),
            email: localStorage.getItem("email"),
            fooditems: []
        }

        this.handle = this.handle.bind(this);
      }  

      componentDidMount(){
        if(this.state.type !== "Buyer"){
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
            axios.get('http://localhost/api/vendor/fooditem/')
            .then(response => {

                this.setState({
                    fooditems: response.data
                })
                console.log(this.state.fooditems);

                
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
                            <TableCell>Shop</TableCell>
                            <TableCell>Vendor</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.fooditems.map((user, ind) => (

                            <TableRow key={user._id}>
                                <TableCell>{ind}</TableCell>
                                <TableCell>{user.itemname}</TableCell>
                                <TableCell>{user.price}</TableCell>
                                <TableCell>{user.rating}</TableCell>
                                <TableCell>{user.vnv}</TableCell>
                                <TableCell>{user.addon.map((add,index) => <p key={index}>{add.addonName}</p>)}</TableCell>
                                <TableCell>{user.tags.map((tag,index) => <p key={index}>{tag}</p>)}</TableCell>
                                <TableCell>{user.shop}</TableCell>
                                <TableCell>{user.vendor}</TableCell>
                                

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

export default Items;
