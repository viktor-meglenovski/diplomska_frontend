import './App.css'
import Header from './Header'
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useHistory} from "react-router-dom";
import ProductClusters from "./ProductClusters";
import HomePage from "./HomePage";
import LoginForm from "./LoginForm";
import {getAuthToken} from "../helpers/axios_helper";
import Sidebar from "./Sidebar";

function App() {
    return (
        <div className="App">
            <Header/>
            <div className="container-fluid">
                <div className="row">
                    {getAuthToken() && <Sidebar/>}
                    <main className="col">
                        <Router>
                            <Routes>
                                <Route path="/home" element={<HomePage/>}/>
                                <Route path="/login" element={<LoginForm/>}/>

                                //secured routes
                                {getAuthToken() && <Route path="/productClusters" element={<ProductClusters/>}/>}

                                //default route
                                <Route path="*" element={<Navigate to="/home"/>}/>
                            </Routes>
                        </Router>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;