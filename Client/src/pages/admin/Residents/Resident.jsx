import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { ResidentForm } from "./ResidentForm/ResidentForm";
import ResidentTable from "../ResidentTable/ResidentTable";
import RequestManagement from "../RequestManagement/RequestManagement";
import ViewRequest from "../ViewRequest/ViewRequest";
import ViewResident from "../ViewResident/ViewResident";

import style from "./Resident.module.css";
import { useResident } from "../../../components/Hooks/useResident";

const Resident = () => {
  const { residents, addResident, deleteResident } = useResident();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isViewModal, setIsViewModal] = useState(false);

  const [selectResident, setSelectResident] = useState(null);
  const [isViewResident, setIsViewResident] = useState(false);

  const handleViewClick = (resident) => {
    console.log("DEBUG", resident);
    setSelectResident(resident);
    setIsViewResident(true);
  };
  return (
    <>
      <div className={style["admin-layout"]}>
        <Sidebar />
        <div className={style["main-wrapper"]}>
          <Navbar />
          <div className={style["content-area"]}>
            <ResidentTable
              onOpenModal={() => setIsModalOpen(true)}
              onDelete={deleteResident}
              onView={handleViewClick}
            />
          </div>

          {isModalOpen && (
            <div className={style.formModalOverlay}>
              <div className={style.formModalContent}>
                <button
                  className={style.formCloseBtn}
                  onClick={() => setIsModalOpen(false)}
                  title="Cancel Registration"
                >
                  &times;
                </button>

                <ResidentForm
                  onSave={(data) => {
                    addResident(data);
                    setIsModalOpen(false);
                  }}
                />
              </div>
            </div>
          )}

          {isViewResident && (
            <div className={style.residentModalOverlay}>
              <div className={style.residentModalContent}>
                {/* Pro-looking Close Button */}
                <button
                  className={style.residentCloseBtn}
                  onClick={() => {
                    setIsViewResident(false);
                    setSelectResident(null);
                  }}
                  title="Close Profile"
                >
                  &times;
                </button>

                <ViewResident resident={selectResident} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Resident;
