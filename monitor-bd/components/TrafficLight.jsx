import "../styles/trafficLight.css"
import Light from "./Light";

export default function TrafficLight({color}) {
    return (
        <div className="trafficLight">
            <Light color={"gray"}/>
            <Light color={"gray"}/>
            <Light color={"gray"}/>
        </div>
    );
}