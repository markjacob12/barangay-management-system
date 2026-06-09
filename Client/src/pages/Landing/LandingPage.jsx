import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingNavBar from "./components/LandingNavBar";
import style from "./LandingPage.module.css";
import Background from "../../assets/Background/Backgroud.png";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      const targetPath = role === "admin" ? "/AdminDashboard" : "/HomeUser";
      navigate(targetPath, { replace: true });
    }
  }, [navigate]);

  return (
    <div className={style.landingContainer}>
      {/* 1. Navigation Bar */}
      <LandingNavBar />

      {/* 2. Hero Section (Dynamic Government Premium Banner) */}
      <section
        className={style.heroSection}
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className={style.heroOverlay}>
          <div className={style.heroContent}>
            <h1 className={style.title}>
              Maligayang Pagdating sa Barangay Papa
            </h1>
            <p className={style.subtitle}>
              Serbisyong Tapat, Komunidad na Maunlad, Ligtas, at Progresibo.
            </p>
            <div className={style.ctaContainer}>
              <button
                className={style.primaryBtn}
                onClick={() => navigate("/login")}
              >
                Mag-login para sa Serbisyo
              </button>
              <button
                className={style.secondaryBtn}
                onClick={() => navigate("/emergency")}
              >
                Emergency Hotlines
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Services / Features Section */}
      <section className={style.servicesSection}>
        <h2 className={style.sectionTitle}>Mga Online na Serbisyo</h2>
        <div className={style.gridServices}>
          {/* 1. Barangay Permit */}
          <div className={style.serviceCard}>
            <h3>Barangay Permit</h3>
            <p>
              Pagproseso ng mga pahintulot para sa mga lokal na negosyo,
              konstruksyon, at iba pang komersyal na aktibidad sa nasasakupan.
            </p>
          </div>

          {/* 2. Barangay Clearance */}
          <div className={style.serviceCard}>
            <h3>Barangay Clearance</h3>
            <p>
              Mabilisang pag-apply ng clearance online para sa lokal na
              pagkakakilanlan, aplikasyon sa trabaho, at iba pang legal na
              transaksyon.
            </p>
          </div>

          {/* 3. Certificate of Indigency */}
          <div className={style.serviceCard}>
            <h3>Certificate of Indigency</h3>
            <p>
              Kumuha ng opisyal na patunay ng paninirahan para sa tulong
              pinansyal, scholarship, o libreng pangangailangang medikal.
            </p>
          </div>

          {/* 4. Blotter / Reklamo */}
          <div className={style.serviceCard}>
            <h3>Blotter / Reklamo</h3>
            <p>
              Ipaabot nang ligtas at mabilis sa lokal na pamahalaan ang mga
              usapin sa seguridad, alitan, kapayapaan, at kaayusan.
            </p>
          </div>

          {/* 5. Barangay Residency */}
          <div className={style.serviceCard}>
            <h3>Barangay Residency</h3>
            <p>
              Pag-isyu ng sertipiko na nagpapatunay ng opisyal at permanenteng
              paninirahan ng isang residente sa loob ng Barangay Papa.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Footer Section */}
      <footer className={style.footer}>
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <strong>Pamahalaang Lokal ng Barangay Papa</strong>. All Rights
          Reserved.
        </p>
        <p>Rosario, Cavite, Philippines</p>
      </footer>
    </div>
  );
};

export default LandingPage;
