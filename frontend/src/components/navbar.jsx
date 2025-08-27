export function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{ backgroundColor: "#4F98CA" }}
    >
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          Gatheraway
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/events">
                Events
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/my-plans">
                My Plans
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/friends-plans">
                Friends Plans
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/create-event">
                Create Event
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
