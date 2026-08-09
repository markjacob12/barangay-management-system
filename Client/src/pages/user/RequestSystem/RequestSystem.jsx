import React, { useState } from "react";
import { useRequest } from "../../../components/Hooks/useRequest";
import CertificateTypeSelection from "../CertificateTypeSelection/CertificateTypeSelection";
import CertificateRequestForm from "../CertificateRequestForm/CertificateRequestForm";
import ReviewRequest from "../ReviewRequest/ReviewRequest";
import SuccessStep from "../SuccessStep/SuccessStep";
import style from "./RequestSystem.module.css";

const RequestSystem = ({ currentResident }) => {
  const { submitRequest, loading } = useRequest();
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async () => {
    const res = await submitRequest(selectedType, formData);
    if (res) {
      setCurrentStep(4);
    }
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    setCurrentStep(3);
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
    setCurrentStep(2);
  };

  return (
    <div className={style.masterWizardFrame}>
      <div className={style.stepperHeaderBlock}>
        <div className={style.stepWrapper}>
          <div
            className={`${style.stepCircle} ${currentStep >= 1 ? style.activeStep : ""} ${currentStep > 1 ? style.completedStep : ""}`}
          >
            {currentStep > 1 ? "✓" : "1"}
          </div>
          <div className={style.stepLabelBlock}>
            <span className={style.stepIndexLabel}>Step 01</span>
            <span
              className={`${style.stepTitle} ${currentStep >= 1 ? style.textNavy : ""}`}
            >
              Pumili / Select
            </span>
          </div>
        </div>

        <div
          className={`${style.progressLine} ${currentStep >= 2 ? style.lineFilled : ""}`}
        ></div>

        <div className={style.stepWrapper}>
          <div
            className={`${style.stepCircle} ${currentStep >= 2 ? style.activeStep : ""} ${currentStep > 2 ? style.completedStep : ""}`}
          >
            {currentStep > 2 ? "✓" : "2"}
          </div>
          <div className={style.stepLabelBlock}>
            <span className={style.stepIndexLabel}>Step 02</span>
            <span
              className={`${style.stepTitle} ${currentStep >= 2 ? style.textNavy : ""}`}
            >
              Mag-fill up / Details
            </span>
          </div>
        </div>

        <div
          className={`${style.progressLine} ${currentStep >= 3 ? style.lineFilled : ""}`}
        ></div>

        <div className={style.stepWrapper}>
          <div
            className={`${style.stepCircle} ${currentStep >= 3 ? style.activeStep : ""} ${currentStep > 3 ? style.completedStep : ""}`}
          >
            {currentStep > 3 ? "✓" : "3"}
          </div>
          <div className={style.stepLabelBlock}>
            <span className={style.stepIndexLabel}>Step 03</span>
            <span
              className={`${style.stepTitle} ${currentStep >= 3 ? style.textNavy : ""}`}
            >
              I-review / Verify
            </span>
          </div>
        </div>

        <div
          className={`${style.progressLine} ${currentStep >= 4 ? style.lineFilled : ""}`}
        ></div>

        <div className={style.stepWrapper}>
          <div
            className={`${style.stepCircle} ${currentStep >= 4 ? style.activeStep : ""} ${currentStep === 4 ? style.completedStep : ""}`}
          >
            4
          </div>
          <div className={style.stepLabelBlock}>
            <span className={style.stepIndexLabel}>Step 04</span>
            <span
              className={`${style.stepTitle} ${currentStep >= 4 ? style.textNavy : ""}`}
            >
              Tapos na / Success
            </span>
          </div>
        </div>
      </div>

      <div className={style.contentDynamicBody}>
        {currentStep === 1 && (
          <CertificateTypeSelection onSelect={handleSelectType} />
        )}

        {currentStep === 2 && (
          <CertificateRequestForm
            type={selectedType}
            onBack={handleBack}
            onNext={handleFormSubmit}
          />
        )}

        {currentStep === 3 && (
          <ReviewRequest
            type={selectedType}
            onBack={handleBack}
            onNext={handleSubmit}
            data={formData}
            isSubmiting={loading}
          />
        )}

        {currentStep === 4 && (
          <SuccessStep type={selectedType} data={formData} />
        )}
      </div>
    </div>
  );
};

export default RequestSystem;
