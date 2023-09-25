import "../styles/view.css"

export default function View({ children, title = "Title", content }) {
    return (
        <div className="view">
            <h2 className="viewTitle"> 
                {title} 
            </h2>
            {children || "Content"}
        </div>
    );
}