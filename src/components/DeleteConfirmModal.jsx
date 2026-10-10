import React from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  employee,
  isDeleting,
}) {
  if (!isOpen || !employee) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-card-sm modal-danger" onClick={(e) => e.stopPropagation()}>
        <div className="danger-header">
          <div className="danger-icon-wrapper">
            <AlertTriangle size={32} />
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Cancel">
            <X size={20} />
          </button>
        </div>

        <div className="danger-body">
          <h2 className="danger-title">Delete Employee Record</h2>
          <p className="danger-text">
            Are you sure you want to permanently delete{' '}
            <strong>{employee.name}</strong> (Employee ID <strong>#{employee.id}</strong>)?
          </p>
          <div className="danger-note">
            ⚠️ This operation cannot be undone. The employee will be permanently removed from your MySQL database.
          </div>
        </div>

        <div className="modal-actions danger-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            id="confirm-delete-btn"
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span className="button-spinner"></span>
                <span>Deleting Record...</span>
              </>
            ) : (
              <>
                <Trash2 size={16} />
                <span>Yes, Delete Employee</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
