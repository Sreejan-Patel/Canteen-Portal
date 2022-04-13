import Grid from "@mui/material/Grid";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { Component } from "react";
import { Container, Table, Button} from "@mui/material";
import axios from "axios";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            type: localStorage.getItem("type"),
            email: localStorage.getItem("email"),
            fooditems: []
        }

        this.handle = this.handle.bind(this);
        this.Delete = this.Delete.bind(this);
        this.Update = this.Update.bind(this);
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
            
            axios.post('http://localhost/api/vendor/fooditem/all' , user)
            .then(response => {

                this.setState({
                    fooditems: response.data
                })
                console.log(this.state.fooditems);
            })
        }

        Delete(id,name){
            axios.post('http://localhost/api/vendor/fooditem/delete/'+id)
            .then(response => {
                this.handle();

            })
        }

        Update(id){
            localStorage.setItem("fooditemid", id);
            window.location.href = '/vendor/update/';
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
                            <Button variant="outlined" href="/vendor/add">Add FoodItem</Button>
                    </Grid>
                </Grid>
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
                            <TableCell>Delete</TableCell>
                            <TableCell>Update</TableCell>
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
                                <TableCell><Button variant="contained" onClick={() => this.Delete(user._id)}>Delete</Button></TableCell>
                                <TableCell><Button variant="contained" onClick={() => this.Update(user._id,user.itemname)}>Edit</Button></TableCell>
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

export default Menu;
