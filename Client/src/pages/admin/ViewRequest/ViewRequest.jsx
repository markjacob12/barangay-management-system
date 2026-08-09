import React, { useState } from "react";
import style from "./ViewRequest.module.css";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import CertificateTemplate from "../CertificateTemplate/CertificateTemplate";

const ViewRequest = ({ request, onClose, statusUpdate }) => {
  const currentStatus = request?.status || "Pending";
  const componentRef = useRef(null);
  const [isPrinted, setIsPrindted] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Certificate-${request?.lastName}`,
    onAfterPrint: () => {
      setIsPrinted(true);
    },
  });

  const handleStatusChange = async (newStatus) => {
    if (!request?._id) return;
    const success = await statusUpdate(request._id, newStatus);
    if (success) {
      alert(`Application updated to ${newStatus}.`);
      onClose();
      window.location.reload();
    } else {
      alert("Hindi ma-update ang status. Subukan muli.");
    }
  };

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div style={{ display: "none" }}>
        <CertificateTemplate ref={componentRef} request={request} />
      </div>

      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={style.docketHeader}>
          <div className={style.headerIconBlock}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div className={style.headerTitles}>
            <h3 className={style.mainTitle}>Application Review Panel</h3>
            <p className={style.subTitle}>
              Official Standards Document Verification Docket
            </p>
          </div>

          <div
            className={`${style.statusBadge} ${style[currentStatus.toLowerCase()]}`}
          >
            {currentStatus}
          </div>

          <button
            className={style.closeXBtn}
            onClick={onClose}
            title="Close Window"
          >
            &times;
          </button>
        </div>

        <div className={style.docketBody}>
          <div className={style.fieldCategoryTitle}>01. Applicant Identity</div>
          <div className={style.infoGrid}>
            <div className={style.dataBlock}>
              <span className={style.metaLabel}>Full Legal Name</span>
              <span className={style.metaValue}>
                {`${request?.lastName || ""}, ${request?.firstName || ""} ${request?.middleName || ""}`}
              </span>
            </div>

            <div className={style.dataBlock}>
              <span className={style.metaLabel}>Suffix Designation</span>
              <span className={style.metaValue}>
                {request?.suffix || "None Specified"}
              </span>
            </div>

            <div className={style.dataBlock}>
              <span className={style.metaLabel}>
                Primary Contact Information
              </span>
              <span className={style.metaValue}>
                {request?.contactNumber || "No Contact Assigned"}
              </span>
            </div>
          </div>

          <div className={style.fieldCategoryTitle}>
            02. Document Requirements
          </div>
          <div className={style.infoGrid}>
            <div className={`${style.dataBlock} ${style.spanFull}`}>
              <span className={style.metaLabel}>
                Requested Certificate Classification
              </span>
              <span className={`${style.metaValue} ${style.docBadgeAccent}`}>
                {request?.typeOfCertificate}
              </span>
            </div>

            <div className={`${style.dataBlock} ${style.spanFull}`}>
              <span className={style.metaLabel}>
                Declared Purpose of Application
              </span>
              <span className={`${style.metaValue} ${style.purposeBlock}`}>
                {request?.purpose || "No formal business purpose stated."}
              </span>
            </div>

            <div className={style.dataBlock}>
              <span className={style.metaLabel}>Requested Volume</span>
              <span className={style.metaValue}>
                {request?.quantity} {request?.quantity > 1 ? "Copies" : "Copy"}
              </span>
            </div>

            <div className={style.dataBlock}>
              <span className={style.metaLabel}>System Filing Datestamp</span>
              <span className={style.metaValue}>
                {request?.createdAt
                  ? new Date(request.createdAt).toLocaleString("en-PH", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "Timestamp Error"}
              </span>
            </div>
          </div>
        </div>

        <div className={style.docketActions}>
          {currentStatus === "Pending" ? (
            <>
              <button
                type="button"
                className={style.btnCancelRecord}
                onClick={() => handleStatusChange("Disapprove")}
              >
                Disapprove Application
              </button>

              <button
                type="button"
                className={style.btnAuthorizeRecord}
                onClick={() => handleStatusChange("Approve")}
              >
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
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Approve & Authorize
              </button>
            </>
          ) : (
            <div className={style.finalizedActionWrapper}>
              <div className={style.finalizedMessage}>
                This application has already been{" "}
                <strong>{currentStatus.toLowerCase()}d</strong>.
              </div>
              {/* Lalabas lang ang Print Button sa action bar kapag APPROVED ang estado */}
              {currentStatus?.toLowerCase() === "approve" && (
                <button
                  type="button"
                  onClick={handlePrint}
                  className={style.printBtn}
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
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                  </svg>
                  I-print ang Sertipiko
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewRequest;
