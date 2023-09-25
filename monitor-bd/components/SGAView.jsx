import View from "./View";
import GraphicSGA from "./GraphicSGA";
import TrafficLight from "./TrafficLight";
import Table2 from "./Table2";
import "../styles/sgaview.css";

export default function SGAView () {
    return (
        <View title="SGA Viewer" className="view">
            <div className="sgaview">
                <GraphicSGA className="sgaviewGraphic" />
                <TrafficLight className="sgaviewTrafficLight" />
                <Table2 className="sgaviewTable"/>
            </div>
        </View>
    );
}
