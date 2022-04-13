import Grid from "@mui/material/Grid";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { Component} from "react";
import { Table, Button, TextField} from "@mui/material";
import axios from "axios";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MenuItem, FormControl, InputLabel, Select} from "@mui/material";
import validator from "validator";




class Order extends Component {

    constructor(props){
        super(props);
        this.state = {
            type: localStorage.getItem("type"),
            email: localStorage.getItem("email"),
            fooditems: [],
            addons: [],
            quantity: 1,
            balance: 0
        }

        this.handle = this.handle.bind(this);
        this.handleAddon = this.handleAddon.bind(this);
        this.handleOrder = this.handleOrder.bind(this);

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
            
            axios.get('http://localhost/api/vendor/fooditem/')
            .then(response => {

                this.setState({
                    fooditems: response.data,
                })
                console.log(this.state.fooditems);

                
            })
            .catch(function (error) {
                console.log(error);
            })

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

        handleAddon(e){
            const {
                target: { value },
              } = e;
              this.setState(
                // On autofill we get a JSON-ified value.
                {addons: typeof value === Object ? value.split(Object): value}
              );
        }

        handleOrder(item){
            const order = {
                addon: this.state.addons,
                emailBuyer: this.state.email,
                emailVendor: item.email,
                itemname: item.itemname,
                placedtime: new Date(),
                price: parseInt(item.price),
                quantity: parseInt(this.state.quantity),
                rating: item.rating,
                shop: item.shop,
                status: "PLACED",
                tags: item.tags,
                vendor: item.vendor,
                vnv: item.vnv
            
            }
            if(this.state.balance < (order.price*order.quantity) + (order.quantity*order.addon.map(x => x.addonPrice).reduce((a,b) => a+b, 0))){
                alert("Insufficient Balance");
                window.location.href = '/buyer/wallet';
            }

            else if(!this.state.quantity || !this.state.addons){
                alert("Please fill all the fields");
                return;
            }
            else if(item.quantity <= 0){
                alert("Please enter a valid quantity");
                return;
            }
            else{
                const newBalance = (order.price*order.quantity) + (order.quantity*order.addon.map(x => x.addonPrice).reduce((a,b) => a+b, 0));
                console.log(newBalance);
                axios.post('http://localhost/api/orders/add', order)
                .then(response => {
                    console.log(response);
                    alert("Order Placed");
                })
                .catch(function (error) {
                    console.log(error);
                })

                const user = {
                    email: this.state.email,
                    balance: newBalance
                }

                axios.post('http://localhost/api/wallet/deduct' , user)
                .then(response => {
                    console.log(response);
                    this.setState({
                        balance: response.data.balance
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
                this.handle();
            }
            this.setState({
                addons: [],
                quantity: 1
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
                            <TableCell>Tags</TableCell>
                            <TableCell>Shop</TableCell>
                            <TableCell>Vendor</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Addons</TableCell>
                            <TableCell>Action</TableCell>
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
                                <TableCell>{user.tags.map((tag,index) => <p key={index}>{tag}</p>)}</TableCell>
                                <TableCell>{user.shop}</TableCell>
                                <TableCell>{user.vendor}</TableCell>
                                <TableCell><TextField
                                                id="outlined-number"
                                                label="Number"
                                                type="number"
                                                onChange={(e) => this.setState({quantity: e.target.value})}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                </TableCell>
                                <TableCell>
                                    <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-simple-select-label">Addon</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.addons}
                                        label="Addon"
                                        multiple
                                        onChange={this.handleAddon}
                                    >
                                        {user.addon.map((add, index) => (
                                        <MenuItem key={index} value={add}>
                                            {add.addonName}
                                        </MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl>
                                    
                                </TableCell>
                                <TableCell><Button variant="contained"  onClick={() => this.handleOrder(user)}>Buy</Button></TableCell>
                                                



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

export default Order;
