// components/Table.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/table.css';

export default function Table({ data = [] }) {
  return (
    <div className="custom-scroll-table-container">
      <table className="tableView">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">TableSpace</th>
            <th scope="col">Tamaño (en MB)</th>
            <th scope="col">Usado (%)</th>
            <th scope="col">Table</th>
            <th scope="col">Tipo de Constraint</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
