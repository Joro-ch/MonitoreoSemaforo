import "../styles/trafficLight.css"
import Light from "./Light";

export default function TrafficLight() {
    return (
        <div className="trafficLight">
            <Light/>
            <Light/>
            <Light/>
        </div>
    );
}