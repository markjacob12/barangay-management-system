import React, { useState, useMemo } from "react";
import { useConcern } from "../../../components/Hooks/useConcern";
import BarangayConcernDetails from "../BarangayConcernDetails/BarangayConcernDetails";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import style from "../BarangayConcern/BarangayConcern.module.css";

const BarangayConcern = () => {
  const { concernData, loading } = useConcern();
  const [viewDetalis, setViewDetails] = useState();
  const [selecetedConcern, setSelectedConern] = useState(null);
  const [currentTab, setCurrentTab] = useState("pending");

  // Sa loob ng BarangayConcern component:
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
  return (
    <>
      <section className="nav-bar">
        <Navbar />
      </section>
      <section className="side-bar">
        <Sidebar />
      </section>

      <main className={style["mainContent"]}>
        <div className={style.sectionHeader}>
          <h2 className={style.pageTitle}>Concern Reports</h2>
          <p className={style.pageSubtitle}>
            Pamahalaan at subaybayan ang lahat ng iyong isinumiteng ulat at
            kahilingan sa barangay.
          </p>
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
        {filteredRequest && filteredRequest.length > 0 ? (
          <div className={style.cardGrid}>
            {filteredRequest.map((req) => (
              <div key={req._id} className={style.concernCard}>
                {/* Card Image Header Section */}
                <div className={style.cardImageSection}>
                  <img
                    src={req.image}
                    alt="Evidence Thumbnail"
                    className={style.cardThumb}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/400x250/001f3f/d4af37?text=No+Attached+Photo";
                    }}
                  />
                  {/* Dynamic Floating Priority Badge inside Image */}
                  <span
                    className={`${style.priorityBadge} ${getPriorityClass(req.priorityLevel)}`}
                  >
                    {req.priorityLevel || "Low Priority"}
                  </span>
                </div>

                {/* Card Content Details Body */}
                <div className={style.cardBody}>
                  <span className={style.govSubtag}>{req.typeOfConcern}</span>
                  <h4 className={style.specificConcernTitle}>
                    {req.specificConcern ||
                      "Walang tiyak na paksa na inilagay."}
                  </h4>

                  <div className={style.cardDivider}></div>

                  <p className={style.cardFooterText}>
                    <strong>ID:</strong>{" "}
                    <span className={style.monoText}>
                      {req._id.slice(-8).toUpperCase()}
                    </span>
                  </p>
                </div>

                {/* Card Action Interactive Footer */}
                <div className={style.cardActionArea}>
                  <button
                    className={style.btnViewCard}
                    onClick={() => setSelectedConern(req)}
                  >
                    Tingnan Detalye
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={style.noDataBox}>
            {/* Modern Vector Empty Folder/Inbox Icon */}
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

        {selecetedConcern && (
          <BarangayConcernDetails
            data={selecetedConcern}
            onClose={() => setSelectedConern(null)}
          />
        )}
      </main>
    </>
  );
};

export default BarangayConcern;
