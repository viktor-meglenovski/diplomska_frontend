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
import ModelStatistics from "./ModelStatistics";

function App() {
    return (
        <div className="App">
            <Header/>
            {getAuthToken() && <Sidebar/>}
            {!getAuthToken() &&
                <Router>
                <Routes>
                    <Route path="/home" element={ <div style={{ width: "100%", backgroundColor: "#EEE", height:"95vh" }}><HomePage/></div>}/>
                    <Route path="/login" element={<div style={{ width: "100%", backgroundColor: "#EEE", height:"95vh" }}><LoginForm/></div>}/>

                    <Route path="*" element={<Navigate to="/home"/>}/>
                </Routes>
            </Router>}

            {/* Other secured routes */}
            {getAuthToken() && (
                <main className="ms-auto" style={{
                    width: "85%",
                    marginTop: "65.6px",
                    padding: "15px 30px",
                    height: "95vh",
                    backgroundColor: "#EEE"
                }}>
                    <Router>
                        <Routes>
                            <Route path="/home" element={<HomePage/>}/>
                            <Route path="/productClusters" element={<ProductClusters/>}/>
                            <Route path="/productCluster/:id" element={<ProductClusterPage/>}/>
                            <Route path="/product/:id" element={<ProductPage/>}/>
                            <Route path="/product/expectedUps" element={<ExpectedUpsDowns filterType="UP"/>}/>
                            <Route path="/product/expectedDowns" element={<ExpectedUpsDowns filterType="DOWN"/>}/>
                            {getRole() === "ROLE_ADMIN" && <Route path="/admin" element={<AdminPanel/>}/>}
                            {getRole() === "ROLE_ADMIN" &&
                                <Route path="/modelStatistics" element={<ModelStatistics/>}/>}
                            <Route path="*" element={<Navigate to="/productClusters"/>}/>
                        </Routes>
                    </Router>
                </main>
            )}

        </div>
    );
}

export default App;