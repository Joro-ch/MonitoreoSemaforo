import TrafficLight from "../../components/TrafficLight"
import About from "../../components/About"
import Button from "../../components/Button"
import "../../styles/app.css"

export default function Home() {
  return (
    <main className = "app">
      <header className="appHeader">
        <nav>
          <ul className="appHeaderUl">
            <li className="appHeaderLi"> <About /> </li>
            <h1 className="appHeaderTitle"> Monitoreo de una Base de Datos </h1>
            <li className="appHeaderLi"> <Button buttonName = {"Lori"} /> </li>
          </ul>
        </nav>
      </header>
      <aricle className="appBody">
        <TrafficLight/>
      </aricle>
      <aside className="appAside">
        Hola
      </aside>
      <footer className="appFooter">
        Hola
      </footer>
    </main>
  )
}
