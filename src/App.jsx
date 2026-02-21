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
    <div className="container slide-up">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="fade-in" style={{ fontSize: '3rem', fontWeight: '700', letterSpacing: '-0.05em', marginBottom: '0.75rem' }}>
          Biznes Marketing Auditi
        </h1>
        <p className="text-muted fade-in" style={{ fontSize: '1.125rem', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
          Tizimingizdagi teshiklarni toping va yo'qotishlarni to'xtating.
          Auditi boshlash orqali daromadingizni oshiring.
        </p>
      </div>

      <div className="fade-in" style={{ animationDelay: '0.1s' }}>
        <Stepper currentStep={currentStep} steps={steps} />
      </div>

      <div style={{ marginTop: '2.5rem' }}>
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
  );
};

export default App;
