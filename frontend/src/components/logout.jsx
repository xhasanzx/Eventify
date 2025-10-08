import "../style/style.css";

export default function Logout({ onConfirm, onCancel }) {  

  return (
    <div className="logout-overlay" role="dialog" aria-modal="true">
      <div className="logout-container">
        <div className="logout-title">Confirm Logout</div>
        <div className="logout-body">Are you sure you want to log out?</div>
        <div className="logout-footer">
          <button className="button-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="button-danger" onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
