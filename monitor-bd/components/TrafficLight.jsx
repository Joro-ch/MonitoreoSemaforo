"use client";
import "../styles/trafficLight.css"
import Light from "./Light";
import { useState, useEffect } from "react";


export default function TrafficLight() {
    const [lightRed, setLightRed] = useState("#444444");
    const [lightYellow, setLightYellow] = useState("#444444");
    const [lightGreen, setLightGreen] = useState("#444444");
    

    const getData = async () => {
        // Realiza la consulta a la base de datos Oracle
        const response = await fetch('api/sgaInfo');
        const dato = await response.json();

        // Devuelve el valor en vivo
        return dato;
    };


    useEffect(() => {
        // Llama a la función de recuperación de datos
        const intervalId = setInterval(async () => {
            const newData = await getData();
            console.log("Datos: ", newData.data[0] );
        
            if(newData.data[0] >= 2000) {
                setLightRed("#FF0000");
                setLightYellow("#444444");
                setLightGreen("#444444");
            }

            if(newData.data[0] > 1000 && newData.data[0] < 2000) {
                setLightRed("#444444");
                setLightYellow("#FFFF00");
                setLightGreen("#444444");
            }

            if(newData.data[0] <= 1000) {
                setLightRed("#444444");
                setLightYellow("#444444");
                setLightGreen("#00FF00");
            }
           
        }, 3000);

        return () => clearInterval(intervalId);

    }, []);

    return (
        <div className="trafficLight">
            <Light color={lightRed}/>
            <Light color={lightYellow}/>
            <Light color={lightGreen}/>
        </div>
    );
}