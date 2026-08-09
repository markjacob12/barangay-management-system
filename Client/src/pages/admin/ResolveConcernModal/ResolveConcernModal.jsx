import React, { useState } from "react";
import style from "./ResolveConcernModal.module.css";
import { useConcern } from "../../../components/Hooks/useConcern";

const ResolveConcernModal = ({ onClose, data }) => {
  const { concernData, resolveConcern } = useConcern();
  const [rawFile, setRawFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [remarks, setRemarks] = useState("");
  const [resolutionDate, setResolutionDate] = useState("");

  const handleResolve = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (rawFile) formData.append("afterImage", rawFile);
    formData.append("resolutionDate", resolutionDate);
    formData.append("resolutionRemarks", remarks);
    try {
      const success = await resolveConcern(data._id, formData);
      if (success) {
        alert("Success! Na-resolve na ang concern.");
        onClose();
      } else {
        alert("Hindi na-resolve ang concern. Pakisubukang muli.");
      }
    } catch (error) {
      alert("Nagkaroon ng error: " + error.message);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setRawFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalBox} onClick={(e) => e.stopPropagation()}>
        <header className={style.modalHeader}>
          <h2 className={style.modalTitle}>Resolve Concern</h2>
          <button className={style.btnClose} onClick={onClose}>
            &times;
          </button>
        </header>

        <div className={style.divider}></div>

        <div className={style.modalForm}>
          <div className={style.formGroup}>
            <label className={style.fieldLabel}>
              AFTER PHOTO{" "}
              <span className={style.subLabel}>(Pagkatapos naayos)</span>
            </label>

            <label className={style.uploadZone}>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              {previewImage ? (
                <div className={style.previewContainer}>
                  <img
                    src={previewImage}
                    alt="Preview ng naayos"
                    className={style.imgPreview}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "130px",
                      borderRadius: "6px",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "#d4af37",
                      textDecoration: "underline",
                      marginTop: "6px",
                      fontWeight: "600",
                    }}
                  >
                    Palitan ang Larawan
                  </span>
                </div>
              ) : (
                <div className={style.uploadContent}>
                  <svg
                    className={style.uploadIcon}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="42"
                    height="42"
                    style={{ color: "#001f3f", marginBottom: "10px" }}
                  >
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                  </svg>
                  <span
                    className={style.uploadTitle}
                    style={{
                      color: "#001f3f",
                      fontWeight: "700",
                      fontSize: "0.95rem",
                    }}
                  >
                    Upload After Photo
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    PNG, JPG, JPEG (Max 5MB)
                  </span>
                </div>
              )}
            </label>
          </div>

          <div className={style.formGroup}>
            <label className={style.fieldLabel}> DATE RESOLUTION</label>
            <input
              type="date"
              value={resolutionDate}
              onChange={(e) => setResolutionDate(e.target.value)}
            />
          </div>

          <div className={style.formGroup}>
            <label className={style.fieldLabel}>RESOLUTION REMARKS</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className={style.remarksTextArea}
              placeholder="Ilagay ang paglalarawan kung paano at kailan naresolba ang concern..."
            ></textarea>
          </div>
        </div>

        <div className={style.actionFooter}>
          <button type="button" className={style.btnCancel} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={style.btnResolve}
            onClick={handleResolve}
          >
            Resolve Concern
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResolveConcernModal;
