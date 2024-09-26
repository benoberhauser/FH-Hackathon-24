import React, { useEffect, useState } from 'react';
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
} from '@coreui/react';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { CChartBar, CChartDoughnut } from '@coreui/react-chartjs';
import CIcon from '@coreui/icons-react';
import { cilCloudDownload } from '@coreui/icons';
import DoughnutChart from './DoughnutChart';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Hinzufügen eines Ladesignals
  const [currentCO2, setCurrentCO2] = useState(0); // Einsparung von CO2
  const goalCO2 = 1000; // Ziel (z.B. 1000 kg CO2)

  useEffect(() => {
    // Fetch the user data
    fetch('/api/persons')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false); // Daten geladen, Ladeanzeige ausblenden
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Auch im Fehlerfall ausblenden
      });

    // Fetch the total saved CO2
    fetch('/api/fullCO2Savings')
      .then((response) => response.json())
      .then((data) => setCurrentCO2(data)) // setze die eingesparte Menge an CO2
      .catch((error) => console.error('Error fetching CO2 data:', error));
  }, []);

  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Filtern nach Abteilung
  const filteredUsers = selectedDepartment === 'All'
    ? users
    : users.filter((user) => user.department === selectedDepartment);

  // Sortieren nach Punkten (absteigend)
  const sortedByEcoCoins = [...filteredUsers].sort((a, b) => b.ecocoins - a.ecocoins);

  // Sortieren nach CO2 (absteigend)
  const sortedByCO2 = [...filteredUsers].sort((a, b) => b.co2 - a.co2);

  const departments = ['All', 'Engineering', 'Marketing', 'HR', 'Sales'];

  // Berechne die Prozentsatz des eingesparten CO2s im Vergleich zum Ziel
  const co2Percentage = Math.min((currentCO2 / goalCO2) * 100, 100);

  // Ladeanzeige anzeigen, solange Daten abgerufen werden
  if (loading) {
    return (
      <div className="text-center">
        <CSpinner color="primary" />
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow className="mt-4">
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>CO₂ Einsparung (aktueller Stand im Vergleich zum Ziel)</CCardHeader>
                <CCardBody className="d-flex justify-content-center">
                  {/* Übergabe der aktuellen und Zielwerte an das DoughnutChart */}
                  <DoughnutChart currentCO2={currentCO2} goalCO2={goalCO2} />
                </CCardBody>
                <CCardBody className="text-center">
                  <p>
                    Aktuell eingespartes CO₂: <strong>{currentCO2} kg</strong> von <strong>{goalCO2} kg</strong> (Ziel)
                  </p>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>

            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                User Performance
              </h4>
              <div className="small text-muted">CO₂ Savings and EcoCoins</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {departments.map((department) => (
                  <CButton
                    color="outline-secondary"
                    key={department}
                    className="mx-0"
                    active={department === selectedDepartment}
                    onClick={() => setSelectedDepartment(department)}
                  >
                    {department}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>

          <CRow>
            {/* Chart für Punkte */}
            <CCol xs={6}>
              <CCard className="mb-4">
                <CCardHeader>EcoCoins Bar Chart</CCardHeader>
                <CCardBody>
                  <CChartBar
                    data={{
                      labels: sortedByEcoCoins.map(
                        (user) => `${user.firstName} ${user.lastName}`
                      ),
                      datasets: [
                        {
                          label: 'EcoCoins',
                          backgroundColor: '#0cb43f',
                          data: sortedByEcoCoins.map((user) => user.ecocoins),
                        },
                      ],
                    }}
                    options={{
                      indexAxis: 'x', // Horizontaler Balkendiagramm
                      scales: {
                        x: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>

            {/* Chart für CO2 */}
            <CCol xs={6}>
              <CCard className="mb-4">
                <CCardHeader>Eingespartes CO2/Kg Bar Chart</CCardHeader>
                <CCardBody>
                  <CChartBar
                    data={{
                      labels: sortedByCO2.map(
                        (user) => `${user.firstName} ${user.lastName}`
                      ),
                      datasets: [
                        {
                          label: 'CO2 pro Kg',
                          backgroundColor: '#028661',
                          data: sortedByCO2.map((user) => user.co2),
                        },
                      ],
                    }}
                    options={{
                      indexAxis: 'x', // Horizontaler Balkendiagramm
                      scales: {
                        x: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;