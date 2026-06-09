import React, { useState } from "react";
import style from "./BarangayConcernForm.module.css";

const BarangayConcernForm = ({ onBack, onNext, data }) => {
  const [concernForm, setConcernForm] = useState({
    typeOfConcern: data?.typeOfConcern || "",
    specificConcern: data?.specificConcern || "",
    location: data?.location || "",
    description: data?.description || "",
    date: data?.date || "",
    time: data?.time || "",
    priorityLevel: data?.priorityLevel || "",
  });
  const handleSumbit = (e) => {
    e.preventDefault();
    onNext(concernForm);
  };
  return (
    <div className={style.formContainer}>
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
          Application for <span className={style.highlightText}></span>
        </h2>
        <p className={style.formSubtitle}>
          Kumpletuhin ang mga blangkong field sa ibaba upang maiproseso ang
          iyong opisyal na request.
        </p>
        <div className={style.goldDivider}></div>
      </div>
      <div className={style.formHeader}>
        <h2>BARANGAY CONCERN REPORT FORM</h2>
        <p>
          Mangyaring sagutan ang form sa ibaba upang maiparating ang inyong
          hinaing.
        </p>
      </div>

      <form onSubmit={handleSumbit}>
        <div className={style.selectGroup}>
          <label>Type of Concern</label>
          <select
            value={concernForm.typeOfConcern}
            onChange={(e) =>
              setConcernForm({ ...concernForm, typeOfConcern: e.target.value })
            }
          >
            <option value="" disabled hidden>
              -- Select Type of Concern --
            </option>
            <option value="Infrastructure Concern">
              Infrastructure Concern
            </option>
            <option value="Public Safety Concern">Public Safety Concern</option>
            <option value="Environmental Concern">Environmental Concern</option>
            <option value="Utility Concern">Utility Concern</option>
            <option value="Sanitation Concern">Sanitation Concern</option>
            <option value="Transportation Concern">
              Transportation Concern
            </option>
            <option value="Community Complaint">Community Complaint</option>
            <option value="Disaster Risk Concern">Disaster Risk Concern</option>
            <option value="Health Concern">Health Concern</option>
            <option value="Maintenance Request">Maintenance Request</option>
          </select>
        </div>

        <div className={style.selectGroup}>
          <label>Specific Concern</label>
          <select
            value={concernForm.specificConcern}
            onChange={(e) =>
              setConcernForm({
                ...concernForm,
                specificConcern: e.target.value,
              })
            }
          >
            <option value="" disabled hidden>
              -- Select Specific Concern --
            </option>
            <optgroup label="Infrastructure Concern">
              <option value="Damaged Road">Damaged Road</option>
              <option value="Pothole">Pothole</option>
              <option value="Broken Sidewalk">Broken Sidewalk</option>
              <option value="Damaged Drainage">Damaged Drainage</option>
              <option value="Unsafe Structure">Unsafe Structure</option>
            </optgroup>

            <optgroup label="Public Safety Concern">
              <option value="Suspicious Activity">Suspicious Activity</option>
              <option value="Fire Hazard">Fire Hazard</option>
              <option value="Exposed Electrical Wires">
                Exposed Electrical Wires
              </option>
              <option value="Open Manhole">Open Manhole</option>
              <option value="Abandoned Vehicle">Abandoned Vehicle</option>
              <option value="Stray Animals">Stray Animals</option>
              <option value="Unsafe Area">Unsafe Area</option>
              <option value="Vandalism">Vandalism</option>
              <option value="Street Fight Incident">
                Street Fight Incident
              </option>
            </optgroup>

            <optgroup label="Environmental Concern">
              <option value="Illegal Dumping">Illegal Dumping</option>
              <option value="Flooded Area">Flooded Area</option>
              <option value="Fallen Tree">Fallen Tree</option>
              <option value="River Pollution">River Pollution</option>
              <option value="Air Pollution">Air Pollution</option>
              <option value="Smoke Complaint">Smoke Complaint</option>
              <option value="Clogged Waterway">Clogged Waterway</option>
              <option value="Tree Obstruction">Tree Obstruction</option>
            </optgroup>

            <optgroup label="Utility Concern">
              <option value="Damaged Electrical Post">
                Damaged Electrical Post
              </option>
              <option value="Leaning Utility Pole">Leaning Utility Pole</option>
              <option value="Power Outage">Power Outage</option>
              <option value="Faulty Street Light">Faulty Street Light</option>
              <option value="Water Interruption">Water Interruption</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Internet Cable Issue">Internet Cable Issue</option>
              <option value="Low Hanging Wires">Low Hanging Wires</option>
              <option value="Broken Water Pipe">Broken Water Pipe</option>
            </optgroup>

            <optgroup label="Sanitation Concern">
              <option value="Uncollected Garbage">Uncollected Garbage</option>
              <option value="Overflowing Trash Bin">
                Overflowing Trash Bin
              </option>
              <option value="Clogged Drainage">Clogged Drainage</option>
              <option value="Foul Odor">Foul Odor</option>
              <option value="Dirty Surroundings">Dirty Surroundings</option>
              <option value="Sewage Overflow">Sewage Overflow</option>
              <option value="Improper Waste Disposal">
                Improper Waste Disposal
              </option>
              <option value="Stagnant Water">Stagnant Water</option>
            </optgroup>

            <optgroup label="Transportation Concern">
              <option value="Illegal Parking">Illegal Parking</option>
              <option value="Road Obstruction">Road Obstruction</option>
              <option value="Traffic Congestion">Traffic Congestion</option>
              <option value="Damaged Traffic Sign">Damaged Traffic Sign</option>
              <option value="Blocked Road">Blocked Road</option>
              <option value="Reckless Driving Complaint">
                Reckless Driving Complaint
              </option>
              <option value="Public Transport Issue">
                Public Transport Issue
              </option>
            </optgroup>

            <optgroup label="Community Complaint">
              <option value="Excessive Noise">Excessive Noise</option>
              <option value="Videoke Beyond Curfew">
                Videoke Beyond Curfew
              </option>
              <option value="Neighborhood Dispute">Neighborhood Dispute</option>
              <option value="Public Disturbance">Public Disturbance</option>
              <option value="Unauthorized Construction">
                Unauthorized Construction
              </option>
              <option value="Trespassing Complaint">
                Trespassing Complaint
              </option>
              <option value="Illegal Selling">Illegal Selling</option>
              <option value="Curfew Violation">Curfew Violation</option>
            </optgroup>

            <optgroup label="Disaster Risk Concern">
              <option value="Flood Risk">Flood Risk</option>
              <option value="Landslide Risk">Landslide Risk</option>
              <option value="Fallen Electrical Post">
                Fallen Electrical Post
              </option>
              <option value="Storm Damage">Storm Damage</option>
              <option value="Earthquake Damage">Earthquake Damage</option>
              <option value="Emergency Rescue Needed">
                Emergency Rescue Needed
              </option>
              <option value="Collapsed Structure">Collapsed Structure</option>
            </optgroup>

            <optgroup label="Health Concern">
              <option value="Dengue Risk Area">Dengue Risk Area</option>
              <option value="Unsanitary Environment">
                Unsanitary Environment
              </option>
              <option value="Contaminated Water">Contaminated Water</option>
              <option value="Public Health Hazard">Public Health Hazard</option>
              <option value="Improper Sewage Disposal">
                Improper Sewage Disposal
              </option>
            </optgroup>

            <optgroup label="Maintenance Request">
              <option value="Street Light Repair">Street Light Repair</option>
              <option value="Road Repair Request">Road Repair Request</option>
              <option value="Canal Cleaning">Canal Cleaning</option>
              <option value="Tree Trimming">Tree Trimming</option>
              <option value="Facility Maintenance">Facility Maintenance</option>
              <option value="Drainage Cleaning">Drainage Cleaning</option>
              <option value="Garbage Collection Request">
                Garbage Collection Request
              </option>
              <option value="Post Repair Request">Post Repair Request</option>
            </optgroup>
          </select>
        </div>

        <div className={style.textTareaGroup}>
          <label>Location</label>
          <textarea
            value={concernForm.location}
            onChange={(e) =>
              setConcernForm({ ...concernForm, location: e.target.value })
            }
            placeholder="Describe or specify the exact location"
            rows={3}
          ></textarea>
        </div>

        <div className={style.textTareaGroup}>
          <label>Description</label>
          <textarea
            value={concernForm.description}
            onChange={(e) =>
              setConcernForm({ ...concernForm, description: e.target.value })
            }
            placeholder="Provide details about the issue"
            rows={3}
          ></textarea>
        </div>

        {/* Ginamit ang .formRow para magtabi ang Date at Time nang maayos gaya ng nasa sketch */}
        <div className={style.formRow}>
          <div className={style.inputGroup}>
            <label>Date</label>
            <input
              required
              value={concernForm.date}
              type="date"
              onChange={(e) =>
                setConcernForm({ ...concernForm, date: e.target.value })
              }
            />
          </div>

          <div className={style.inputGroup}>
            <label>Time</label>
            <input
              required
              value={concernForm.time}
              type="time"
              onChange={(e) =>
                setConcernForm({ ...concernForm, time: e.target.value })
              }
            />
          </div>
        </div>

        <div className={style.selectGroup}>
          <label>Priority Level</label>
          <select
            value={concernForm.priorityLevel}
            onChange={(e) =>
              setConcernForm({ ...concernForm, priorityLevel: e.target.value })
            }
          >
            <option value="">Select Priority</option>
            <option value="Low Priority">Low Priority</option>
            <option value="Medium Priority">Medium Priority</option>
            <option value="High Priority">High Priority</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>

        <div className={style.buttonAction}>
          <button type="submit">Submit Report</button>
        </div>
      </form>
    </div>
  );
};

export default BarangayConcernForm;
