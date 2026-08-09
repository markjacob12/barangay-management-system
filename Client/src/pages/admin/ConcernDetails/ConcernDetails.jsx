import React, { useState } from "react";
import style from "./ConcernDetails.module.css";
import ResolveConcernModal from "../ResolveConcernModal/ResolveConcernModal";
import { useConcern } from "../../../components/Hooks/useConcern";

const ConcernDetails = ({ data, onClose, statusUpdate }) => {
  const { resolveConcern } = useConcern();
  const currentStatus = data?.status || "Pending";
  const [viewResolveModal, setViewResolveModal] = useState(false);
  const [selecedConcer, setSelectedConcern] = useState("");

  const handleStatusChange = async (newStatus) => {
    if (!data?._id) return;
    const success = await statusUpdate(data._id, newStatus);

    if (success) {
      alert(`Application updated to ${newStatus}.`);
      window.location.reload();
    } else {
      alert("Hindi ma-update ang status. Subukan muli.");
    }
  };

  if (!data || data.length === 0) return null;
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return style.statusPending;
      case "processing":
        return style.statusProcessing;
      case "resolved":
        return style.statusResolved;
      default:
        return style.statusDefault;
    }
  };

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalBox} onClick={(e) => e.stopPropagation()}>
        <button className={style.btnCloseModal} onClick={onClose} title="Isara">
          &times;
        </button>

        <div key={data._id} className={style.modalContainer}>
          <header className={style.govHeader}>
            <div className={style.headerLeft}>
              <span className={style.govSubtag}>
                REPUBLIKA NG PILIPINAS • TANGGAPAN NG BARANGAY
              </span>
              <h2 className={style.modalMainTitle}>
                Opisyal na Detalye ng Ulat
              </h2>
            </div>
            <div className={style.headerBadges}>
              <span className={`${style.badge} ${getStatusClass(data.status)}`}>
                {data.status || "PENDING"}
              </span>
            </div>
          </header>

          <div className={style.goldDivider}></div>

          <div className={style.mainGrid}>
            <div className={style.leftPanel}>
              <label className={style.panelSectionLabel}>
                KALAKIP NA EBIDENSYA / LARAWAN
              </label>
              <div className={style.imageContainer}>
                <img
                  src={data.image}
                  alt="Official Evidence Document"
                  className={style.evidenceImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/800x600/001f3f/d4af37?text=WALANG+LARAWAN";
                  }}
                />
              </div>
            </div>

            <div className={style.rightPanel}>
              <div className={style.metaProfileCard}>
                <div className={style.profileField}>
                  <label>URI NG HINAING (CONCERN TYPE)</label>
                  <span className={style.valueHighlight}>
                    {data.typeOfConcern || "PANGKALAHATAN"}
                  </span>
                </div>

                <div className={style.profileField}>
                  <label>TIYAK NA PAKSA (SPECIFIC CONCERN)</label>
                  <h3 className={style.specificSubject}>
                    {data.specificConcern || "Walang Tiyak na Paksa"}
                  </h3>
                </div>

                <div className={style.twoColMiniGrid}>
                  <div className={style.profileField}>
                    <label>LOKASYON (LOCATION)</label>
                    <p className={style.valueStandard}>
                      {data.location || "Hindi tinukoy"}
                    </p>
                  </div>
                  <div className={style.profileField}>
                    <label>PETSA AT ORAS (TIMESTAMP)</label>
                    <p className={style.valueStandard}>
                      {data.date || "N/A"}{" "}
                      <span className={style.timeSeparator}>|</span>{" "}
                      {data.time || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className={style.descriptionSection}>
                <label className={style.panelSectionLabel}>
                  BUONG SALAYSAY AT PAGLALARAWAN
                </label>
                <div className={style.officialStatementBox}>
                  <p>
                    {data.description ||
                      "Walang kalakip na deskripsyon o salaysay ang ulat na ito."}
                  </p>
                </div>
              </div>

              <div className={style.actionPanel}>
                {data.status === "Pending" && (
                  <div>
                    {" "}
                    <button
                      className={style.btnApproveAction}
                      onClick={() => handleStatusChange("In Progress")}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Approved
                    </button>
                    <button
                      className={style.btnDisapproveAction}
                      onClick={() => handleStatusChange("Disapproved")}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      Tanggihan ang Ulat (Disapprove)
                    </button>
                  </div>
                )}
                {data.status.toLowerCase() === "in progress" && (
                  <button onClick={() => setViewResolveModal(true)}>
                    Mark as Resolved
                  </button>
                )}

                {viewResolveModal && (
                  <ResolveConcernModal
                    data={data}
                    onClose={() => setViewResolveModal(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcernDetails;
