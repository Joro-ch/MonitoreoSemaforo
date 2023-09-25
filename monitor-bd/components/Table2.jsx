import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Table2() {

    const [item, setItem] = useState([]);
    useEffect(() => {
        charge();
    }, []);

    const charge = async () =>{


        try{const response = await fetch(`/api/sentenciasInfo`, {
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
            setItem(data.infoSentencias)
            
        }
    }catch (error) {
        console.error("Error al obtener la capacidad de los tablespaces", error);
    }   
    };

    return(
        <table>
             <thead>
                <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                <th scope="col">Consumo</th>
                <th scope="col">Id</th>
                <th scope="col">Sql</th>
                </tr>
            </thead>
            <tbody>
                {item.map((e,i) =>(
                        <tr key={i}>
                            <td scope="row">{e.Fecha}</td>
                            <td>{e.Hora}</td>
                            <td>{e.SESSION_CPU}</td>
                            <td>{e.SESSIONID}</td>
                            <td>{e.ACTION_NAME}</td>
                        </tr>
                    )
                    )}
                
            </tbody>
        </table>
    );
}