import './App.css'
import Header from './Header'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import ProductClusters from "./ProductClusters";
import HomePage from "./HomePage";
import LoginForm from "./LoginForm";
import {getAuthToken, getRole} from "../helpers/axios_helper";
import Sidebar from "./Sidebar";
import ProductClusterPage from "./ProductClusterPage";
import ProductPage from "./ProductPage";
import AdminPanel from "./AdminPanel";
import ExpectedUpsDowns from "./ExpectedUpsDowns";

function App() {
    return (
        <div className="App">
            <Header/>
                {getAuthToken() && <Sidebar/>}
                <main className="ms-auto" style={{width:"85%", marginTop:"65.6px", padding:"15px 30px", height:"95vh", backgroundColor:"#EEE"}}>
                    <Router>
                        <Routes>
                            <Route path="/home" element={<HomePage/>}/>
                            <Route path="/login" element={<LoginForm/>}/>

                            //secured routes
                            {getAuthToken() && <Route path="/productClusters" element={<ProductClusters/>}/>}
                            {getAuthToken() && <Route path="/productCluster/:id" element={<ProductClusterPage/>}/>}
                            {getAuthToken() && <Route path="/product/:id" element={<ProductPage/>}/>}
                            {getAuthToken() && <Route path="/product/expectedUps" element={<ExpectedUpsDowns filterType="UP"/>}/>}
                            {getAuthToken() && <Route path="/product/expectedDowns" element={<ExpectedUpsDowns filterType="DOWN"/>}/>}


                            {getAuthToken() && getRole() === "ROLE_ADMIN" && <Route path="/admin" element={<AdminPanel/>}/>}

                            //default route
                            <Route path="*" element={<Navigate to="/home"/>}/>
                        </Routes>
                    </Router>
                </main>
        </div>
    );
}

export default App;