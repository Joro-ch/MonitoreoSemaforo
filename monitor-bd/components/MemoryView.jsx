"use client";
import { useState, useEffect } from "react";
import View from "./View";
import PantallaTS from "./PantallaTS";
import Table from "./Table";
import "../styles/memoryview.css";

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
        <View className="view" title="Memory View">
            <div className="memoryview">
                <PantallaTS className="memoryviewTS" />
                <Table className="memoryviewTable" data={dataFromOracle}/>
            </div>
        </View>
    );
}