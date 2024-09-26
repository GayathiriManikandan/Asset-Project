import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto'; // auto-registers everything
import './dashbord.css'

const Dashboard = () => {
  // Use refs to store chart instances
  const lineChartRef = useRef(null);
  const doughnutChartRef = useRef(null);

  useEffect(() => {
    // Destroy existing chart if it exists before creating a new one
    if (lineChartRef.current) {
      lineChartRef.current.destroy();
    }
    const ctx = document.getElementById('lineChart').getContext('2d');
    lineChartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Assets', 'Employees', 'Updated Assets', 'Daily Assets Utilization', 'Issued Assets'],
        datasets: [{
          label: 'Updated Records',
          data: [60, 70, 35, 40, 25],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        onClick: (event, elements) => {
          if (elements.length) {
            const dataset = elements[0].element.$context.raw;
            alert(`You clicked on ${dataset.label}: ${dataset.data}`);
          }
        }
      }
    });

    // Destroy existing chart if it exists before creating a new one for doughnut chart
    if (doughnutChartRef.current) {
      doughnutChartRef.current.destroy();
    }
    const ctx2 = document.getElementById('doughnut').getContext('2d');
    doughnutChartRef.current = new Chart(ctx2, {
      type: 'polarArea',
      data: {
        labels: ['Assets', 'Employee', 'Updated Assets', 'Daily Assets Utilization', 'Issued Assets'],
        datasets: [{
          label: '# of Votes',
          data: [10, 30, 20, 35, 25],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ]
        }]
      },
      options: {
        responsive: true,
        onClick: (event, elements) => {
          if (elements.length) {
            const dataset = elements[0].element.$context.raw;
            alert(`You clicked on ${dataset.label}: ${dataset.data}`);
          }
        }
      }
    });

    // Cleanup function to destroy charts when component unmounts
    return () => {
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }
      if (doughnutChartRef.current) {
        doughnutChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="container">
        <h1 className="heading">DASHBOARD</h1>
      <div className="cardBox">
        <Card number="60" name="Assets" icon="desktop-sharp" />
        <Card number="80" name="Employees" icon="people" />
        <Card number="60" name="Updated Assets" icon="arrow-up-circle" />
        <Card number="40" name="Issued Assets" icon="server" />
      </div>

      <div className="graphBox">
        <div className="box1">
          <canvas id="lineChart"></canvas>
        </div>
        <div className="box">
          <canvas id="doughnut"></canvas>
        </div>
      </div>
    </div>
  );
};

// Card Component
const Card = ({ number, name, icon }) => (
  <div className="card">
    <div>
      <div className="numbers">{number}</div>
      <div className="cardName">{name}</div>
    </div>
    <div className="iconBx">
      <ion-icon name={icon}></ion-icon>
    </div>
  </div>
);

export default Dashboard;
