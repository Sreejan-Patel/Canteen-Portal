import React, {Component} from 'react';

class Logout extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount(){
        localStorage.setItem("type", "");
        localStorage.setItem("fooditemid", "");
        localStorage.setItem("email", "");
        localStorage.setItem("vendorName", "");
        localStorage.setItem("vendorShop", "");
        window.location.href = "/";
    }
    
    render() {
        return (
            <div><h1>""</h1>
            </div>
        );
    }
}

export default Logout;