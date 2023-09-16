"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'; 
import Button from './Button';

export default function About() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Button buttonName = {"About"} onClickButton={toggleModal} />

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sobre Nosotros</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={toggleModal}
                ></button>
              </div>
              <div className="modal-body">
                <h3>Desarrollado por:</h3>
                <ul>
                    <li> Dylan Sandí López </li>
                    <li> John Rojas Chinchilla </li>
                    <li> Camilo Gonzales Fuentes </li>
                    <li> Alberto  </li>
                </ul>
                <p>
                    Administración de Bases de Datos EIF 404 <br/>
                    Proyecto MonitoreoSemaforo <br/>
                    Segundo Semestre del 2023 <br/>
                    Escuela de Ciencias Exactas <br/>
                    Universidad Nacional de Costa Rica
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}