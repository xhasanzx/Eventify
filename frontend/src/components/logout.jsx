export default function Logout({ onConfirm, onCancel }) {
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1050,
  };

  const modalStyle = {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: "420px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    overflow: "hidden",
  };

  const headerStyle = {
    padding: "16px 20px",
    borderBottom: "1px solid #eee",
    fontWeight: 700,
  };

  const bodyStyle = {
    padding: "16px 20px",
    color: "#444",    
  };

  const footerStyle = {
    padding: "14px 20px",
    borderTop: "1px solid #eee",
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  };

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true">
      <div style={modalStyle}>
        <div style={headerStyle}>Confirm Logout</div>
        <div style={bodyStyle}>
          Are you sure you want to log out? You will need to sign in again.
        </div>
        <div style={footerStyle}>
          <button className="btn btn-outline-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
