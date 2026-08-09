import React, { useState, useEffect } from "react";
import { useRequest } from "../../../components/Hooks/useRequest";
import api from "../../../api/axios";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import style from "./MyRequests.module.css";
import UserRequestDetails from "../UserRequestDetails/UserRequestDetails";

const MyRequests = () => {
  const { sumbitDelete, requests } = useRequest();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isViewModal, setIsViewModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("pending");

  const handleViewDetails = (req) => {
    setSelectedRequest(req);
    setIsViewModal(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Sigurado ka bang nais mong kanselahin ang request na ito?",
      )
    ) {
      const success = await sumbitDelete(id);
      if (success) {
        setRequests((prev) => prev.filter((req) => req._id !== id));
      }
    }
  };

  const getStatusClass = (status) => {
    const cleanStatus = status?.toLowerCase() || "pending";
    if (cleanStatus === "approved" || cleanStatus === "approve")
      return style.statusApproved;
    if (cleanStatus === "disapproved" || cleanStatus === "disapprove")
      return style.statusRejected;
    return style.statusPending;
  };

  const filteredRequest = requests.filter((req) => {
    const requestStatus = req.status?.toLowerCase() || "pending";
    switch (currentTab) {
      case "pending":
        return requestStatus === "pending";
      case "approved":
        return requestStatus === "approved" || requestStatus === "approve";
      case "disapproved":
        return (
          requestStatus === "disapproved" || requestStatus === "disapprove"
        );
      default:
        return true;
    }
  });
  return (
    <div className={style.pageLayoutContainer}>
      <header className={style.navBarSection}>
        <Navbar />
      </header>

      <div className={style.coreBodyFrame}>
        <aside className={style.sideBarSection}>
          <Sidebar />
        </aside>

        <main className={style.mainContent}>
          <div className={style.sectionHeader}>
            <h2 className={style.pageTitle}>Aking mga Kahilingan</h2>
            <p className={style.pageSubtitle}>
              Subaybayan ang real-time status ng iyong mga aplikasyon para sa
              mga sertipiko.
            </p>
            <div className={style.goldDivider}></div>
          </div>

          <div className={style.tabContainer}>
            <button
              type="button"
              className={`${style.tabBtn} ${currentTab === "pending" ? style.activeTab : ""}`}
              onClick={() => setCurrentTab("pending")}
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
                className={style.tabIcon}
              >
                <path d="M5 2h14"></path>
                <path d="M5 22h14"></path>
                <path d="M19 2v4c0 3.255-2.43 6.315-5.5 7 3.07.685 5.5 3.745 5.5 7v4"></path>
                <path d="M5 2v4c0 3.255 2.43 6.315 5.5 7-3.07.685-5.5 3.745-5.5 7v4"></path>
              </svg>
              Kasalukuyan (Pending)
            </button>

            <button
              type="button"
              className={`${style.tabBtn} ${currentTab === "approved" ? style.activeTab : ""}`}
              onClick={() => setCurrentTab("approved")}
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
                className={style.tabIcon}
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Inaprubahan (Approved)
            </button>

            <button
              type="button"
              className={`${style.tabBtn} ${currentTab === "disapproved" ? style.activeTab : ""}`}
              onClick={() => setCurrentTab("disapproved")}
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
                className={style.tabIcon}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              Tinanggihan (Disapproved)
            </button>
          </div>

          <div className={style.containerRequest}>
            {isLoading ? (
              <div className={style.loadingSkeletonWrapper}>
                <div className={style.skeletonSpinner}></div>
                <p>Kinukuha ang mga talaan...</p>
              </div>
            ) : filteredRequest && filteredRequest.length > 0 ? (
              <div className={style.requestsGridCanvas}>
                {filteredRequest.map((req) => (
                  <div key={req._id} className={style.requestCard}>
                    <div className={style.cardHeader}>
                      <h3 className={style.certTypeTitle}>
                        {req.typeOfCertificate}
                      </h3>
                      <span
                        className={`${style.statusBadge} ${getStatusClass(req.status)}`}
                      >
                        {req.status || "Pending"}
                      </span>
                    </div>

                    <div className={style.cardBody}>
                      <div className={style.metaDataRow}>
                        <span className={style.metaDataLabel}>Aplikante:</span>
                        <span className={style.metaDataValue}>
                          {`${req.firstName} ${req.middleName || ""} ${req.lastName} ${req.suffix || ""}`}
                        </span>
                      </div>

                      <div className={style.metaDataRow}>
                        <span className={style.metaDataLabel}>Dahilan:</span>
                        <span
                          className={`${style.metaDataValue} ${style.truncateText}`}
                        >
                          {req.purpose}
                        </span>
                      </div>

                      <div className={style.metaDataRow}>
                        <span className={style.metaDataLabel}>Contact:</span>
                        <span className={style.metaDataValue}>
                          {req.contactNumber}
                        </span>
                      </div>
                    </div>

                    <div className={style.cardActions}>
                      <button
                        type="button"
                        className={style.viewBtn}
                        onClick={() => handleViewDetails(req)}
                      >
                        Suriin Detalye
                      </button>

                      {(req.status?.toLowerCase() === "pending" ||
                        !req.status) && (
                        <button
                          type="button"
                          className={style.deleteBtn}
                          onClick={() => handleDelete(req._id)}
                        >
                          Kanselahin
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={style.noDataBox}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={style.noDataIconSVG}
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  <line x1="9" y1="14" x2="15" y2="14"></line>
                </svg>

                <h3>Walang mahanap na records</h3>
                <p>
                  Wala pang nakatalagang active requests para sa kasalukuyang
                  account na ito.
                </p>
              </div>
            )}
          </div>

          {isViewModal && (
            <div
              className={style.modalOverlay}
              onClick={() => setIsViewModal(false)}
            >
              <div
                className={style.modalContainer}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={style.modalHeader}>
                  <h3 className={style.modalTitle}>Document Request Details</h3>
                  <button
                    type="button"
                    className={style.closeBtn}
                    onClick={() => setIsViewModal(false)}
                  >
                    &times;
                  </button>
                </div>

                <div className={style.modalBody}>
                  <UserRequestDetails request={selectedRequest} />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyRequests;
