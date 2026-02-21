import React, { useState } from 'react';
import Stepper from './components/Stepper';
import FormStepOne from './components/FormStepOne';
import FormStepTwo from './components/FormStepTwo';
import Dashboard from './components/Dashboard';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: "Xizmat ko'rsatish",
    hasCRM: null,
    hasSalesTeam: null,
    socialMediaStatus: "Zo'r",
    revenueGoal: 10000,
    avgCheck: 60,
    conversionRate: 30,
    platform: 'Instagram'
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    // Validation before moving next if needed
    if (currentStep === 1) {
      if (formData.hasCRM === null || formData.hasSalesTeam === null) {
        alert("Iltimos, CRM va Sotuv bo'limi bor-yo'qligini tanlang!");
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };
  const prevStep = () => setCurrentStep(prev => prev - 1);
  const resetAudit = () => setCurrentStep(1);

  const steps = [
    { title: 'Biznes Holati' },
    { title: 'Maqsadlar' },
    { title: 'Natija' }
  ];

  return (
    <>
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob-1"></div>
        <div className="aurora-blob aurora-blob-2"></div>
        <div className="aurora-blob aurora-blob-3"></div>
      </div>

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            Biznes Marketing Auditi
          </h1>
          <p className="text-muted">Tizimingizdagi teshiklarni toping va yo'qotishlarni to'xtating</p>
        </div>

        <Stepper currentStep={currentStep} steps={steps} />

        <div style={{ marginTop: '1rem' }}>
          {currentStep === 1 && (
            <FormStepOne
              formData={formData}
              updateParent={updateFormData}
              onNext={nextStep}
            />
          )}
          {currentStep === 2 && (
            <FormStepTwo
              formData={formData}
              updateParent={updateFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 3 && (
            <Dashboard
              formData={formData}
              onReset={resetAudit}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
