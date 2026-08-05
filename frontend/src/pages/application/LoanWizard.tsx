import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { WizardFormData } from '../../types';
import { Stepper } from '../../components/ui/Stepper';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { FinancialDetailsStep } from './steps/FinancialDetailsStep';
import { DocumentUploadStep } from './steps/DocumentUploadStep';
import { ReviewStep } from './steps/ReviewStep';
import { applicantApi } from '../../api/applicantApi';
import { loanApi } from '../../api/loanApi';
import { documentApi } from '../../api/documentApi';
import { toast } from 'sonner';

const defaultValues: WizardFormData = {
  firstName: '', lastName: '', email: '', phone: '', panNumber: '', dateOfBirth: '', address: '',
  employmentType: 'SALARIED', annualIncome: 0, monthlyDebt: 0, loanType: 'PERSONAL', requestedAmount: 100000, tenureMonths: 12,
  documents: []
};

export const LoanWizard = () => {
  const { currentStep, steps, formData, isFirstStep, isLastStep, next, prev, goTo, updateFields, clearSaved } = useMultiStepForm([
    'Personal Info', 'Financial Details', 'Documents', 'Review'
  ], defaultValues);
  
  const navigate = useNavigate();

  const handleFinalSubmit = async () => {
    try {
      const applicant = await applicantApi.createApplicant({
        firstName: formData.firstName, lastName: formData.lastName, email: formData.email,
        phone: formData.phone, panNumber: formData.panNumber, dateOfBirth: formData.dateOfBirth,
        address: formData.address, employmentType: formData.employmentType, annualIncome: formData.annualIncome,
        monthlyDebt: formData.monthlyDebt
      });
      
      const loan = await loanApi.createLoan({
        applicantId: applicant.id, loanType: formData.loanType,
        requestedAmount: formData.requestedAmount, tenureMonths: formData.tenureMonths
      });

      if (formData.documents && formData.documents.length > 0) {
        for (const doc of formData.documents) {
          await documentApi.uploadDocument(loan.id, doc.file, doc.documentType);
        }
      }

      await loanApi.submitLoan(loan.id);

      toast.success('Loan application submitted successfully!');
      clearSaved();
      navigate(`/loans/${loan.id}`);
    } catch (err: any) {
      toast.error('Failed to submit application: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="card" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Stepper steps={steps} currentStep={currentStep} onStepClick={goTo} />
      
      <div className="mt-lg">
        {currentStep === 0 && <PersonalInfoStep formData={formData} updateFields={updateFields} onNext={next} />}
        {currentStep === 1 && <FinancialDetailsStep formData={formData} updateFields={updateFields} onNext={next} onBack={prev} />}
        {currentStep === 2 && <DocumentUploadStep formData={formData} updateFields={updateFields} onNext={next} onBack={prev} />}
        {currentStep === 3 && <ReviewStep formData={formData} onBack={prev} onSubmit={handleFinalSubmit} onEdit={goTo} />}
      </div>
    </div>
  );
};
