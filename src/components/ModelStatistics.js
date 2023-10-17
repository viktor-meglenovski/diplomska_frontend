import * as React from "react";
import Plotly from "react-plotly.js";
import repository from "../repository/repository";
import {useState} from "react";

export default function ModelStatistics(props) {
    const [visualization, setVisualization] = useState("")

    const get_visualization = () => {
        repository.get_model_statistics_visualization()
            .then((response) => response.data)
            .then((data) => setVisualization(data))
            .catch((error) => {
                console.error(error);
            });
    }

    React.useEffect(() => {
        get_visualization()
    }, []);

    return (
        <div className="h-100 w-100">
            <h1>Model Statistics</h1>
            <hr/>
            <div className="border" style={{height:"90%"}}>
                <Plotly  data={visualization.data} layout={visualization.layout} config={visualization.config} className="w-100 h-100"/>
            </div>
        </div>
    );
}