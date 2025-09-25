import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/home", label: "Home" },
  { path: "/your-plans", label: "Your Plans" },
  { path: "/friends", label: "Friends" },
  { path: "/account", label: "Account" },
];

export default function Navbar() {
  const location = useLocation();  

  return (
    <>      
      <nav className="navbar navbar-expand navbar-dark shadow-sm">
        <div className="container">
          <Link className="suhba-title" to="/home">
            SUHBA
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    className={`my-nav-item ${
                      location.pathname === item.path ? "active" : "not-active"
                    }`}
                    to={item.path}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}                                            
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
