import React, { useMemo } from "react";
import style from "./SuccessStep.module.css";

const SuccessStep = ({ data, type, onCloseModal }) => {
  const requestor = `${data?.firstName || "Gabriel"} ${data?.lastName || "Garcia"}`;
  const certificate = type || "Barangay Indigency";

  // Gumamit tayo ng useMemo para hindi pabago-bago ang Tracking ID kapag nag-render ang state
  const trackingId = useMemo(() => {
    return "BRGY-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  }, []);

  return (
    <div className={style.successWrapper}>
      <div className={style.modernCard}>
        <div className={style.content}>
          {/* Engineered Animated SVG Checkmark Burst */}
          <div className={style.iconCircle}>
            <svg className={style.checkmarkSvg} viewBox="0 0 52 52">
              <circle
                className={style.checkmarkCircle}
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className={style.checkmarkCheck}
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>

          <h1 className={style.successTitle}>
            Matagumpay na <span>Naipadala!</span>
          </h1>

          <p className={style.successMessage}>
            Ang iyong request ay kasalukuyan nang pinoproseso ng barangay
            registry system. Makatatanggap ka ng SMS notification sa iyong
            cellphone kapag handa na itong pirmahan at kunin.
          </p>

          {/* Premium Digital Receipt Slip Overlay */}
          <div className={style.detailsBox}>
            <div className={style.detailsHeader}>Official Request Receipt</div>

            <div className={style.detailsBody}>
              <div className={style.detailsRow}>
                <span className={style.label}>Tracking ID</span>
                <span className={`${style.value} ${style.trackingBadge}`}>
                  {trackingId}
                </span>
              </div>

              <div className={style.detailsRow}>
                <span className={style.label}>Document Type</span>
                <span className={style.value}>{certificate}</span>
              </div>

              <div className={style.detailsRow}>
                <span className={style.label}>Requestor Name</span>
                <span className={style.value}>{requestor}</span>
              </div>

              <div className={style.detailsRow}>
                <span className={style.label}>Quantity (Kopya)</span>
                <span className={style.value}>
                  {data?.quantity || "1"} Copy
                </span>
              </div>
            </div>
          </div>

          {/* Core Return Navigation Button */}
          <div className={style.actionSection}>
            <button
              type="button"
              className={style.doneBtn}
              onClick={onCloseModal || (() => window.location.reload())}
            >
              Bumalik sa Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStep;
