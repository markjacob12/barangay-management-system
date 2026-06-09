import React, { useState, useMemo } from "react";
import { useConcern } from "../../../components/Hooks/useConcern";
import style from "./Concern.module.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import ConcernDetails from "../ConcernDetails/ConcernDetails";

const Concern = () => {
  const { concernData, updateStatus } = useConcern();
  const [currentTab, setCurrentTab] = useState("pending");
  const [searchRequest, setSearchRequest] = useState("");
  const [selectedConcern, setSelectedConcern] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic Badge Color para sa Priority Level
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Emergency":
        return style.emergency;
      case "High Priority":
        return style.high;
      case "Medium Priority":
        return style.medium;
      default:
        return style.low;
    }
  };

  // Dynamic Badge Color para sa Estado/Status
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

  const filteredRequest = useMemo(() => {
    return concernData.filter((req) => {
      const concernStatus = (req.status || "pending").toLowerCase();

      switch (currentTab) {
        case "pending":
          return concernStatus === "pending";
        case "approved":
          return (
            concernStatus === "in progress" || concernStatus === "approved"
          );
        case "disapproved":
          return (
            concernStatus === "disapproved" || concernStatus === "disapprove"
          );
        case "resolved":
          return concernStatus === "resolved";
        default:
          return true;
      }
    });
  }, [concernData, currentTab]); // Mag-recalculate lang kapag nagbago ang data o tab

  const handleOpenModal = (req) => {
    console.log("Data na ipapasa:", req);
    setSelectedConcern(req); // Ipinapasa bilang array dahil .map ang nasa modal mo
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="nav-bar">
        <Navbar />
      </section>
      <section className="side-bar">
        <Sidebar />
      </section>

      <main className={style.mainContent}>
        {/* Elite Admin Dashboard Header */}
        <div className={style.dashboardHeader}>
          <div>
            <span className={style.govSubtag}>SISTEMA NG ADMINISTRASYON</span>
            <h2>Mga Ulat at Hinaing ng Mamamayan</h2>
          </div>
          <div className={style.goldDivider}></div>
        </div>
        <div className={style.tabContainer}>
          <button
            type="button"
            className={`${style.tabBtn} ${currentTab === "pending" ? style.activeTab : ""}`}
            onClick={() => setCurrentTab("pending")}
          >
            {/* Modern Animated/Style Hourglass Icon */}
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
            {/* Double Check / Shield Success Icon */}
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
            Isinasagawa (In Progress)
          </button>

          <button
            type="button"
            className={`${style.tabBtn} ${currentTab === "resolved" ? style.activeTab : ""}`}
            onClick={() => setCurrentTab("resolved")}
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
              <path d="M4 22V4" />
              <path d="M4 4h12l-2 4 2 4H4" />
            </svg>
            Nalutas (Resolved )
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
        {/* Responsive Table Component Container */}
        <div className={style.tableResponsive}>
          {filteredRequest && filteredRequest.length > 0 ? (
            <table className={style.concernTable}>
              <thead>
                <tr>
                  <th style={{ width: "110px" }}>Larawan</th>
                  <th>Uri ng Hinaing</th>
                  <th>Antas ng Priyoridad</th>
                  <th>Estado</th>
                  <th>Petsa at Oras</th>
                  <th style={{ width: "120px", textAlign: "center" }}>
                    Aksyon
                  </th>
                </tr>
              </thead>
              <tbody>
                {concernData.map((req) => (
                  <tr key={req._id}>
                    {/* Column 1: Image Frame */}
                    <td>
                      <div className={style.tableImageWrapper}>
                        <img
                          src={req.image}
                          alt="Evidence Thumbnail"
                          className={style.tableThumb}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/100x100/001f3f/d4af37?text=No+Photo";
                          }}
                        />
                      </div>
                    </td>

                    {/* Column 2: Concern Type Details */}
                    <td className={style.textPrimary}>
                      <span className={style.concernMainText}>
                        {req.typeOfConcern}
                      </span>
                    </td>

                    {/* Column 3: Priority Pill Badge */}
                    <td>
                      <span
                        className={`${style.priorityBadge} ${getPriorityClass(req.priorityLevel)}`}
                      >
                        {req.priorityLevel || "Low Priority"}
                      </span>
                    </td>

                    {/* Column 4: Status Badge */}
                    <td>
                      <span
                        className={`${style.statusBadge} ${getStatusClass(req.status)}`}
                      >
                        {req.status || "PENDING"}
                      </span>
                    </td>

                    {/* Column 5: Document Timestamp */}
                    <td className={style.textSecondary}>
                      <div className={style.dateTimeBlock}>
                        <span className={style.tableDate}>
                          {req.date || "N/A"}
                        </span>
                        <span className={style.tableTime}>
                          {req.time || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Column 6: Action Trigger Button */}
                    <td style={{ textAlign: "center" }}>
                      <button
                        className={style.btnView}
                        onClick={() => handleOpenModal(req)}
                      >
                        Tingnan
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* Premium Empty state wrapper */
            <div className={style.emptyContainer}>
              <div className={style.emptyIconWrapper}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={style.emptyIconSVG}
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  <line x1="9" y1="14" x2="15" y2="14"></line>
                </svg>
              </div>
              <h3>Walang Nakitang mga Ulat</h3>
              <p>
                Kasalukuyang malinis ang listahan o walang ipinadalang hinaing
                ang mga mamamayan sa kasalukuyang kategorya.
              </p>
            </div>
          )}
        </div>
        {isModalOpen && (
          <ConcernDetails
            data={selectedConcern}
            onClose={() => setIsModalOpen(false)}
            statusUpdate={updateStatus}
          />
        )}
      </main>
    </>
  );
};

export default Concern;
