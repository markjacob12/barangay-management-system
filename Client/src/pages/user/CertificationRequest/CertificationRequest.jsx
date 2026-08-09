import React from "react";
import style from "./CertificationRequest.module.css";

const CertificationRequest = ({ onOpenModal }) => {
  return (
    <div className={style.requestCardBox}>
      <div className={style.cardFlexContainer}>
        <div className={style.iconColumn}>
          <div className={style.badgeIconCircle}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
          </div>
        </div>

        <div className={style.textContentBlock}>
          <h3 className={style.cardTitle}>Online Document Certification</h3>
          <p className={style.cardDescription}>
            Mag-aplay nang mabilis para sa Barangay Clearance, Indigency, o
            Residency Certificate gamit ang ating automated registry engine.
          </p>
        </div>

        <div className={style.buttonActionWrapper}>
          <button
            type="button"
            className={style.primaryRequestBtn}
            onClick={onOpenModal}
          >
            <span>Gumawa ng Request</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificationRequest;
