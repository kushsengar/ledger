import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { WizardFormData } from '../../../types';

const schema = z.object({
  firstName: z.string().min(2, 'Required'),
  lastName: z.string().min(2, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone'),
  panNumber: z.string().min(10, 'Invalid PAN'),
  dateOfBirth: z.string().min(1, 'Required'),
  address: z.string().min(5, 'Required'),
});

export const PersonalInfoStep = ({ formData, updateFields, onNext }: any) => {
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
          <label className="form-label">First Name</label>
          <input className="form-input" {...register('firstName')} />
          {errors.firstName && <span className="form-error">{errors.firstName.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Last Name</label>
          <input className="form-input" {...register('lastName')} />
          {errors.lastName && <span className="form-error">{errors.lastName.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" className="form-input" {...register('email')} />
          {errors.email && <span className="form-error">{errors.email.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input className="form-input" {...register('phone')} />
          {errors.phone && <span className="form-error">{errors.phone.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">PAN Number</label>
          <input className="form-input" {...register('panNumber')} />
          {errors.panNumber && <span className="form-error">{errors.panNumber.message as string}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Date of Birth</label>
          <input type="date" className="form-input" {...register('dateOfBirth')} />
          {errors.dateOfBirth && <span className="form-error">{errors.dateOfBirth.message as string}</span>}
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Address</label>
        <textarea className="form-input" rows={3} {...register('address')} />
        {errors.address && <span className="form-error">{errors.address.message as string}</span>}
      </div>
      <div className="flex gap-md" style={{ justifyContent: 'flex-end', marginTop: 24 }}>
        <button type="submit" className="btn btn-primary">Next Step</button>
      </div>
    </form>
  );
};
