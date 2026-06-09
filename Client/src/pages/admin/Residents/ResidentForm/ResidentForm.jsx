import React, { useState } from "react";
import styles from "./ResidentForm.module.css";
import { useResident } from "../../../../components/Hooks/useResident";

export const ResidentForm = ({ onSave }) => {
  const { addResident } = useResident();

  const initialFormState = {
    lastName: "",
    firstName: "",
    middleName: "",
    suffix: "",
    gender: "",
    birthDate: "",
    birthPlace: "",
    age: "",
    civilStatus: "",
    nationality: "",
    religion: "",
    occupation: "",
    contactNumber: "",
    pwd: "",
    pwdIDNo: "",
    indigent: "",
    soloParent: "",
    soloParentNo: "",
    fourPs: "",
    registeredVoter: "",
    purok: "",
    houseNo: "",
    street: "",
  };

  const [residentInfo, setResidentInfo] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResidentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addResident(residentInfo);
    if (onSave) onSave();
    setResidentInfo(initialFormState);
  };

  return (
    <div className={styles.formContainer}>
      {/* Government-Style Official Header */}
      <div className={styles.formHeader}>
        <div className={styles.headerRibbon}></div>
        <div className={styles.headerTextContainer}>
          <h2 className={styles.sectionTitle}>RESIDENT REGISTRATION SYSTEM</h2>
          <p className={styles.sectionSubtitle}>
            Republic of the Philippines • Local Government Unit Information
            Portal
          </p>
        </div>
        <div className={styles.formStatusBadge}>OFFICIAL RECORD</div>
      </div>

      <form onSubmit={handleSubmit} className={styles.formContent}>
        {/* Left Column: Photo Management */}
        <div className={styles.photoSection}>
          <span className={styles.photoLabel}>Official Resident Photo</span>
          <div className={styles.photoPlaceholderContainer}>
            <div className={styles.photoPlaceholder}>
              <span className={styles.avatarIcon}>👤</span>
            </div>
          </div>
          <button type="button" className={styles.btnBrowse}>
            Upload Image File
          </button>
          <p className={styles.photoInstructions}>
            Standard 2x2 ID photo format preferred (Max 5MB).
          </p>
        </div>

        {/* Right Column: Information Input Blocks */}
        <div className={styles.formFieldsSection}>
          {/* CATEGORY 1: PERSONAL DETAILS */}
          <div className={styles.formSectionHeader}>
            <span className={styles.sectionNumber}>01</span> Personal
            Information
          </div>

          <div className={styles.inputGrid}>
            <div className={styles.fieldGroup}>
              <input
                type="text"
                name="lastName"
                placeholder=" "
                required
                value={residentInfo.lastName}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>
                Last Name <span className={styles.requiredAsterisk}>*</span>
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <input
                type="text"
                name="firstName"
                placeholder=" "
                required
                value={residentInfo.firstName}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>
                First Name <span className={styles.requiredAsterisk}>*</span>
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <input
                type="text"
                name="middleName"
                placeholder=" "
                value={residentInfo.middleName}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>Middle Name</label>
            </div>

            <div className={styles.fieldGroup}>
              <input
                type="text"
                name="suffix"
                placeholder=" "
                value={residentInfo.suffix}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>
                Suffix (e.g., Jr., III, Sr.)
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <select
                name="gender"
                required
                value={residentInfo.gender}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label className={styles.selectLabel}>
                Gender <span className={styles.requiredAsterisk}>*</span>
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <input
                type="date"
                name="birthDate"
                required
                value={residentInfo.birthDate}
                onChange={handleInputChange}
              />
              <label className={styles.selectLabel}>
                Birth Date <span className={styles.requiredAsterisk}>*</span>
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <input
                type="text"
                name="birthPlace"
                placeholder=" "
                value={residentInfo.birthPlace}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>Birth Place</label>
            </div>

            <div className={styles.fieldGroup}>
              <input
                type="number"
                name="age"
                placeholder=" "
                value={residentInfo.age}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>Age</label>
            </div>

            <div className={styles.fieldGroup}>
              <input
                type="text"
                name="civilStatus"
                placeholder=" "
                value={residentInfo.civilStatus}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>Civil Status</label>
            </div>

            <div className={styles.fieldGroup}>
              <input
                type="text"
                name="nationality"
                placeholder=" "
                value={residentInfo.nationality}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>Nationality</label>
            </div>

            <div className={styles.fieldGroup}>
              <input
                type="text"
                name="religion"
                placeholder=" "
                value={residentInfo.religion}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>Religion</label>
            </div>

            <div className={styles.fieldGroup}>
              <input
                type="text"
                name="occupation"
                placeholder=" "
                value={residentInfo.occupation}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>Occupation</label>
            </div>

            <div className={styles.fieldGroup} style={{ gridColumn: "span 1" }}>
              <input
                type="text"
                name="contactNumber"
                placeholder=" "
                value={residentInfo.contactNumber}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>Contact Number</label>
            </div>
          </div>

          {/* CATEGORY 2: RESIDENCY / ADDRESS */}
          <div className={styles.formSectionHeader}>
            <span className={styles.sectionNumber}>02</span> Geographic &
            Address Details
          </div>

          <div className={styles.inputGrid}>
            <div className={styles.fieldGroup}>
              <input
                type="text"
                name="houseNo"
                placeholder=" "
                value={residentInfo.houseNo}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>
                House No. / Building
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <input
                type="text"
                name="street"
                placeholder=" "
                value={residentInfo.street}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>Street Name</label>
            </div>

            <div className={styles.fieldGroup}>
              <input
                type="text"
                name="purok"
                placeholder=" "
                value={residentInfo.purok}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>
                Purok / Zone Number
              </label>
            </div>
          </div>

          {/* CATEGORY 3: GOVERNMENT CLASSIFICATIONS */}
          <div className={styles.formSectionHeader}>
            <span className={styles.sectionNumber}>03</span> Socio-Economic
            Sectors & Qualifications
          </div>

          <div className={styles.inputGrid}>
            <div className={styles.fieldGroup}>
              <select
                name="registeredVoter"
                required
                value={residentInfo.registeredVoter}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden></option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
              <label className={styles.selectLabel}>
                Registered Voter?{" "}
                <span className={styles.requiredAsterisk}>*</span>
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <select
                name="fourPs"
                value={residentInfo.fourPs}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label className={styles.selectLabel}>4Ps Beneficiary?</label>
            </div>

            <div className={styles.fieldGroup}>
              <select
                name="indigent"
                required
                value={residentInfo.indigent}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label className={styles.selectLabel}>
                Indigent Status{" "}
                <span className={styles.requiredAsterisk}>*</span>
              </label>
            </div>

            <div className={styles.fieldGroup}>
              <select
                name="pwd"
                value={residentInfo.pwd}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label className={styles.selectLabel}>PWD Sector Member?</label>
            </div>

            <div className={styles.fieldGroup}>
              <input
                type="text"
                name="pwdIDNo"
                placeholder=" "
                disabled={residentInfo.pwd !== "Yes"}
                value={residentInfo.pwdIDNo}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>PWD ID Card No.</label>
            </div>

            <div className={styles.fieldGroup}>
              <select
                name="soloParent"
                value={residentInfo.soloParent}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden></option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
              <label className={styles.selectLabel}>Solo Parent?</label>
            </div>

            <div className={styles.fieldGroup}>
              <input
                type="text"
                name="soloParentNo"
                placeholder=" "
                disabled={residentInfo.soloParent !== "YES"}
                value={residentInfo.soloParentNo}
                onChange={handleInputChange}
              />
              <label className={styles.floatingLabel}>
                Solo Parent ID Card No.
              </label>
            </div>
          </div>

          {/* Form Actions with High-End Execution Style */}
          <div className={styles.formActions}>
            <button type="submit" className={styles.btnSave}>
              <span>SUBMIT RECORD DATA</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
