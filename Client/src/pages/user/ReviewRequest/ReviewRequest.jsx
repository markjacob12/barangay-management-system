import React from "react";
import style from "./ReviewRequest.module.css";

const ReviewRequest = ({ onNext, data, onBack, type, isSubmitting }) => {
  return (
    <div className={style.reviewContainer}>
      <div className={style.reviewCard}>
        <div className={style.topBar}>
          <button
            type="button"
            className={style.backBtn}
            onClick={onBack}
            disabled={isSubmitting}
          >
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
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Bumalik</span>
          </button>
          <div className={style.statusBadge}>Pagsusuri / Verification</div>
        </div>

        <div className={style.header}>
          <h2>
            Review for <span className={style.highlightText}>{type}</span>
          </h2>
          <p>
            Pakisuri nang mabuti ang iyong mga detalye sa ibaba bago tuluyang
            i-submit ang request.
          </p>
          <div className={style.goldDivider}></div>
        </div>

        <div className={style.infoGrid}>
          <div className={style.infoBox}>
            <span className={style.metaLabel}>First Name</span>
            <p className={style.metaValue}>{data?.firstName || "—"}</p>
          </div>

          <div className={style.infoBox}>
            <span className={style.metaLabel}>Middle Name</span>
            <p className={style.metaValue}>{data?.middleName || "—"}</p>
          </div>

          <div className={style.infoBox}>
            <span className={style.metaLabel}>Last Name</span>
            <p className={style.metaValue}>{data?.lastName || "—"}</p>
          </div>

          <div className={style.infoBox}>
            <span className={style.metaLabel}>Suffix</span>
            <p className={style.metaValue}>{data?.suffix || "N/A"}</p>
          </div>

          <div className={style.infoBox}>
            <span className={style.metaLabel}>Contact Number</span>
            <p className={style.metaValue}>{data?.contactNumber || "—"}</p>
          </div>

          <div className={style.infoBox}>
            <span className={style.metaLabel}>Quantity (Kopya)</span>
            <p className={style.metaValue}>{data?.quantity || "1"}</p>
          </div>

          <div className={`${style.infoBox} ${style.fullWidth}`}>
            <span className={style.metaLabel}>
              Purpose / Dahilan ng Pagkuha
            </span>
            <p className={`${style.metaValue} ${style.purposeBox}`}>
              {data?.purpose || "—"}
            </p>
          </div>
        </div>

        <div className={style.warningNotice}>
          <span className={style.noticeIcon}>ℹ️</span>
          <p>
            Ang maling impormasyon ay maaaring magdulot ng pagkaantala o
            kanselasyon ng iyong dokumento.
          </p>
        </div>

        <div className={style.buttonContainer}>
          <button
            type="button"
            className={style.editBtn}
            onClick={onBack}
            disabled={isSubmitting}
          >
            I-edit ang detalye
          </button>

          <button
            type="button"
            className={style.nextBtn}
            onClick={onNext}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className={style.spinnerLayout}>
                <div className={style.loadingCircle}></div>
                <span>Ipinapadala...</span>
              </div>
            ) : (
              <>
                <span>I-submit ang Request</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewRequest;
