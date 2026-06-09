import React from "react";
import style from "./BarangayConcernFromReview.module.css";

const BarangayConcernFormReview = ({ data, onBack, onSubmit }) => {
  // Helper para sa kulay ng Priority Badge base sa tindi ng ulat
  const getPriorityClassName = (priority) => {
    switch (priority) {
      case "Emergency":
        return style.badgeEmergency;
      case "High Priority":
        return style.badgeHigh;
      case "Medium Priority":
        return style.badgeMedium;
      default:
        return style.badgeLow;
    }
  };

  return (
    <div className={style.reviewContainer}>
      {/* Header Block Panel */}
      <div className={style.reviewHeader}>
        <span className={style.govSubtag}>OPISYAL NA ULAT NG MAMAMAYAN</span>
        <h2>Pagsusuri ng mga Detalye (Review Report)</h2>
        <p>
          Pakisuri nang mabuti ang mga nakatala sa ibaba bago tuluyang isumite
          ang iyong ulat sa pamunuan.
        </p>
        <div className={style.goldDivider}></div>
      </div>

      {/* Main Review Grid Area */}
      <div className={style.reviewContentGrid}>
        {/* Left Side: Text Details */}
        <div className={style.infoPanel}>
          <div className={style.reviewField}>
            <span className={style.reviewLabel}>Type of Concern</span>
            <div className={style.reviewValue}>
              {data?.typeOfConcern || "—"}
            </div>
          </div>

          <div className={style.reviewField}>
            <span className={style.reviewLabel}>Specific Concern</span>
            <div className={style.reviewValue}>
              {data?.specificConcern || "—"}
            </div>
          </div>

          <div className={style.reviewField}>
            <span className={style.reviewLabel}>Priority Level</span>
            <div className={style.reviewValue}>
              <span
                className={`${style.priorityBadge} ${getPriorityClassName(data?.priorityLevel)}`}
              >
                {data?.priorityLevel || "Low Priority"}
              </span>
            </div>
          </div>

          <div className={style.reviewField}>
            <span className={style.reviewLabel}>Incident Location</span>
            <div className={style.reviewValue}>{data?.location || "—"}</div>
          </div>

          <div className={style.reviewField}>
            <span className={style.reviewLabel}>Date & Time Registered</span>
            <div className={style.reviewValue}>
              {data?.date && data?.time ? `${data.date} | ${data.time}` : "—"}
            </div>
          </div>

          <div className={style.reviewFieldFull}>
            <span className={style.reviewLabel}>Complete Description</span>
            <div className={style.reviewValueBox}>
              {data?.description || "Walang nakalagay na deskripsyon."}
            </div>
          </div>
        </div>

        {/* Right Side: Document/Photo Evidence Media Box */}
        <div className={style.evidencePanel}>
          <span className={style.reviewLabel}>Photo Evidence</span>
          <div className={style.imageContainerBox}>
            {data?.preview ? (
              <div className={style.imageWrapper}>
                <img
                  src={data.preview}
                  alt="Official Evidence Preview"
                  className={style.evidenceImage}
                />
              </div>
            ) : (
              <div className={style.noImagePlaceholder}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" />
                  <circle cx="9" cy="11" r="2" />
                  <path d="M21 15l-5-5L5 18" />
                </svg>
                <span>Walang nakalakip na larawan bilang patunay.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer System Control Action Buttons */}
      <footer className={style.actionFooter}>
        <button type="button" onClick={onBack} className={style.btnBack}>
          ← Baguhin ang Detalye
        </button>
        <button type="button" onClick={onSubmit} className={style.btnSubmit}>
          Isumite ang Opisyal na Report ✓
        </button>
      </footer>
    </div>
  );
};

export default BarangayConcernFormReview;
