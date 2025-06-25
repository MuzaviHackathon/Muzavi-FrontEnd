import { useState } from 'react';
import StepOne from './initial/StepOne';
import StepTwo from './initial/StepTwo';
import StepThree from './initial/StepThree';

const InitialSetup = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    major: '',
    studentId: '',
    excelData: [],
    lectureReview: { 강의력: '', 과제량: '' },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateData = (key: string, value: any) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      {step === 1 && <StepOne onNext={nextStep} onChange={updateData} />}
      {step === 2 && <StepTwo onNext={nextStep} onPrev={prevStep} onChange={updateData} />}
      {step === 3 && <StepThree data={userData} onPrev={prevStep} />}
    </div>
  );
};

export default InitialSetup;
