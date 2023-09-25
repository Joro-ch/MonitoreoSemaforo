"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

export function GraphicSGA() {
    const [points, setPoints] = useState([1555, 1600, 1000]);
    const [labels, setLabels] = useState([]);

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
            console.log(newData.data);
            const newLabel = ''; // Etiqueta para el eje X

            // Actualiza el estado con los nuevos puntos y etiquetas
            //elimina el primer elemento del array si es mayor a 10
            setPoints((prevPoints) => {
                let updatedPoints = [...prevPoints, newData.data];
                // Verifica si la longitud del array es mayor que 10
                if (updatedPoints.length > 10) {
                    // Elimina el primer elemento
                    updatedPoints = updatedPoints.slice(1);
                }
                return updatedPoints;
            });
            setLabels((prevLabels) => {
                let updatedLabels = [...prevLabels, newLabel]
                if (updatedLabels.length > 10) {
                    // Elimina el primer elemento
                    updatedLabels = updatedLabels.slice(1);
                }
                return updatedLabels;
            });
        }, 3000);

        return () => clearInterval(intervalId);

    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Mi gráfico de línea',
                data: points, // Aquí debes proporcionar tus datos reales
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };


    return (
        <Line 
            options={options}
            data={data}
            style={{ maxWidth: '25vw', maxHeight: '50vh' }} // Ajusta el ancho y alto máximo según tus preferencias
        />
    );
}

export default GraphicSGA;