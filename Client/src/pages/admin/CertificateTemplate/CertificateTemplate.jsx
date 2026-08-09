import React, { forwardRef } from "react";
import style from "./CertificateTemplate.module.css";
import Logo1 from "../../../assets/Logo/Logo.png";
import Logo2 from "../../../assets/Logo/Logo2.png";

const CertificateTemplate = forwardRef(({ request }, ref) => {
  if (!request) return null;

  return (
    <div ref={ref} className={style.certificatePaper}>
      <div className={style.header}>
        <div className={style.logoWrapper}>
          <img src={Logo1} alt="Logo 1" className={style.logo} />
        </div>

        <div className={style.headerText}>
          <p>Republic of the Philippines</p>
          <p>Province of Cavite</p>
          <p>Municipality of Rosario</p>
          <h2 className={style.brgyName}>OFFICE OF THE BARANGAY CAPTAIN</h2>
        </div>

        <div className={style.logoWrapper}>
          <img src={Logo2} alt="Logo 2" style={{ width: "45%" }} />
        </div>
      </div>

      <h1 className={style.title}>BARANGAY CERTIFICATION</h1>

      <div className={style.content}>
        <p className={style.toWhom}>TO WHOM IT MAY CONCERN:</p>
        <p className={style.paragraph}>
          THIS IS TO CERTIFY that{" "}
          <strong>
            {request.firstName.toUpperCase()} {request.lastName.toUpperCase()}
          </strong>
          , of legal age, a Filipino citizen and a bonafide resident of Barangay
          Papa, Rosario, Cavite, is a requester of{" "}
          <strong>{request.typeOfCertificate}</strong>.
        </p>
        <p className={style.paragraph}>
          This certification is issued upon the request of the above-mentioned
          name for
          <strong> {request.purpose}</strong> and for whatever legal purpose it
          may serve.
        </p>
      </div>

      <div className={style.footer}>
        <p>
          Done this {new Date().getDate()}th day of{" "}
          {new Date().toLocaleString("default", { month: "long" })},{" "}
          {new Date().getFullYear()}.
        </p>

        <div className={style.signatureBox}>
          <div className={style.signatureLine}>__________________________</div>
          <strong>PUNONG BARANGAY</strong>
        </div>
      </div>
    </div>
  );
});

export default CertificateTemplate;
