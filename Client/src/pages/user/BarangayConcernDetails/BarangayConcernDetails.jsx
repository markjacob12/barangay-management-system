import React, { useEffect } from "react";
import style from "./BarangayConcernDetails.module.css";

const BarangayConcernDetails = ({ data, onClose }) => {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return style.statusPending;
      case "processing":
      case "in progress":
        return style.statusProcessing;
      case "resolved":
      case "completed":
        return style.statusResolved;
      default:
        return style.statusDefault;
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className={style.emptyState}>
        <span>Walang detalyeng mapapakita.</span>
      </div>
    );
  }

  const isResolved = data.status?.toLowerCase() === "resolved";
  const resolvedPhoto =
    data.reslutionImage || data.resolutionImage || data.afterPhoto;

  return (
    <>
      <div className={style.modalOverlay} onClick={onClose}>
        <div className={style.modalBox} onClick={(e) => e.stopPropagation()}>
          <div className={style.detailsContainer}>
            <button className={style.btnCloseModal} onClick={onClose}>
              &times;
            </button>

            {/* Nag-iba ang class ng card kapag resolved para sa mas malawak na grid space */}
            <div
              key={data._id}
              className={`${style.detailCard} ${isResolved ? style.resolvedLayout : ""}`}
            >
              {/* ================= LEFT COLUMN: EVIDENCE PHOTO(S) ================= */}
              <div className={style.imageSection}>
                {!isResolved ? (
                  // KONDISYON A: Kapag HINDI PA RESOLVED (Isang malaking Before Photo lang)
                  <div className={style.singlePhotoBlock}>
                    <label className={style.photoLabel}>
                      Ebidensya ng Hinaing (BEFORE)
                    </label>
                    <div className={style.imageWrapper}>
                      <img
                        src={data.image}
                        alt="Before Evidence"
                        className={style.mainImage}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/600x400/001f3f/d4af37?text=Walang+Attached+na+Larawan";
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  // KONDISYON B: KAPAG RESOLVED NA (Government Audit View - Side by Side)
                  <div className={style.comparisonGrid}>
                    <div className={style.photoBlock}>
                      <label
                        className={`${style.photoLabel} ${style.beforeLabel}`}
                      >
                        BEFORE (Bago Ayusin)
                      </label>
                      <div className={style.imageWrapper}>
                        <img
                          src={data.image}
                          alt="Before Incident"
                          className={style.mainImage}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/600x400/001f3f/d4af37?text=Walang+Larawan";
                          }}
                        />
                      </div>
                    </div>

                    <div className={style.photoBlock}>
                      <label
                        className={`${style.photoLabel} ${style.afterLabel}`}
                      >
                        AFTER (Naisagawa Na)
                      </label>
                      <div className={style.imageWrapper}>
                        <img
                          src={resolvedPhoto}
                          alt="After Resolution"
                          className={style.mainImage}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/600x400/001f3f/d4af37?text=No+After+Photo";
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* METADATA PANEL */}
                <div className={style.metaDataBlock}>
                  <div className={style.ticketIdBlock}>
                    <span className={style.metaLabel}>TICKET ID</span>
                    <span className={style.idValue}>
                      {data._id ? data._id.toUpperCase() : "PENDING"}
                    </span>
                  </div>

                  <div className={style.statusBlock}>
                    <span className={style.metaLabel}>ESTADO NG ULAT</span>
                    <span
                      className={`${style.statusBadge} ${getStatusClass(data.status)}`}
                    >
                      {data.status || "PENDING"}
                    </span>
                  </div>
                </div>
              </div>

              {/* ================= RIGHT COLUMN: CORE DETAILS ================= */}
              <div className={style.infoSection}>
                <div className={style.headerBlock}>
                  <span className={style.govSubtag}>
                    {data.typeOfConcern || "PANGKALAHATANG HINAING"}
                  </span>
                  <h2 className={style.mainTitle}>
                    {data.specificConcern || "Walang Tiyak na Paksa"}
                  </h2>
                </div>

                <div className={style.infoGrid}>
                  <div className={style.gridItem}>
                    <div className={style.iconWrapper}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <div className={style.itemText}>
                      <label>LOKASYON NG INSIDENTE</label>
                      <p>{data.location || "Hindi tinukoy ang lokasyon"}</p>
                    </div>
                  </div>

                  <div className={style.gridItem}>
                    <div className={style.iconWrapper}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div className={style.itemText}>
                      <label>PETSA AT ORAS NG ULAT</label>
                      <p>
                        {data.date || "N/A"} | {data.time || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={style.divider}></div>

                <div className={style.descriptionBlock}>
                  <label className={style.sectionLabel}>
                    BUONG DETALYE NG HINAING
                  </label>
                  <div className={style.descriptionBox}>
                    <p>
                      {data.description || "Walang kalakip na deskripsyon."}
                    </p>
                  </div>
                </div>

                {/* RESOLUTION REMARKS BOX (Lalabas lang din kapag Resolved) */}
                {isResolved && (
                  <div className={style.resolutionRemarksBlock}>
                    <label
                      className={`${style.sectionLabel} ${style.goldText}`}
                    >
                      OPISYAL NA ULAT NG RESOLUSYON (REMARKS)
                    </label>
                    <div className={style.resolutionBox}>
                      <p className={style.remarksText}>
                        {data.resolutionRemarks ||
                          "Walang iniwang karagdagang ulat ang opisyal."}
                      </p>
                      {data.resolutionDate && (
                        <div className={style.resolutionMetaDate}>
                          <span>
                            Petsa Nalutas:{" "}
                            <strong>{data.resolutionDate}</strong>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarangayConcernDetails;
