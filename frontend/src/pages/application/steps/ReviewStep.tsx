import React from 'react';

export const ReviewStep = ({ formData, onBack, onSubmit, onEdit }: any) => {
  return (
    <div>
      <div className="card mb-lg">
        <div className="flex-between card-header">
          <h3>Personal Information</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => onEdit(0)}>Edit</button>
        </div>
        <div className="grid-2">
          <div><label className="text-muted text-sm">Name</label><div>{formData.firstName} {formData.lastName}</div></div>
          <div><label className="text-muted text-sm">Email</label><div>{formData.email}</div></div>
          <div><label className="text-muted text-sm">Phone</label><div>{formData.phone}</div></div>
          <div><label className="text-muted text-sm">PAN</label><div>{formData.panNumber}</div></div>
          <div><label className="text-muted text-sm">DOB</label><div>{formData.dateOfBirth}</div></div>
          <div><label className="text-muted text-sm">Address</label><div>{formData.address}</div></div>
        </div>
      </div>

      <div className="card mb-lg">
        <div className="flex-between card-header">
          <h3>Financial Details</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => onEdit(1)}>Edit</button>
        </div>
        <div className="grid-2">
          <div><label className="text-muted text-sm">Employment</label><div>{formData.employmentType}</div></div>
          <div><label className="text-muted text-sm">Loan Type</label><div>{formData.loanType}</div></div>
          <div><label className="text-muted text-sm">Annual Income</label><div className="amount">₹{formData.annualIncome.toLocaleString()}</div></div>
          <div><label className="text-muted text-sm">Monthly Debt</label><div className="amount">₹{formData.monthlyDebt.toLocaleString()}</div></div>
          <div><label className="text-muted text-sm">Requested Amount</label><div className="amount">₹{formData.requestedAmount.toLocaleString()}</div></div>
          <div><label className="text-muted text-sm">Tenure</label><div>{formData.tenureMonths} Months</div></div>
        </div>
      </div>

      <div className="card">
        <div className="flex-between card-header">
          <h3>Documents</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => onEdit(2)}>Edit</button>
        </div>
        {formData.documents && formData.documents.length > 0 ? (
          <ul>
            {formData.documents.map((doc: any, i: number) => (
              <li key={i} className="mb-sm">{doc.documentType.replace('_', ' ')} - {doc.file.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No documents uploaded.</p>
        )}
      </div>

      <div className="flex gap-md" style={{ justifyContent: 'space-between', marginTop: 24 }}>
        <button type="button" className="btn btn-secondary" onClick={onBack}>Back</button>
        <button type="button" className="btn btn-primary" onClick={onSubmit}>Submit Application</button>
      </div>
    </div>
  );
};
