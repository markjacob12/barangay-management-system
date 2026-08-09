import React, { useState } from "react";
import api from "../../../api/axios";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import style from "./RequestManagement.module.css";
import ViewRequest from "../ViewRequest/ViewRequest";
import { useRequest } from "../../../components/Hooks/useRequest";

const RequestManagement = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [isViewModal, setIsViewModal] = useState(false);
  const [searchRequest, setSearchRequest] = useState("");
  const [currentTab, setCurrentTab] = useState("pending");
  const { updateStatus, requests } = useRequest(searchRequest);

  const handleView = (req) => {
    setSelectedRequest(req);
    setIsViewModal(true);
  };

  const handleClose = () => {
    setIsViewModal(false);
  };

  const getCertificateBadgeClass = (type) => {
    const lowerType = type?.toLowerCase() || "";
    if (lowerType.includes("clearance")) return style.clearance;
    if (lowerType.includes("indigency")) return style.indigency;
    if (lowerType.includes("residency")) return style.residency;
    return style.defaultBadge;
  };

  const filteredRequest =
    requests?.filter((req) => {
      const requestStatus = req.status?.toLowerCase().trim() || "pending";

      let tabMatch = false;
      switch (currentTab) {
        case "pending":
          tabMatch = requestStatus === "pending";
          break;
        case "approved":
          tabMatch = ["approved", "ready", "approve"].includes(requestStatus);
          break;
        case "disapproved":
          tabMatch = ["disapproved", "disapprove", "cancelled"].includes(
            requestStatus,
          );
          break;
        default:
          tabMatch = true;
      }

      // 2. Search Filter Logic (DITO ANG KULANG)
      const searchLower = searchRequest.toLowerCase();
      const searchMatch =
        req.firstName?.toLowerCase().includes(searchLower) ||
        req.lastName?.toLowerCase().includes(searchLower) ||
        req.typeOfCertificate?.toLowerCase().includes(searchLower);

      return tabMatch && searchMatch;
    }) || [];
  return (
    <div className={style["admin-layout"]}>
      <Sidebar />
      <div className={style["main-wrapper"]}>
        <Navbar />
        <div className={style["content-area"]}>
          <div className={style.pageHeaderContainer}>
            <div className={style.titleBlock}>
              <h2 className={style.pageTitle}>Document Requests Panel</h2>
              <p className={style.pageSubtitle}>
                Review, process, and track clear registries for local community
                clearance certificates
              </p>
            </div>

            <div className={style.headerControlsBlock}>
              <div className={style.searchWrapper}>
                <svg
                  className={style.searchIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search applicant or document..."
                  className={style.searchInput}
                  value={searchRequest}
                  onChange={(e) => setSearchRequest(e.target.value)}
                />
              </div>

              <div className={style.liveCounterBadge}>
                Active Submissions: <strong>{requests?.length || 0}</strong>
              </div>
            </div>
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
              {/* Alert / Ban / X Circle Icon */}
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

          <div className={style.tableContainerShadow}>
            <table className={style.adminTable}>
              <thead>
                <tr>
                  <th>Applicant Name</th>
                  <th>Certificate Type</th>
                  <th>Purpose of Request</th>
                  <th>Filing Date</th>
                  <th className={style.textCenter}>Qty</th>
                  <th className={style.textCenter}>Management Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequest && filteredRequest.length > 0 ? (
                  filteredRequest.map((req) => (
                    <tr key={req._id} className={style.tableInteractiveRow}>
                      <td className={style.primaryNameCell}>
                        {`${req.lastName}, ${req.firstName} ${req.middleName || ""}`}
                      </td>

                      <td>
                        <span
                          className={`${style.certBadge} ${getCertificateBadgeClass(req.typeOfCertificate)}`}
                        >
                          {req.typeOfCertificate}
                        </span>
                      </td>
                      <td className={style.secondaryText}>{req.purpose}</td>
                      <td className={style.dateText}>
                        {new Date(req.createdAt).toLocaleDateString("en-PH", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td
                        className={`${style.textCenter} ${style.quantityText}`}
                      >
                        {req.quantity}
                      </td>
                      <td className={style.actionCenterCell}>
                        <button
                          className={style.viewBtn}
                          onClick={() => handleView(req)}
                          title="Open Comprehensive Document Request File"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          <span>Process File</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className={style.emptyTableWrapper}>
                      <div className={style.emptyStateBox}>
                        <span className={style.emptyStateIcon}>📑</span>
                        <h4>No Pending Document Requests</h4>
                        <p>
                          The system database queue is currently clear of
                          pending applications.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isViewModal && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <button
              className={style.modalCloseBtn}
              onClick={handleClose}
              title="Close Document Panel"
            >
              &times;
            </button>
            <ViewRequest
              request={selectedRequest}
              onClose={handleClose}
              statusUpdate={updateStatus}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestManagement;
