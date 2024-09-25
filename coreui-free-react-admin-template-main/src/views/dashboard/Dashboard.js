import React, { useState } from 'react';
import classNames from 'classnames';

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';

import { CChartBar } from '@coreui/react-chartjs';

import CIcon from '@coreui/icons-react';
import { cilCloudDownload } from '@coreui/icons';

import WidgetsDropdown from '../widgets/WidgetsDropdown';

const Dashboard = () => {
  // 10 Users with department, CO2 emission, and points
  const users = [
    { firstName: 'John', lastName: 'Doe', department: 'Engineering', co2: 50, points: 80 },
    { firstName: 'Jane', lastName: 'Smith', department: 'Marketing', co2: 30, points: 65 },
    { firstName: 'Alice', lastName: 'Johnson', department: 'HR', co2: 20, points: 90 },
    { firstName: 'Bob', lastName: 'Brown', department: 'Engineering', co2: 40, points: 75 },
    { firstName: 'Charlie', lastName: 'Davis', department: 'Sales', co2: 60, points: 50 },
    { firstName: 'David', lastName: 'Miller', department: 'Marketing', co2: 35, points: 55 },
    { firstName: 'Eva', lastName: 'Wilson', department: 'HR', co2: 15, points: 95 },
    { firstName: 'Frank', lastName: 'Clark', department: 'Sales', co2: 55, points: 60 },
    { firstName: 'Grace', lastName: 'Lee', department: 'Engineering', co2: 45, points: 85 },
    { firstName: 'Hannah', lastName: 'Walker', department: 'HR', co2: 25, points: 70 },
  ];

  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Filtered and sorted users
  const filteredUsers = selectedDepartment === 'All'
    ? users
    : users.filter((user) => user.department === selectedDepartment);

  const sortedUsers = filteredUsers.sort((a, b) => b.points - a.points);

  const departments = ['All', 'Engineering', 'Marketing', 'HR', 'Sales'];

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                User Performance
              </h4>
              <div className="small text-body-secondary">CO₂ Savings and Points</div>
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
            <CCol xs={6}>
              <CCard className="mb-4">
                <CCardHeader>Bar Chart</CCardHeader>
                <CCardBody>
                  <CChartBar
                    data={{
                      labels: sortedUsers.map(
                        (user) => `${user.firstName} ${user.lastName}`
                      ),
                      datasets: [
                        {
                          label: 'Points',
                          backgroundColor: '#f87979',
                          data: sortedUsers.map((user) => user.points),
                        },
                      ],
                    }}
                    options={{
                      indexAxis: 'y', // horizontal bar chart
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
