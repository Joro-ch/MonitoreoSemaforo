import About from "./About"
import Button from "./Button"

export default function Nav() {
    return (
        <header className="appHeader">
            <nav>
                <ul className="appHeaderUl">
                    <li className="appHeaderLi"> <About /> </li>
                    <h1 className="appHeaderTitle"> Monitoreo de una Base de Datos </h1>
                    <li className="appHeaderLi"> <Button buttonName = {"Extra"} /> </li>
                </ul>
            </nav>
      </header>
    );
}