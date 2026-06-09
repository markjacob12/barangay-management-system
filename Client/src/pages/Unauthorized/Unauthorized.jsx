import React from "react";
import { useNavigate } from "react-router-dom";
import "./Unauthorized.css";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauth-page">
      <div className="unauth-card">
        <div className="status-badge">401 Error</div>

        <div className="icon-container">
          <div className="gold-shield">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z" />
            </svg>
          </div>
        </div>

        <h2 className="title">Access Restricted</h2>
        <p className="description">
          Access restricted. This page is only available to authorized personnel
          of <strong> PAPA BARANGAY</strong>.
        </p>

        <div className="alert-box">
          <span>⚠️</span>You do not have permission to access this page.
        </div>

        <button className="action-button" onClick={() => navigate("/")}>
          Go back to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
