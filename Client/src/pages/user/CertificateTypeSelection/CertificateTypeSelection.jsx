import React from "react";
import style from "./CertificateTypeSelection.module.css";

const CertificateTypeSelection = ({ onSelect }) => {
  // Ginawa nating array of objects para may kasamang malinis na deskripsyon at mga icon
  const certificates = [
    {
      id: "Barangay Indigency",
      title: "Barangay Indigency",
      subtitle: "Katibayan para sa tulong pinansyal o medikal.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      id: "Barangay Permit",
      title: "Barangay Permit",
      subtitle: "Pahintulot para sa negosyo o iba pang aktibidad.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
    },
    {
      id: "Barangay Residency",
      title: "Barangay Residency",
      subtitle: "Patunay na ikaw ay lehitimong naninirahan dito.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
    },
    {
      id: "Barangay Clearance",
      title: "Barangay Clearance",
      subtitle: "Pangkalahatang patunay ng mabuting pagka-mamamayan.",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
    },
  ];

  return (
    <div className={style.selectionContainer}>
      <div className={style.headerSection}>
        <h2 className={style.title}>Pumili ng Uri ng Dokumento</h2>
        <p className={style.subtitle}>
          Piliin ang kailangang sertipiko sa ibaba upang awtomatikong ihanda ang
          tamang application form.
        </p>
        <div className={style.goldDivider}></div>
      </div>

      <div className={style.cardGrid}>
        {certificates.map((cert) => (
          <button
            key={cert.id}
            type="button"
            className={style.certCard}
            onClick={() => onSelect(cert.id)}
          >
            <div className={style.cardHeaderAxis}>
              <div className={style.iconHousing}>{cert.icon}</div>
              <div className={style.arrowWrapper}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>

            <div className={style.cardTextMeta}>
              <span className={style.certName}>{cert.title}</span>
              <p className={style.certDescription}>{cert.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CertificateTypeSelection;
