import './SideNavBar.css';

import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";

import SideBarButton from './SideBarButton';
import { showToast } from '../Toasts/ToastContainer';

export default function SideNavBar({ onToggle, collapsed }) {
  return (
    <div className="px-3">
      <div className="d-flex justify-content-center py-2">
        <SideBarButton collapsed={collapsed} text="Features1" icon="bi bi-feather"></SideBarButton>{/*href missing*/}
      </div>

      <div className="d-flex justify-content-center py-2">
        <SideBarButton collapsed={collapsed} text="Features2" icon="bi bi-bar-chart-line"></SideBarButton>
      </div>
    </div >
  )
}

SideNavBar.propTypes = {
  collapsed: PropTypes.bool,
  onToggle: PropTypes.func
}
