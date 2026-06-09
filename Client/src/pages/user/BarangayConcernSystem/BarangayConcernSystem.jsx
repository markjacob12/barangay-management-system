import React, { useState } from "react";
import { useConcern } from "../../../components/Hooks/useConcern";
import BCPhotoEvidence from "../BCPhotoEvidence/PhotoEvidence";
import BarangayConcernForm from "../BarangayConcernForm/BarangayConcernForm";
import BarangayConcernFormReview from "../BarangayConcernFormReview/BarangayConcernFormReview";
import ConcernSuccessStep from "../ConcernSuccessStep/ConcernSuccessStep";
import style from "./BarngayConcernSystem.module.css";

const BarangayConcernSystem = () => {
  const { submitConcern } = useConcern();
  const [currentStep, setCurrentStep] = useState(1);
  const [concernData, setConcernData] = useState({});

  const handleSubmit = async () => {
    try {
      const isSuccess = await submitConcern(concernData);
      if (isSuccess) {
        setCurrentStep(4);
      }
    } catch (err) {
      console.error("May error sa pag-submit:", err);
    }
  };

  const handleNextStep = (data) => {
    setConcernData((prev) => ({
      ...prev,
      ...data,
    }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className={style.masterWizardFrame}>
      <div className={style.stepperHeaderBlock}>
        {/* Step 1 */}
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
              Upload Photo Evidence
            </span>
          </div>
        </div>

        <div
          className={`${style.progressLine} ${currentStep >= 2 ? style.lineFilled : ""}`}
        ></div>

        {/* Step 2 */}
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
              Fill Up Report Details
            </span>
          </div>
        </div>

        <div
          className={`${style.progressLine} ${currentStep >= 3 ? style.lineFilled : ""}`}
        ></div>

        {/* Step 3 */}
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

        {/* Step 4 */}
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
              Success
            </span>
          </div>
        </div>
      </div>

      <div className={style.contentDynamicBody}>
        {currentStep === 1 && (
          <BCPhotoEvidence onNext={handleNextStep} data={concernData} />
        )}
        {currentStep === 2 && (
          <BarangayConcernForm
            onBack={handleBack}
            data={concernData}
            onNext={handleNextStep}
          />
        )}
        {currentStep === 3 && (
          <BarangayConcernFormReview
            data={concernData}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        )}
        {currentStep === 4 && (
          <ConcernSuccessStep data={concernData} onBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default BarangayConcernSystem;
