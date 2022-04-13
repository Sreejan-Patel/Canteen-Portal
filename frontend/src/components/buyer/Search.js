import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { Component } from "react";
import axios from "axios";
import Fuse from 'fuse.js';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Table, Button, TextField} from "@mui/material";
import { MenuItem, FormControl, InputLabel, Select} from "@mui/material";
import validator from "validator";


const options = {
    findAllMatches: true,
    includeMatches: false,
    keys: [
      "itemname"
    ]
};


class Search extends Component {

    constructor(props){
      super(props);
      this.state = {
            type: localStorage.getItem("type"),
            email: localStorage.getItem("email"),
            fooditems: [],
            SearchItem: [],
            addons: [],
            quantity: 1,
            balance: 0,
            shop: "",
            tag: ""

      }

        this.handle = this.handle.bind(this);
        this.onSearching = this.onSearching.bind(this);
        this.handleAddon = this.handleAddon.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
        this.onChangeShop = this.onChangeShop.bind(this);
        this.onChangeTag = this.onChangeTag.bind(this);
        this.onClickPriceAsc = this.onClickPriceAsc.bind(this);
        this.onClickPriceDesc = this.onClickPriceDesc.bind(this);
        this.onClickRatingAsc = this.onClickRatingAsc.bind(this);
        this.onClickRatingDesc = this.onClickRatingDesc.bind(this);



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
                fooditems: response.data,
                SearchItem: response.data
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
            alert("Quantity should be greater than 0");
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

    onSearching(e){
        if(!e.target.value){
            this.setState({SearchItem: this.state.fooditems});
            return;
          }
          const fuse = new Fuse(this.state.SearchItem, options);
          this.setState({SearchItem: this.accessItem(fuse.search(e.target.value))});
          console.log(this.state.SearchItem);
    }

    accessItem(fuse){
        let foodlist = [];
        for(let i = 0; i < fuse.length ; i++){
          foodlist.push(fuse[i].item);
        }
        return foodlist;
      }

        onChangeShop(e){
        this.setState({shop: e.target.value})
        var reqShop = e.target.value;
            this.setState({SearchItem: this.state.fooditems.filter(x => x.shop === reqShop)});
        }
        onChangeTag(e){
            this.setState({tag: e.target.value})
            var reqTag = e.target.value;
            this.setState({SearchItem: this.state.fooditems.filter(x => x.tags.includes(reqTag))});
        }

        onClickPriceAsc(){
            this.setState({SearchItem: this.state.SearchItem.sort((a,b) => a.price - b.price)});
        }

        onClickPriceDesc(){
            this.setState({SearchItem: this.state.SearchItem.sort((a,b) => b.price - a.price)});
        }

        onClickRatingAsc(){
            this.setState({SearchItem: this.state.SearchItem.sort((a,b) => a.rating - b.rating)});
        }

        onClickRatingDesc(){
            this.setState({SearchItem: this.state.SearchItem.sort((a,b) => b.rating - a.rating)});
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

        const Tags = [
            {
                value: "Desserts",
                label: "Desserts"
            },
            {
                value: "Beverages",
                label: "Beverages"
            },
            {
                value: "Snacks",
                label: "Snacks"
            },
            {
                value: "Starters",
                label: "Starters"
            },
            {
                value: "Breakfast",
                label: "Breakfast"
            },
            {
                value: "Lunch",
                label: "Lunch"
            },
            {
                value: "Dinner",
                label: "Dinner"
            },
            {
                value: "Hot",
                label: "Hot"
            },
            {
                value: "Cold",
                label: "Cold"
            }
        ];

        const VNV = [
            {
                value: "Veg",
                label: "Veg"
            },
            {
                value: "Non-Veg",
                label: "Non-Veg"
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
                <br></br>
                <br></br>

                <Grid
                  container
                  item
                  direction="column"
                  alignItems="center"
                  style={{ padding: "100px", minHeight: "30px" }}
                >
                    <Grid item>
                    <input className="form-control" type="text" 
                    placeholder="Search" aria-label="Search"
                    onChange={this.onSearching} onClick={this.onSearching} />
                    </Grid>
                    <br></br>

                    <Grid item>

                        <Grid item xs={12}>
                        <Typography variant="h5" >Filter By Shop</Typography>
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
                    </Grid>
                    <br></br>
                    <Grid item>
                        <Grid item xs={12}>
                        <Typography variant="h5" >Filter By Tag</Typography>
                            <TextField
                            id="outlined-select-type"
                            select
                            label="Select"
                            value={this.state.tag}
                            onChange={this.onChangeTag}
                            helperText="Please select the Tag."
                            >
                            {Tags.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}

                        
                            </TextField>
            
                        </Grid>
                    </Grid>
                    <br></br>

                    <Grid item>
                        <Typography variant="h5" >Filter By Type</Typography>
                        <Grid item xs={12}>
                            <TextField
                            id="outlined-select-type"
                            select
                            label="Select"
                            value={this.state.vnv}
                            onChange={this.onChangeVNV}
                            helperText="Please select the Type."
                            >
                            {VNV.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}

                        
                            </TextField>
            
                        </Grid>
                    </Grid>
                    <br></br>
                    <Grid item>
                        <Typography variant="h5" >Filter By Price</Typography>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={this.onClickPriceAsc}>
                                Ascending Order
                            </Button>
                            {"     "}
                            <Button variant="contained" color="primary" onClick={this.onClickPriceDesc}>
                                Descending Order
                            </Button>
                        </Grid>
                    </Grid>
                    <br></br>
                    <Grid item>
                        <Typography variant="h5" >Filter By Rating</Typography>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={this.onClickRatingAsc}>
                                Ascending Order
                            </Button>
                            {"     "}
                            <Button variant="contained" color="primary" onClick={this.onClickRatingDesc}>
                                Descending Order
                            </Button>
                        </Grid>
                    </Grid>

                
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
                            {this.state.SearchItem.map((user, ind) => (
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
                </Grid>
            </div>
        )
    }


}

export default Search;
