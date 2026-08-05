import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, File } from 'lucide-react';
import { DocumentType } from '../../../types';

export const DocumentUploadStep = ({ formData, updateFields, onNext, onBack }: any) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newDocs = acceptedFiles.map(file => ({
      file,
      documentType: 'ID_PROOF' as DocumentType
    }));
    updateFields({ documents: [...(formData.documents || []), ...newDocs] });
  }, [formData.documents, updateFields]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 5242880
  });

  const removeDoc = (index: number) => {
    const newDocs = [...formData.documents];
    newDocs.splice(index, 1);
    updateFields({ documents: newDocs });
  };

  const updateDocType = (index: number, type: DocumentType) => {
    const newDocs = [...formData.documents];
    newDocs[index].documentType = type;
    updateFields({ documents: newDocs });
  };

  return (
    <div>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'dropzone-active' : ''}`}>
        <input {...getInputProps()} />
        <UploadCloud size={48} className="text-emerald" style={{ margin: '0 auto 16px' }} />
        <p>Drag & drop some files here, or click to select files</p>
        <p className="text-sm text-muted mt-sm">Only PDF, JPG, PNG up to 5MB are supported.</p>
      </div>

      {formData.documents && formData.documents.length > 0 && (
        <div className="mt-lg">
          <h4>Uploaded Files</h4>
          <div className="mt-sm">
            {formData.documents.map((doc: any, index: number) => (
              <div key={index} className="flex-between card" style={{ padding: '12px 16px', marginBottom: 8 }}>
                <div className="flex items-center gap-md">
                  <File size={20} className="text-muted" />
                  <div>
                    <div className="text-sm">{doc.file.name}</div>
                    <div className="text-xs text-muted">{(doc.file.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                </div>
                <div className="flex gap-md items-center">
                  <select 
                    className="form-select" 
                    value={doc.documentType} 
                    onChange={e => updateDocType(index, e.target.value as DocumentType)}
                    style={{ width: 150, padding: '4px 8px' }}
                  >
                    <option value="ID_PROOF">ID Proof</option>
                    <option value="ADDRESS_PROOF">Address Proof</option>
                    <option value="SALARY_SLIP">Salary Slip</option>
                    <option value="BANK_STATEMENT">Bank Statement</option>
                  </select>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeDoc(index)}>
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-md" style={{ justifyContent: 'space-between', marginTop: 24 }}>
        <button type="button" className="btn btn-secondary" onClick={onBack}>Back</button>
        <button type="button" className="btn btn-primary" onClick={onNext}>Review Application</button>
      </div>
    </div>
  );
};
