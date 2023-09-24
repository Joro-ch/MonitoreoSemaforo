"use client";
const { default: BarChart } = require("./BarChart");
import { useState, useEffect } from 'react';

const PantallaTS = () => {
    const [labels, setLabels] = useState([]);
    const [totalCapacity, setTotalCapacity] = useState([]);
    const [currentCapacity, setcurrentCapacity] = useState([]);
 

    useEffect(() => {
        const intervalId = setInterval(async () => {charge()},3000)
        return () => clearInterval(intervalId);
    }, []);

    const charge = async () =>{
        
        try{const response = await fetch(`/api/tablespaceCapacity`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            alert('Error al obtener la capacidad de los tablespaces')
        }
        else {
            const data = await response.json()
            setLabels(data.tablespaces.map(e => e.tablespaceName));
            setTotalCapacity(data.tablespaces.map(e => e.totalCapacityMB));
            setcurrentCapacity(data.tablespaces.map(e=> e.currentCapacityMB));
            console.log(currentCapacity)
            
        }
    }catch (error) {
        console.error("Error al obtener la capacidad de los tablespaces", error);
    }   
    };


    return (
        <div className="patallaTS">
            <BarChart 
            labels={labels} 
            datasets={[{
            label: 'Megs usados',
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            data: currentCapacity,
            }, {
            label: 'Megs libres',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            data: totalCapacity,
            }]} 
            />
        </div>
    );
}

export default PantallaTS;