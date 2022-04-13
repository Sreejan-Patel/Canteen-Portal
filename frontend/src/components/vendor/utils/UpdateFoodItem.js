import Grid from "@mui/material/Grid";
import Navbar from 'react-bootstrap/Navbar'
import { Component } from "react";
import { Button, Container , TextField, MenuItem, FormControl, InputLabel, Select, OutlinedInput} from "@mui/material";
import axios from "axios";
import validator from "validator";

class Update extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: localStorage.getItem("fooditemid"),
            email: localStorage.getItem("email"),
            itemname: "",
            price: "",
            rating: "",
            vnv: "",
            tags: [],
            addon: [],
            type: localStorage.getItem("type")


        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangeVNV = this.onChangeVNV.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);
        this.onChangeAddons = this.onChangeAddons.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
      }  

    componentDidMount(){
        if(this.state.type !== "Vendor"){
            window.location.href = '/'; 
        }
        else{
            axios.get("http://localhost/api/vendor/fooditem/" + this.state.id)
            .then(res => {
                if(res.data.status === "FoodItem does not exist"){
                    alert("FoodItem does not exist");
                }
                else{
                    this.setState({
                        itemname: res.data.itemname,
                        rating: res.data.rating,
                        vnv: res.data.vnv,
                    });
                    console.log(this.state);
                }
            })
            .catch(err => {
                console.log(err);
            });
            
        }

    }

    onChangeName(e){
        this.setState({itemname: e.target.value});
    }

    onChangePrice(e){
        this.setState({price: parseInt(e.target.value)})
    }

    onChangeRating(e){
        this.setState({rating: parseInt(e.target.value)})
    }

    onChangeVNV(e){
        this.setState({vnv: e.target.value});
    }

    onChangeAddons(e){
        const {
            target: { value },
          } = e;
          this.setState(
            // On autofill we get a JSON-ified value.
            {addon: typeof value === Object ? value.split(Object): value}
          );

        
    }

    onChangeTags(e){
        const {
            target: { value },
          } = e;
          this.setState(
            // On autofill we get a stringified value.
            {tags: typeof value === 'string' ? value.split(',') : value}
          );

        
    }

    handleUpdate(e){
        e.preventDefault();
        const item = {
            addon: this.state.addon,
            email: this.state.email,
            itemname: this.state.itemname,
            price: this.state.price,
            rating: this.state.rating,
            tags: this.state.tags,
            vnv: this.state.vnv,
            vendor: localStorage.getItem("vendorName"),
            shop: localStorage.getItem("vendorShop")

        }
        console.log(item);


        if(!this.state.itemname || !this.state.price || !this.state.vnv || !this.state.tags || !this.state.addon){
            alert("Please fill all the fields");
        }
        else if(!validator.isNumeric(this.state.price)){
            alert("Price should be a number");
            this.setState({price: ""});
            return;
        }
        else if(this.state.price <= 0){
            alert("Price should be greater than 0");
            this.setState({price: ""});
            return;
        }
        else{
            axios.post("http://localhost/api/vendor/fooditem/update/" + this.state.id, item)
            .then(res => {
                console.log(res.data);
                if(res.data.status === "FoodItem does not exist"){
                    alert("FoodItem does not exist");
                }
                else if(res.data.status === "FoodItem updated successfully"){
                    alert("FoodItem updated successfully");
                }
            })
            .catch(err => {
                console.log(err);
            });   

        }
        window.location.href = '/vendor/menu';
    }



    render() {
        const VNV = [
            {
                value: "Veg",
                label: "Veg"
            },
            {
                value: "Non-Veg",
                label: "Non-Veg"
            }
        ]

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
        ]

        const Addons = [
            {
                value: {addonName: "Cheese", addonPrice: 10},
                label: "Cheese",
                key: 1

            },
            {
                value: {addonName: "Tomato Sauce", addonPrice: 5 },
                label: "Tomato Sauce",
                key: 2
            },
            {
                value: {addonName: "Onion", addonPrice: 10},
                label: "Onion",
                key: 3

            },
            {
                value: {addonName: "Egg", addonPrice: 10},
                label: "Egg",
                key: 4
            },
            {
                value: {addonName: "Chicken", addonPrice: 50},
                label: "Chicken",
                key: 5
            },
            {
                value: {addonName: "Coca Cola", addonPrice: 20},
                label: "Coca Cola",
                key: 6
            },
            {
                value: {addonName: "Curd", addonPrice: 10},
                label: "Curd",
                key: 7
            },
            {
                value: {addonName: "Mayonnaise", addonPrice: 10},
                label: "Mayonnaise",
                key: 8
            }

        ]

        
            
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
                    {/* <Nav.Link href="/vendor/menu">Menu</Nav.Link>
                    <Nav.Link href="/vendor/add">Add</Nav.Link>
                    <Nav.Link href="/vendor/profile">Profile</Nav.Link> */}
                </Navbar.Collapse>
                </Navbar>
                <br></br>
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
                            value={this.state.itemname}
                            onChange={this.onChangeName}
                            
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            label="Price"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                            helperText="Price in Integer"
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                        id="outlined-select-type"
                        select
                        label="Veg/Non-Veg"
                        value={this.state.vnv}
                        onChange={this.onChangeVNV}
                        helperText="Please select the type."
                        >
                        {VNV.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}

                    
                        </TextField>
            
                        </Grid>
                        <br></br>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-addon-label">Addons</InputLabel>
                            <Select
                            labelId="demo-multiple-addon-label"
                            id="demo-multiple-addons"
                            multiple
                            value={this.state.addon}
                            renderValue={selected => selected.map(item => item.addonName).join(', ')}
                            onChange={this.onChangeAddons}
                            input={<OutlinedInput label="Addons" />}
                            >
                            {Addons.map((option) => (
                                <MenuItem key={option.key} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <br></br>
                        
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-tag-label">Tags</InputLabel>
                            <Select
                            labelId="demo-multiple-tag-label"
                            id="demo-multiple-tags"
                            multiple
                            value={this.state.tags}
                            onChange={this.onChangeTags}
                            input={<OutlinedInput label="Tags" />}
                            >
                            {Tags.map((option) => (
                                <MenuItem
                                key={option.value}
                                value={option.value}
                                
                                >
                                {option.label}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        
                            
                        <br></br>
                        <Button variant="contained" color="primary" onClick={this.handleUpdate}>Update</Button>
                        

                         

                </Container>

            </div>
        )
    }


}

export default Update;
