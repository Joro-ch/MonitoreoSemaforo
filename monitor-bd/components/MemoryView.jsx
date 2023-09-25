"use client";
import { useState, useEffect } from "react";
import View from "./View";
import PantallaTS from "./PantallaTS";
import Table from "./Table";
import "../styles/sgaview.css";

export default function MemoryView () {
    const [dataFromOracle, setDataFromOracle] = useState([]);

    useEffect(() => {
      fetch('/api/tableSpacesInfo')
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
        <View>
            <div className="memoryview">
                <PantallaTS/>
                <Table data={dataFromOracle}/>
            </div>
        </View>
    );
}