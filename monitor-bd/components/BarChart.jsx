"use client";
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

const BarChart = (props) => {

  Chart.register(annotationPlugin);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Configura los datos y opciones del gráfico de barras superpuestas
    const data = {
      labels: props.labels,
      datasets: props.datasets,
    };
    const options = {
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 1,
        },
      },
      responsive: true,
      plugins: {
        autoColors:false,
        legend: {
          position: 'bottom',
        },
        annotation:{
          annotations: {
        
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          beginAtZero: true,
        },
        y: {
          stacked: true,
        },
      },
    };

    props.labels.forEach((e,i) =>{
      const sum = props.datasets[0].data[i] + props.datasets[1].data[i]
      options.plugins.annotation.annotations["line"+i]={
          type: 'line',
          xMin: sum*0.85,
          xMax: sum*0.85,
          yMin:i-0.5,
          yMax:i+0.5,
          borderColor: 'red',
          value: sum * 0.85,
          
        }
    })
  

    // Crea el gráfico de barras horizontales superpuestas
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });

    return () => {
      // Limpia el gráfico cuando el componente se desmonta
      myChart.destroy();
    };
  }, [props.labels, props.datasets]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;
