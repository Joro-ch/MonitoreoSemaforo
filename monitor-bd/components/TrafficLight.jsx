import "../styles/trafficLight.css"
import Light from "./Light";

export default function TrafficLight({color}) {
    return (
        <div className="trafficLight">
            <Light color={"green"}/>
            <Light color={"yellow"}/>
            <Light color={"red"}/>
        </div>
    );
}