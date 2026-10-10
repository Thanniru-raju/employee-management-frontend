import React, { useState, useEffect } from 'react';
import { X, User, Mail, Building, Briefcase, DollarSign, AlertCircle } from 'lucide-react';

const DEPARTMENTS = [
  'Engineering',
  'Human Resources',
  'Marketing',
  'Sales',
  'Finance',
  'Operations',
  'Legal',
  'Product Design',
  'Customer Support',
];

export default function EmployeeModal({
  isOpen,
  onClose,
  onSubmit,
  employeeToEdit,
  isSubmitting,
  backendError,
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    designation: '',
    salary: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        name: employeeToEdit.name || '',
        email: employeeToEdit.email || '',
        department: employeeToEdit.department || 'Engineering',
        designation: employeeToEdit.designation || '',
        salary: employeeToEdit.salary ? String(employeeToEdit.salary) : '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        department: 'Engineering',
        designation: '',
        salary: '',
      });
    }
    setErrors({});
  }, [employeeToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. user@company.com)';
    }

    if (!formData.department.trim()) {
      errs.department = 'Department is required';
    }

    if (!formData.designation.trim()) {
      errs.designation = 'Designation/Job title is required';
    }

    if (!formData.salary) {
      errs.salary = 'Salary amount is required';
    } else if (isNaN(Number(formData.salary)) || Number(formData.salary) <= 0) {
      errs.salary = 'Salary must be a positive number greater than 0';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      department: formData.department.trim(),
      designation: formData.designation.trim(),
      salary: parseFloat(formData.salary),
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              {employeeToEdit ? 'Edit Employee Details' : 'Register New Employee'}
            </h2>
            <p className="modal-subtitle">
              {employeeToEdit
                ? `Update information for #${employeeToEdit.id} ${employeeToEdit.name}`
                : 'Enter workforce member information for persistent storage in MySQL'}
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close dialog">
            <X size={20} />
          </button>
        </div>

        {backendError && (
          <div className="modal-alert modal-alert-error">
            <AlertCircle size={18} />
            <span>{backendError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="form-name" className="form-label">
              Full Name <span className="required-star">*</span>
            </label>
            <div className={`input-wrapper ${errors.name ? 'input-error' : ''}`}>
              <User size={18} className="input-icon" />
              <input
                id="form-name"
                name="name"
                type="text"
                className="form-input"
                placeholder="e.g. Sarah Jenkins"
                value={formData.name}
                onChange={handleChange}
                autoFocus
              />
            </div>
            {errors.name && <span className="field-error-text">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="form-email" className="form-label">
              Work Email <span className="required-star">*</span>
            </label>
            <div className={`input-wrapper ${errors.email ? 'input-error' : ''}`}>
              <Mail size={18} className="input-icon" />
              <input
                id="form-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="e.g. s.jenkins@enterprise.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <span className="field-error-text">{errors.email}</span>}
          </div>

          {/* Department & Designation in two columns */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="form-department" className="form-label">
                Department <span className="required-star">*</span>
              </label>
              <div className={`input-wrapper ${errors.department ? 'input-error' : ''}`}>
                <Building size={18} className="input-icon" />
                <select
                  id="form-department"
                  name="department"
                  className="form-input form-select"
                  value={formData.department}
                  onChange={handleChange}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              {errors.department && <span className="field-error-text">{errors.department}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="form-designation" className="form-label">
                Designation <span className="required-star">*</span>
              </label>
              <div className={`input-wrapper ${errors.designation ? 'input-error' : ''}`}>
                <Briefcase size={18} className="input-icon" />
                <input
                  id="form-designation"
                  name="designation"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Senior Software Engineer"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>
              {errors.designation && <span className="field-error-text">{errors.designation}</span>}
            </div>
          </div>

          {/* Salary Field */}
          <div className="form-group">
            <label htmlFor="form-salary" className="form-label">
              Annual Salary (USD) <span className="required-star">*</span>
            </label>
            <div className={`input-wrapper ${errors.salary ? 'input-error' : ''}`}>
              <DollarSign size={18} className="input-icon" />
              <input
                id="form-salary"
                name="salary"
                type="number"
                step="500"
                min="1"
                className="form-input"
                placeholder="e.g. 85000"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
            {errors.salary && <span className="field-error-text">{errors.salary}</span>}
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              id="submit-employee-btn"
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="button-spinner"></span>
                  <span>{employeeToEdit ? 'Updating Record...' : 'Saving to MySQL...'}</span>
                </>
              ) : (
                <span>{employeeToEdit ? 'Save Changes' : 'Create Employee'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
