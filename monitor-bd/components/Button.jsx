import 'bootstrap/dist/css/bootstrap.min.css';

export default function Button({onClickButton, buttonName}) {
    return (
        <button className="btn btn-primary" onClick={onClickButton} >
            {buttonName}
        </button>
    );
}