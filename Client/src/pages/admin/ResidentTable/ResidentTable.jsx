import React, { useState } from "react";
import style from "./ResidentTable.module.css";
import { useResident } from "../../../components/Hooks/useResident";
const ResidentTable = ({ onOpenModal, onDelete, onView }) => {
  const [searchResident, setSearchResident] = useState("");
  const { residents } = useResident(searchResident);
  return (
    <div className={style.container}>
      <div className={style.headerSection}>
        <div className={style.titleBlock}>
          <h2 className={style.title}>Masterlist of Residents</h2>
          <p className={style.subtitle}>
            Barangay Barangay Resident Information Registry System
          </p>
        </div>

        <div className={style.toolbarActions}>
          <div className={style.searchWrapper}>
            <svg
              className={style.searchIcon}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search resident..."
              className={style.searchInput}
              value={searchResident}
              onChange={(e) => setSearchResident(e.target.value)}
            />
          </div>

          <button className={style.btnAdd} onClick={onOpenModal}>
            <span className={style.plusIcon}>+</span> Add New Resident
          </button>
        </div>
      </div>

      <div className={style.tableResponsive}>
        <table className={style.customTable}>
          <thead>
            <tr>
              <th>Resident Name</th>
              <th>Gender</th>
              <th>Civil Status</th>
              <th>Purok / Zone</th>
              <th>Contact Number</th>
              <th>Age</th>
              <th className={style.textCenter}>System Actions</th>
            </tr>
          </thead>
          <tbody>
            {residents && residents.length > 0 ? (
              residents.map((req) => (
                <tr key={req._id} className={style.tableRow}>
                  {/* Name Cell with bold styling */}
                  <td className={style.nameCell}>
                    {`${req.lastName}, ${req.firstName} ${req.middleName || ""}`}
                  </td>
                  {/* Gender with dynamic status badge */}
                  <td>
                    <span
                      className={`${style.genderBadge} ${
                        req.gender?.toLowerCase() === "male"
                          ? style.male
                          : style.female
                      }`}
                    >
                      {req.gender}
                    </span>
                  </td>
                  <td className={style.textMuted}>{req.civilStatus}</td>
                  <td>
                    <span className={style.purokBadge}>Purok {req.purok}</span>
                  </td>
                  <td className={style.textMuted}>
                    {req.contactNumber || "N/A"}
                  </td>
                  <td className={style.ageCell}>{req.age}</td>

                  <td className={style.actionCells}>
                    <button
                      className={style.btnView}
                      title="View Profile Details"
                      onClick={() => onView(req)}
                    >
                      {/* Modern Document Icon SVG */}
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
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      <span>View</span>
                    </button>
                    <button
                      className={style.btnDelete}
                      title="Delete Record Permanently"
                      onClick={() => onDelete(req._id)}
                    >
                      {/* Modern Trash Icon SVG */}
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className={style.noRecordsRow}>
                  <div className={style.noRecordsContainer}>
                    <span className={style.emptyIcon}>📁</span>
                    <p>
                      No registered residents found in the local registry
                      database.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResidentTable;
