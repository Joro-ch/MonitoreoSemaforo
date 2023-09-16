import "../styles/lights.css"

export default function Light ({color = "gray"}) {
    return (
        <div className={`light`} style={{ backgroundColor: color }}></div>
    );
}