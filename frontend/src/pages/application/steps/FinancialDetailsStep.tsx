import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  employmentType: z.enum(['SALARIED', 'SELF_EMPLOYED']),
  annualIncome: z.coerce.number().min(1, 'Required'),
  monthlyDebt: z.coerce.number().min(0, 'Required'),
  loanType: z.enum(['PERSONAL', 'HOME', 'VEHICLE', 'BUSINESS']),
  requestedAmount: z.coerce.number().min(10000, 'Minimum 10,000'),
  tenureMonths: z.coerce.number().min(12, 'Min 12 months').max(120, 'Max 120 months'),
});

export const FinancialDetailsStep = ({ formData, updateFields, onNext, onBack }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formData
  });

  const onSubmit = (data: any) => {
    updateFields(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Employment Type</label>
          <select className="form-select" {...register('employmentType')}>
            <option value="SALARIED">Salaried</option>
            <option value="SELF_EMPLOYED">Self Employed</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Loan Type</label>
          <select className="form-select" {...register('loanType')}>
            <option value="PERSONAL">Personal Loan</option>
            <option value="HOME">Home Loan</option>
            <option value="VEHICLE">Vehicle Loan</option>
            <option value="BUSINESS">Business Loan</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Annual Income (₹)</label>
          <input type="number" className="form-input" {...register('annualIncome')} />
          {errors.annualIncome && <span className="form-error">{errors.annualIncome.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Monthly Debt (₹)</label>
          <input type="number" className="form-input" {...register('monthlyDebt')} />
          {errors.monthlyDebt && <span className="form-error">{errors.monthlyDebt.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Requested Amount (₹)</label>
          <input type="number" className="form-input" {...register('requestedAmount')} />
          {errors.requestedAmount && <span className="form-error">{errors.requestedAmount.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Tenure (Months)</label>
          <select className="form-select" {...register('tenureMonths')}>
            {[12, 24, 36, 48, 60, 72, 84, 96, 108, 120].map(m => (
              <option key={m} value={m}>{m} Months</option>
            ))}
          </select>
          {errors.tenureMonths && <span className="form-error">{errors.tenureMonths.message as string}</span>}
        </div>
      </div>
      <div className="flex gap-md" style={{ justifyContent: 'space-between', marginTop: 24 }}>
        <button type="button" className="btn btn-secondary" onClick={onBack}>Back</button>
        <button type="submit" className="btn btn-primary">Next Step</button>
      </div>
    </form>
  );
};
