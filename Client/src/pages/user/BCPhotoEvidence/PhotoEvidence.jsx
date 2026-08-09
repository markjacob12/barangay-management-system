import React, { useState } from "react";
import styles from "./PhotoEvidence.module.css";

const PhotoEvidence = ({ onNext, data }) => {
  const [previewImage, setPreviewImage] = useState(data?.preview || null);
  const [rawFile, setRawFile] = useState(data?.imageFile || null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rawFile)
      return alert("Mangyaring mag-upload ng larawan bago magpatuloy.");

    onNext({
      preview: previewImage,
      imageFile: rawFile,
    });
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setRawFile(null);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>PHOTO EVIDENCE</h3>
      <p className={styles.subtitle}>
        Mangyaring mag-upload ng malinaw na larawan bilang patunay.
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.uploadBox}>
          {previewImage ? (
            <div className={styles.previewContainer}>
              <img
                src={previewImage}
                alt="Preview"
                className={styles.previewImage}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className={styles.removeButton}
              >
                ✕ Alisin ang Larawan
              </button>
            </div>
          ) : (
            <label className={styles.dropzone}>
              <div className={styles.iconContainer}>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="2"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>

              <div className={styles.uploadButton}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload from Gallery
              </div>

              <span className={styles.fileTypes}>PNG, JPG, JPEG (Max 5MB)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.hiddenInput}
              />
            </label>
          )}
        </div>

        <div className={styles.actionContainer}>
          <button type="submit" className={styles.nextButton}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhotoEvidence;
