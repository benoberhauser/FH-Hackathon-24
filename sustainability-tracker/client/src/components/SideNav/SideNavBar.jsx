import './SideNavBar.css';
import SideBarButton from './SideBarButton';

export default function SideNavBar({ onToggle, collapsed }) {
  return (
    <div className="side-nav-bar"> {/* Die Klasse 'side-nav-bar' wird hier hinzugefügt */}
      <div className="py-2">
        <SideBarButton collapsed={collapsed} text="Dashboard" href="/" icon="bi bi-bar-chart-line"></SideBarButton>
      </div>

      <div className="py-2">
        <SideBarButton collapsed={collapsed} text="Map" href="map" icon="bi bi-geo-alt"></SideBarButton>
      </div>
    </div>
  );
}
