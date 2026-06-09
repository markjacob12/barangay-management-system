import React from "react";
import style from "./BarangayConcernRequest.module.css"; // Siguraduhing may CSS module file ka rin para rito

const BarangayConcernRequest = ({ onOpenModal }) => {
  return (
    <div className={style.requestCardBox}>
      <div className={style.cardFlexContainer}>
        {/* Decorative Concern/Report Megaphone Icon */}
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
              {/* Megaphone / Report Icon */}
              <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </div>
        </div>

        {/* Informational Text Block */}
        <div className={style.textContentBlock}>
          <h3 className={style.cardTitle}>Barangay Concern Request</h3>
          <p className={style.cardDescription}>
            Maghain ng opisyal na reklamo, ulat ukol sa seguridad, o iba pang
            isyu sa komunidad nang direkta sa ating tanggapan.
          </p>
        </div>

        {/* Action Button Trigger Wrapper */}
        <div className={style.buttonActionWrapper}>
          <button
            type="button"
            className={style.primaryRequestBtn}
            onClick={onOpenModal}
          >
            <span>Mag-ulat ng Isyu</span>
            {/* Elegant forward arrow icon */}
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

export default BarangayConcernRequest;
