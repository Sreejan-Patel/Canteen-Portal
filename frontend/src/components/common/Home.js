import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { Component } from "react";
import { Container } from "@mui/material";


class Home extends Component {
  
  render() {
    return (

      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="/">
                  Canteen Portal
                </Navbar.Brand>
              </Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav.Link href="/signup">Signup</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Navbar.Collapse>
        </Navbar>
        <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "100px", minHeight: "30px" }}
      >
        <Grid item>
          <Typography variant="h2">Welcome to IIITH Food Ordering Portal</Typography>
        </Grid>
      </Grid>
      </div>
    );
  }
};

export default Home;