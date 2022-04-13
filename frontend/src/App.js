import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from "./components/common/Home";
import Signup from "./components/common/Signup";
import Login from "./components/common/Login";
import Logout from "./components/common/Logout";

// Vendor Dashboard
import VendorDashboard from "./components/vendor/Dashboard";
import VendorProfile from "./components/vendor/Profile";
import Menu from "./components/vendor/Menu";
import Add from "./components/vendor/utils/AddFoodItem";
import Update from "./components/vendor/utils/UpdateFoodItem";
import Orders from "./components/vendor/Orders";
import Statistics from "./components/vendor/Statistics";



// Buyer Dashboard
import BuyerDashboard from "./components/buyer/Dashboard";
import BuyerProfile from "./components/buyer/Profile";
import Items from "./components/buyer/Items";
import Order from "./components/buyer/Order";
import MyOrders from "./components/buyer/MyOrders";
import Wallet from "./components/buyer/Wallet";
import Search from "./components/buyer/Search";





function App() {


  return (
    <BrowserRouter>
      <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          

          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/profile" element={<VendorProfile />} />
          <Route path="/vendor/menu" element={<Menu />} />
          <Route path="/vendor/add" element={<Add />} />
          <Route path="/vendor/update/" element={<Update />} />
          <Route path="/vendor/orders" element={<Orders />} />
          <Route path="/vendor/statistics" element={<Statistics />} />

          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          <Route path="/buyer/profile" element={<BuyerProfile />} />
          <Route path="/buyer/items" element={<Items />} />
          <Route path="/buyer/order" element={<Order />} />
          <Route path="/buyer/myorders" element={<MyOrders />} />
          <Route path="/buyer/wallet" element={<Wallet />} />
          <Route path="/buyer/search" element={<Search />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;