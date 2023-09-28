import * as React from "react";
import repository from "../repository/repository";
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomLoadingSpinner from "./Spinner";

export default function AdminPanel(props) {

    const [loadingScraping, setLoadingScraping] = useState(false);
    const [disableButtons, setDisableButtons] = useState(false);
    const [scrapingStats, setScrapingStats] = useState(null)
    const [totalNumber, setTotalNumber] = useState(null)

    const [selectedFile, setSelectedFile] = useState(null);
    const [loadingAdding, setLoadingAdding] = useState(false);
    const [addingResult, setAddingResult] = useState(null)

    const [loadingTraining,setLoadingTraining] = useState(false)
    const [trainingDone, setTrainingDone] = useState(false)
    const [trainingResponse, setTrainingResponse] = useState({})

    function scrapeData() {
        setLoadingScraping(true)
        setDisableButtons(true)
        repository
            .scrape_data()
            .then((response) => {
                if (response.data && response.data.csv_file) {
                    const blob = new Blob([response.data.csv_file], {type: 'text/csv'});
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = response.data.file_name;
                    a.click();
                    window.URL.revokeObjectURL(url);
                }
                setScrapingStats(response.data.scraping_stats)
                setTotalNumber(response.data.total_number)

            })
            .catch((error) => {
                // show error message
                console.error(error);
            }).finally(() => {
            setLoadingScraping(false);
            setDisableButtons(false)
        });
    }

    function handleFileChange(event){
        setSelectedFile(event.target.files[0]);
        console.log(selectedFile)
    }
    function trainModel(){
        setLoadingTraining(true)
        setDisableButtons(true)
        repository
            .train_model()
            .then((response) => {
                console.log(response)
                // if (response.data && response.data.csv_file) {
                //     const blob = new Blob([response.data.csv_file], {type: 'text/csv'});
                //     const url = window.URL.createObjectURL(blob);
                //     const a = document.createElement('a');
                //     a.href = url;
                //     a.download = response.data.other_data.file_name;
                //     a.click();
                //     window.URL.revokeObjectURL(url);
                // }
                // setTrainingDone(true)
                // setTrainingResponse(response.data.other_data)
                // console.log(trainingResponse)
            })
            .catch((error) => {
                // show error message
                console.error(error);
            }).finally(() => {
            setLoadingTraining(false);
            setDisableButtons(false)
        });
    }

    function addData(){
        const formData = new FormData();
        formData.append('file', selectedFile);
        setLoadingAdding(true)
        setDisableButtons(true)

        repository
            .add_new_data(formData)
            .then((response) => {
                if(response.data){
                    setAddingResult(response.data.response)
                    setLoadingAdding(false)
                    setDisableButtons(false)
                    setSelectedFile(null)
                }
            })
            .catch((error) => {
                // show error message
                console.error(error);
            }).finally(() => {
            setLoadingAdding(false);
            setDisableButtons(false)
        });
    }

    return (
        <div>
            <div>
                <h1>Admin Panel</h1>
                <hr/>
                <div className="d-flex align-items-center">
                    <h2 className="d-inline me-3">Scrape Data</h2>
                    {loadingScraping ? <CustomLoadingSpinner className="d-inline"/> : null}
                </div>
                <p>Gather new data from the predefined stores. This operation may take several minutes to
                    complete!</p>
                <button className="btn btn-success fw-bold rounded-pill mb-3" style={{width: "400px"}}
                        onClick={scrapeData} disabled={disableButtons}>Start Scraping
                </button>
                {scrapingStats && (
                    <div>
                        <h4><b>{totalNumber}</b> products scraped! See the details in the table below!</h4>
                        <table className="table text-center">
                            <thead>
                            <tr>
                                <th></th>
                                {Object.keys(scrapingStats[Object.keys(scrapingStats)[0]]).map((attribute) => (
                                    <th>{attribute}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(scrapingStats).map((store) => (
                                <tr>
                                    <th>{store}</th>
                                    {Object.keys(scrapingStats[store]).map((number_value) => (
                                        <td>{scrapingStats[store][number_value] != 0 ? scrapingStats[store][number_value] : ''}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <hr/>
                <div className="d-flex align-items-center">
                    <h2 className="d-inline me-3">Upload New Data</h2>
                    {loadingAdding ? <CustomLoadingSpinner className="d-inline"/> : null}
                </div>
                <p>Add new data and re-cluster the products.</p>
                <input type="file" onChange={handleFileChange} className="form-control mb-3" style={{width: "400px"}} id="add-data-csv"/>
                <button className="btn btn-success fw-bold rounded-pill mb-2" style={{width: "400px"}}
                        disabled={disableButtons || selectedFile === null} onClick={addData}>Upload
                </button>
                {addingResult && (
                    <div>
                        <h5>Data insertion completed! <b>{addingResult.existing_products}</b> existing products updated. <b>{addingResult.new_products}</b> new products added.</h5>
                    </div>
                )}
                <hr/>
                <div className="d-flex align-items-center">
                    <h2 className="d-inline me-3">Re-Train Models</h2>
                    {loadingTraining ? <CustomLoadingSpinner className="d-inline"/> : null}
                </div>
                <p>Re-train the models with the newest data.</p>
                <button className="btn btn-success fw-bold rounded-pill mb-1" style={{width: "400px"}} disabled={disableButtons} onClick={trainModel}>
                    Re-train Models
                </button>
                {trainingDone && (
                    <div className="mt-2">
                        <h5>Training dataset created! The dataset contains information about all products that have data available for the last 5 scraping iterations:</h5>
                        <ul>
                            {trainingResponse.dates.map((d)=>(<li>{d.split(' ')[0]}</li>))}
                        </ul>
                        <p>Total <b>{trainingResponse.rows}</b> products are covered in the dataset.</p>
                    </div>
                )}
                <hr/>
            </div>
        </div>
    );
}