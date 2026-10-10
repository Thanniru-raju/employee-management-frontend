import React from 'react';
import { X, Mail, Building, Briefcase, DollarSign, Calendar, Edit3, ShieldCheck } from 'lucide-react';

export default function EmployeeDetailsModal({ employee, isOpen, onClose, onEdit }) {
  if (!isOpen || !employee) return null;

  const getInitials = (name) => {
    if (!name) return 'EM';
    return name
      .split(' ')
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(Number(val) || 0);
  };

  const monthlySalary = (Number(employee.salary) || 0) / 12;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-card-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Employee Profile</h2>
            <p className="modal-subtitle">Record verified in database</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close dialog">
            <X size={20} />
          </button>
        </div>

        <div className="profile-hero">
          <div className="profile-avatar-large">{getInitials(employee.name)}</div>
          <div className="profile-hero-info">
            <div className="profile-name-row">
              <h3 className="profile-name">{employee.name}</h3>
              <span className="profile-id-tag">ID: #{employee.id}</span>
            </div>
            <p className="profile-role">{employee.designation}</p>
            <span className="profile-dept-badge">{employee.department}</span>
          </div>
        </div>

        <div className="profile-details-grid">
          <div className="detail-item">
            <div className="detail-icon-wrap">
              <Mail size={16} />
            </div>
            <div className="detail-content">
              <span className="detail-label">Work Email</span>
              <a href={`mailto:${employee.email}`} className="detail-value email-link">
                {employee.email}
              </a>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon-wrap">
              <Building size={16} />
            </div>
            <div className="detail-content">
              <span className="detail-label">Department</span>
              <span className="detail-value">{employee.department}</span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon-wrap">
              <Briefcase size={16} />
            </div>
            <div className="detail-content">
              <span className="detail-label">Designation</span>
              <span className="detail-value">{employee.designation}</span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon-wrap">
              <DollarSign size={16} />
            </div>
            <div className="detail-content">
              <span className="detail-label">Annual Salary</span>
              <span className="detail-value highlight-salary">
                {formatCurrency(employee.salary)}
              </span>
            </div>
          </div>
        </div>

        <div className="compensation-card">
          <div className="comp-row">
            <span className="comp-label">Estimated Monthly Gross:</span>
            <span className="comp-val">{formatCurrency(monthlySalary)}</span>
          </div>
          <div className="comp-row">
            <span className="comp-label">Employment Status:</span>
            <span className="comp-status">
              <ShieldCheck size={14} /> Full-Time Active
            </span>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onEdit(employee);
            }}
          >
            <Edit3 size={16} />
            <span>Edit Employee</span>
          </button>
        </div>
      </div>
    </div>
  );
}
