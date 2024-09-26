import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function SideBarButton({ collapsed, text, href, onClick, icon }) {
  return (
    <NavLink to={href}>
      <Button
        className="nav-button" // Wir verwenden die 'nav-button'-Klasse aus dem CSS
        onClick={onClick}
      >
        <i className={icon}></i>
        {!collapsed && <span className="ps-2">{text}</span>} {/* Text wird nur bei expandiertem Zustand angezeigt */}
      </Button>
    </NavLink>
  );
}

SideBarButton.propTypes = {
  collapsed: PropTypes.bool,
  text: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string
};
