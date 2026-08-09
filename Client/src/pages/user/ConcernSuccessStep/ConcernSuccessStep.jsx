import React from "react";
import style from "./ConcernSuccessStep.module.css";

const ConcernSuccessStep = ({ data, onBack }) => {
  const trackingNumber =
    data?.trackingId || `BRGY-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className={style.successContainer}>
      <div className={style.iconWrapper}>
        <div className={style.successCircle}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#d4af37"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      <div className={style.successHeader}>
        <span className={style.govSubtag}>SISTEMA NG PAMUNUAN NG BARANGAY</span>
        <h2>Matagumpay na Naisumite ang Ulat!</h2>
        <p>
          Ang inyong hinaing ay opisyal nang nakatala sa ating database at
          kasalukuyan nang pinoproseso ng mga kinauukulan.
        </p>
      </div>

      <div className={style.referenceCard}>
        <div className={style.cardRow}>
          <span className={style.cardLabel}>Tracking Reference Number:</span>
          <span className={style.cardValue}>{trackingNumber}</span>
        </div>
        <div className={style.cardRow}>
          <span className={style.cardLabel}>Uri ng Ulat (Concern Type):</span>
          <span className={style.cardValueText}>
            {data?.typeOfConcern || "General Concern"}
          </span>
        </div>
        <p className={style.cardNote}>
          *I-screenshot o itabi ang reference number na ito para sa pag-follow
          up ng inyong ulat.
        </p>
      </div>

      <div className={style.infoBanner}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#001f3f"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>
          Magpapadala ang pamunuan ng abiso sa inyong rehistradong account o
          contact number para sa mga updates.
        </span>
      </div>

      <div className={style.actionContainer}>
        <button type="button" onClick={onBack} className={style.btnFinish}>
          Bumalik sa Dashboard
        </button>
      </div>
    </div>
  );
};

export default ConcernSuccessStep;
