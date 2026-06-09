import React from "react";
import style from "./ViewResident.module.css";

const ViewResident = ({ resident }) => {
  if (!resident)
    return <div className={style.loading}>Loading resident data...</div>;

  return (
    <div className={style.container}>
      {/* Header Banner - Government Style */}
      <div className={style.headerBanner}>
        <div className={style.avatarCircle}>
          {resident.firstName[0]}
          {resident.lastName[0]}
        </div>
        <div className={style.headerText}>
          <h1 className={style.fullName}>
            {resident.lastName}, {resident.firstName} {resident.middleName}{" "}
            {resident.suffix || ""}
          </h1>
          <p className={style.subTitle}>Resident Information Profile</p>
        </div>
        <div className={style.statusBadge}>
          {resident.registeredVoter === "YES" || resident.registerVoter === true
            ? "Registered Voter"
            : "Non-Voter"}
        </div>
      </div>

      <div className={style.gridContainer}>
        {/* Section 1: Personal Information */}
        <div className={style.card}>
          <h2 className={style.cardTitle}>Personal Information</h2>
          <div className={style.infoGrid}>
            <div className={style.infoGroup}>
              <label>Gender</label>
              <p>{resident.gender}</p>
            </div>
            <div className={style.infoGroup}>
              <label>Age</label>
              <p>{resident.age} yrs. old</p>
            </div>
            <div className={style.infoGroup}>
              <label>Birth Date</label>
              <p>{resident.birthDate}</p>
            </div>
            <div className={style.infoGroup}>
              <label>Birth Place</label>
              <p>{resident.birthPlace}</p>
            </div>
            <div className={style.infoGroup}>
              <label>Civil Status</label>
              <p>{resident.civilStatus}</p>
            </div>
            <div className={style.infoGroup}>
              <label>Nationality</label>
              <p>{resident.nationality}</p>
            </div>
            <div className={style.infoGroup}>
              <label>Religion</label>
              <p>{resident.religion}</p>
            </div>
            <div className={style.infoGroup}>
              <label>Occupation</label>
              <p>{resident.occupation || "N/A"}</p>
            </div>
            <div className={style.infoGroup}>
              <label>Contact Number</label>
              <p>{resident.contactNumber || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Section 2: Address & Location */}
        <div className={style.card}>
          <h2 className={style.cardTitle}>Address Details</h2>
          <div className={style.infoGrid}>
            <div className={style.infoGroup}>
              <label>House No.</label>
              <p>{resident.houseNo || "N/A"}</p>
            </div>
            <div className={style.infoGroup}>
              <label>Street</label>
              <p>{resident.street || "N/A"}</p>
            </div>
            <div className={style.infoGroup}>
              <label>Purok Number</label>
              <p>Purok {resident.purokNo}</p>
            </div>
          </div>
        </div>

        {/* Section 3: Government Sector / Program Qualifications */}
        <div className={`${style.card} ${style.fullWidthCard}`}>
          <h2 className={style.cardTitle}>
            Government Programs & Sector Records
          </h2>
          <div className={style.infoGridFourCols}>
            <div className={style.infoGroup}>
              <label>PWD Status</label>
              <p className={resident.pwd === "Yes" ? style.highlightYes : ""}>
                {resident.pwd || "No"}
              </p>
              {resident.pwdIDNo && (
                <small className={style.subLabel}>ID: {resident.pwdIDNo}</small>
              )}
            </div>
            <div className={style.infoGroup}>
              <label>Solo Parent</label>
              <p
                className={
                  resident.soloParent === "Yes" ? style.highlightYes : ""
                }
              >
                {resident.soloParent || "No"}
              </p>
              {resident.soloParentNo && (
                <small className={style.subLabel}>
                  ID: {resident.soloParentNo}
                </small>
              )}
            </div>
            <div className={style.infoGroup}>
              <label>Indigent Status</label>
              <p
                className={
                  resident.indigent === "Yes" ? style.highlightYes : ""
                }
              >
                {resident.indigent || "No"}
              </p>
            </div>
            <div className={style.infoGroup}>
              <label>4Ps Beneficiary</label>
              <p
                className={resident.fourPs === "Yes" ? style.highlightYes : ""}
              >
                {resident.fourPs || "No"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewResident;
