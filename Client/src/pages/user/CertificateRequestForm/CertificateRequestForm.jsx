import React, { useState } from "react";
import style from "./CertificateRequestForm.module.css";

const CertificateRequestForm = ({ type, onBack, onNext }) => {
  const [applicationForm, setApplicationForm] = useState({
    lastName: localStorage.getItem("lastName") || "",
    firstName: localStorage.getItem("firstName") || "",
    middleName: localStorage.getItem("middleName") || "",
    typeOfCertificate: type,
    contactNumber: "",
    purpose: "",
    quantity: "1",
    suffix: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^0\d{10}$/.test(applicationForm.contactNumber)) {
      return alert(
        "Ang Contact Number ay dapat may 11 digits at nagsisimula sa 0 (e.g., 09123456789).",
      );
    }

    onNext(applicationForm);
  };

  return (
    <div className={style.formContainer}>
      {/* Dynamic Header Controls */}
      <div className={style.formHeader}>
        <button type="button" onClick={onBack} className={style.backBtn}>
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
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Bumalik</span>
        </button>

        <h2 className={style.formTitle}>
          Application for <span className={style.highlightText}>{type}</span>
        </h2>
        <p className={style.formSubtitle}>
          Kumpletuhin ang mga blangkong field sa ibaba upang maiproseso ang
          iyong opisyal na request.
        </p>
        <div className={style.goldDivider}></div>
      </div>

      <form className={style.mainForm} onSubmit={handleSubmit}>
        <div className={style.inputGrid}>
          <div className={style.inputGroup}>
            <label className={style.fieldLabel}>
              First Name <span className={style.lockIcon}>🔒</span>
            </label>
            <input
              type="text"
              value={applicationForm.firstName}
              readOnly
              className={style.readOnlyInput}
            />
          </div>

          <div className={style.inputGroup}>
            <label className={style.fieldLabel}>
              Middle Name <span className={style.lockIcon}>🔒</span>
            </label>
            <input
              type="text"
              value={applicationForm.middleName}
              readOnly
              className={style.readOnlyInput}
            />
          </div>

          <div className={style.inputGroup}>
            <label className={style.fieldLabel}>
              Last Name <span className={style.lockIcon}>🔒</span>
            </label>
            <input
              type="text"
              value={applicationForm.lastName}
              readOnly
              className={style.readOnlyInput}
            />
          </div>

          <div className={style.inputGroup}>
            <label className={style.fieldLabel}>
              Suffix <span className={style.optionalText}>(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Jr., III, Sr."
              value={applicationForm.suffix}
              onChange={(e) =>
                setApplicationForm({
                  ...applicationForm,
                  suffix: e.target.value,
                })
              }
              className={style.inputField}
            />
          </div>

          <div className={`${style.inputGroup} ${style.fullWidth}`}>
            <label className={style.fieldLabel}>
              Selected Certificate Classification{" "}
              <span className={style.lockIcon}>🔒</span>
            </label>
            <input
              type="text"
              value={type}
              readOnly
              className={style.readOnlyInput}
            />
          </div>

          <div className={style.inputGroup}>
            <label className={style.fieldLabel}>
              Contact Number <span className={style.requiredAsterisk}>*</span>
            </label>
            <input
              type="tel"
              placeholder="09XXXXXXXXX"
              className={style.inputField}
              value={applicationForm.contactNumber}
              onChange={(e) =>
                setApplicationForm({
                  ...applicationForm,
                  contactNumber: e.target.value,
                })
              }
              maxLength={11}
              required
            />
          </div>

          <div className={style.inputGroup}>
            <label className={style.fieldLabel}>
              Quantity (Bilang ng Kopya){" "}
              <span className={style.requiredAsterisk}>*</span>
            </label>
            <input
              type="number"
              min="1"
              max="10"
              className={style.inputField}
              value={applicationForm.quantity}
              onChange={(e) =>
                setApplicationForm({
                  ...applicationForm,
                  quantity: e.target.value,
                })
              }
              required
            />
          </div>

          <div className={`${style.inputGroup} ${style.fullWidth}`}>
            <label className={style.fieldLabel}>
              Purpose / Dahilan ng Pagkuha{" "}
              <span className={style.requiredAsterisk}>*</span>
            </label>
            <textarea
              rows="4"
              placeholder="Maging tiyak: Halimbawa: Employment, Local Scholarship, Medical Assistance, Local Business Requirement..."
              className={style.textArea}
              required
              value={applicationForm.purpose}
              onChange={(e) =>
                setApplicationForm({
                  ...applicationForm,
                  purpose: e.target.value,
                })
              }
            ></textarea>
          </div>
        </div>

        <div className={style.actionWrapper}>
          <button type="submit" className={style.submitBtn}>
            <span>I-save at Magpatuloy</span>
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
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CertificateRequestForm;
