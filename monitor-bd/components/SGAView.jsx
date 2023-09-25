import View from "./View";
import GraphicSGA from "./GraphicSGA";
import TrafficLight from "./TrafficLight";
import "../styles/sgaview.css";

export default function SGAView () {
    return (
        <View title="SGA Viewer" className="view">
            <div className="sgaview">
                <GraphicSGA className="sgaviewGraphic" />
                <TrafficLight className="sgaviewTrafficLight" />
            </div>
        </View>
    );
}
