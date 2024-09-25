import './App.css';

import { useState } from 'react';
import { useMediaQueries } from './hooks/useMediaQueries';
import { Outlet } from "react-router-dom";

import TopNavBar from './components/TopNav/TopNavBar';
import SideNavBar from './components/SideNav/SideNavBar';

export default function App() {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const { md } = useMediaQueries();

  function handleToggle(collapsed) {
    setSideBarCollapsed(collapsed);
  }

  function getClasses() {
    return (sideBarCollapsed ? "sidebar-collapsed" : "sidebar-expanded");
  }

  if (md && !sideBarCollapsed)
    setSideBarCollapsed(true);

  return (
    <div className="wmc4-app">
      <header>
        <TopNavBar></TopNavBar>
      </header>
      <main>
        <div className="row content-row">
          <div className={getClasses() + " bg-body-tertiary col-scrollable border-end pe-0"}>
            <SideNavBar onToggle={handleToggle} collapsed={sideBarCollapsed}></SideNavBar>
          </div>
          <div className="col col-scrollable border-end p-3">
            <Outlet />
          </div>
        </div>
      </main>
      <footer>
        <p>&copy; 2024 HTL - Villach - Informatik. Alle Rechte vorbehalten.</p>
      </footer>
    </div >
  )
}
