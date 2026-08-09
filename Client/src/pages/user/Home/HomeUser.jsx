import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import RequestSystem from "../RequestSystem/RequestSystem";
import CertificationRequest from "../CertificationRequest/CertificationRequest";
import MyRequests from "../MyRequests/MyRequests";

import BarangayConcernRequest from "../BarangayConcernRequest/BarangayConcernRequest";
import BarangayConcernSystem from "../BarangayConcernSystem/BarangayConcernSystem";
import style from "./HomeUser.module.css";

const HomeUser = () => {
  const username = localStorage.getItem("username");
  const [requestShowModal, setRequestShowModal] = useState(false);
  const [concernShowModal, setConcernShowModal] = useState(false);
  return (
    <>
      <section className="nav-bar">
        <Navbar />
      </section>
      <section className="side-bar">
        <Sidebar />
      </section>
      <main className={style["mainContent"]}>
        <CertificationRequest onOpenModal={() => setRequestShowModal(true)} />

        {requestShowModal && (
          <div
            className={style.modalOverlay}
            onClick={() => setShowModal(false)}
          >
            <div
              className={style.modalWrapper}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={style.closeBtn}
                onClick={() => setRequestShowModal(false)}
                title="Isara ang window"
              >
                &times;
              </button>

              <div className={style.modalContent}>
                <RequestSystem />
              </div>
            </div>
          </div>
        )}
        <BarangayConcernRequest onOpenModal={() => setConcernShowModal(true)} />

        {concernShowModal && (
          <div
            className={style.modalOverlay}
            onClick={() => setConcernShowModal(false)}
          >
            <div
              className={style.modalWrapper}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={style.closeBtn}
                onClick={() => setConcernShowModal(false)}
                title="Isara ang window"
              >
                &times;
              </button>

              <div className={style.modalContent}>
                <BarangayConcernSystem />
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default HomeUser;
