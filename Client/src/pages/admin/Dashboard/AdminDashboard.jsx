import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  FaUserFriends,
  FaExclamationTriangle,
  FaFileAlt,
} from "react-icons/fa";

import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import style from "./AdminDashboard.module.css";

import { useResident } from "../../../components/Hooks/useResident";
import { useRequest } from "../../../components/Hooks/useRequest";
import { useConcern } from "../../../components/Hooks/useConcern";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const { residents } = useResident();
  const { requests } = useRequest();
  const { concernData } = useConcern();

  const totalResidentCount = residents.length;
  const totalRequestCount = requests.filter(
    (r) => r.status === "Pending",
  ).length;
  const totalConcern = concernData.filter((e) => e.status === "Pending").length;

  const chartData = useMemo(() => {
    const conernCount = concernData.filter(
      (e) => e.filter === "Pending",
    ).filter;

    const residentCount = residents.length;
    const requestCount = requests.filter((r) => r.status === "Pending").length;
    return {
      labels: ["Concern", "Resident", "Request"],
      datasets: [
        {
          data: [conernCount, residentCount, requestCount],
          backgroundColor: ["#001f3f", "#d4af37", "#64748b"],
          borderWidth: 0,
        },
      ],
    };
  }, [residents]);

  return (
    <div className={style["admin-layout"]}>
      <Sidebar />
      <div className={style["main-wrapper"]}>
        <Navbar />
        <div className={style["content-area"]}>
          {/* Stat Cards */}
          <div className={style["box-continer"]}>
            <div className={style["card"]}>
              <h2>Pending Concern</h2>
              <p className={style["count"]}>{totalConcern}</p>
              <FaExclamationTriangle className={style["icon"]} />
              <button
                className={style["view-btn"]}
                onClick={() => (window.location.href = "/Concern")}
              >
                View Details
              </button>
            </div>
            <div className={style["card"]}>
              <h2>Total Resident</h2>
              <p className={style["count"]}>{totalResidentCount}</p>
              <FaUserFriends className={style["icon"]} />
              <button
                className={style["view-btn"]}
                onClick={() => (window.location.href = "/residents")}
              >
                View List
              </button>
            </div>
            <div className={style["card"]}>
              <h2>Pending Request</h2>
              <p className={style["count"]}>{totalRequestCount}</p>
              <FaFileAlt className={style["icon"]} />
              <button
                className={style["view-btn"]}
                onClick={() => (window.location.href = "/RequestManagement")}
              >
                Process Now
              </button>
            </div>
          </div>

          <div className={style["bottom-wrapper"]}>
            <div className={style["chart-container"]}>
              <h3>Resident Demographics</h3>
              <div
                style={{
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pie
                  data={chartData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { position: "right" } },
                  }}
                />
              </div>
            </div>

            <div className={style["activity-feed"]}>
              <h3>Recent Activity</h3>
              <div className={style["activity-list"]}>
                {requests.length > 0 ? (
                  requests.slice(0, 5).map((req, index) => (
                    <div key={index} className={style["activity-item"]}>
                      <div>
                        <strong>{req.residentName || "Resident"}</strong>
                        <small style={{ display: "block", color: "#64748b" }}>
                          Requested: {req.requestType}
                        </small>
                      </div>
                      <span className={style["badge-pending"]}>
                        {req.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p
                    style={{
                      textAlign: "center",
                      color: "#94a3b8",
                      marginTop: "20px",
                    }}
                  >
                    No recent activity
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
