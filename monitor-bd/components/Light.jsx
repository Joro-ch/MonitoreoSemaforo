import "../styles/lights.css"

export default function Light ({color}) {
    return (
        <div className={`light`} style={{ backgroundColor: color }}></div>
    );
}