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

import { CChartBar } from '@coreui/react-chartjs';
import CIcon from '@coreui/icons-react';
import { cilCloudDownload } from '@coreui/icons';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Hinzufügen eines Ladesignals

  useEffect(() => {
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
  }, []);

  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Filtern nach Abteilung
  const filteredUsers = selectedDepartment === 'All'
    ? users
    : users.filter((user) => user.department === selectedDepartment);

  // Sortieren nach Punkten (absteigend)
  const sortedByPoints = [...filteredUsers].sort((a, b) => b.points - a.points);

  // Sortieren nach CO2 (absteigend)
  const sortedByCO2 = [...filteredUsers].sort((a, b) => b.co2 - a.co2);

  const departments = ['All', 'Engineering', 'Marketing', 'HR', 'Sales'];

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
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                User Performance
              </h4>
              <div className="small text-muted">CO₂ Savings and Points</div>
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
                <CCardHeader>Points Bar Chart</CCardHeader>
                <CCardBody>
                  <CChartBar
                    data={{
                      labels: sortedByPoints.map(
                        (user) => `${user.firstName} ${user.lastName}`
                      ),
                      datasets: [
                        {
                          label: 'Points',
                          backgroundColor: '#f87979',
                          data: sortedByPoints.map((user) => user.points),
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
                          backgroundColor: '#36a2eb',
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
