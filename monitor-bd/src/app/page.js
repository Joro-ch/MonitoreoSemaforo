"use client";
import TrafficLight from "../../components/TrafficLight"
import About from "../../components/About"
import Button from "../../components/Button"
import "../../styles/app.css"
import Table from "../../components/Table"
import GraphicSGA from "../../components/GraphicSGA";
import { useState, useEffect } from "react";

export default function Home() {

  const [dataFromOracle, setDataFromOracle] = useState([]);

  useEffect(() => {
    // Llama a la API para obtener los datos de Oracle aquí
    fetch('/api/tableSpacesInfo') // Asegúrate de que la ruta sea correcta
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setDataFromOracle(data.data);
        }
      })
      .catch((error) => {
        console.error('Error al obtener datos de Oracle:', error);
      });
  }, []);

  return (
    <main className = "app">
      <header className="appHeader">
        <nav>
          <ul className="appHeaderUl">
            <li className="appHeaderLi"> <About /> </li>
            <h1 className="appHeaderTitle"> Monitoreo de una Base de Datos </h1>
            <li className="appHeaderLi"> <Button buttonName = {"Extra"} /> </li>
          </ul>
        </nav>
      </header>
      <aricle className="appBody">
        <div className="appBodyDiv">
          <GraphicSGA />
        </div>
        <TrafficLight/>
      </aricle>
      <aside className="appAside">
        <Table data={dataFromOracle}/>
      </aside>
    </main>
  )
}
