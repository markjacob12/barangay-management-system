import React from "react";
import style from "./UserRequestDetails.module.css";
import { useState } from "react";
const UserRequestDetails = ({ request }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!request)
    return <p className={style.noData}>No request details available.</p>;

  const fullName =
    `${request.lastName}, ${request.firstName} ${request.middleName || ""} ${request.suffix || ""}`.trim();

  return (
    <div className={style.detailsContainer}>
      {/* Header Section */}
      <div className={style.headerSection}>
        <div className={style.goldBar}></div>
        <div className={style.headerText}>
          <p className={style.subTitle}>Applicant Name</p>
          <h2 className={style.applicantName}>{fullName}</h2>
        </div>
        <div className={style.badge}>
          {request.typeOfCertificate || "Certificate Request"}
        </div>
      </div>

      <hr className={style.divider} />

      <div className={style.infoGrid}>
        <div className={style.infoCard}>
          <span className={style.label}>Suffix:</span>
          <span className={style.value}>{request.suffix || "N/A"}</span>
        </div>

        <div className={style.infoCard}>
          <span className={style.label}>Quantity:</span>
          <span className={style.value}>{request.quantity || "1"} pc(s)</span>
        </div>

        <div className={style.infoCard}>
          <span className={style.label}>ContactNumber:</span>
          <span className={style.value}>{request.contactNumber}</span>
        </div>

        <div className={style.infoCardFull}>
          <span className={style.label}>Purpose of Request:</span>
          <span className={style.valuePurpose}>
            {request.purpose || "Not Specified"}
          </span>
        </div>
      </div>

      {request?.status === "disapprove" || request?.status === "disapproved" ? (
        <div className={style.disapprovedActionBlock}>
          <div className={`${style.statusAlert} ${style.disapprove}`}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={style.alertIcon}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>
              Status: <span>{request?.status}</span>
            </p>
          </div>

          {/* Form Action Controls */}
          <div className={style.buttonContainer}>
            <button className={style.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? "Ipinapadala..." : "Re-Submit Application"}
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`${style.statusAlert} ${style[request?.status?.toLowerCase() === "disapprove" ? "disapproved" : request?.status?.toLowerCase() || "pending"]}`}
        >
          <p>
            Status:{" "}
            <strong>
              {request?.status ? request.status.toUpperCase() : "Pending"}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default UserRequestDetails;
