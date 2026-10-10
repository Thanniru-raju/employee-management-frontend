import React from 'react';
import { Eye, Edit3, Trash2, Mail, Briefcase, DollarSign, UserX } from 'lucide-react';

export default function EmployeeTable({
  employees,
  isLoading,
  onView,
  onEdit,
  onDelete,
  onAddClick,
  searchQuery,
}) {
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

  const getDepartmentColorClass = (dept) => {
    if (!dept) return 'dept-default';
    const lower = dept.toLowerCase();
    if (lower.includes('eng') || lower.includes('dev') || lower.includes('tech')) return 'dept-tech';
    if (lower.includes('sales') || lower.includes('market')) return 'dept-sales';
    if (lower.includes('hr') || lower.includes('human')) return 'dept-hr';
    if (lower.includes('fin') || lower.includes('acc')) return 'dept-finance';
    if (lower.includes('oper') || lower.includes('logis')) return 'dept-ops';
    return 'dept-default';
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(Number(salary) || 0);
  };

  if (isLoading) {
    return (
      <div className="table-loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading workforce records from MySQL database...</p>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-wrapper">
          <UserX size={44} />
        </div>
        <h3 className="empty-title">
          {searchQuery ? 'No matching employees found' : 'No employees registered yet'}
        </h3>
        <p className="empty-desc">
          {searchQuery
            ? `We couldn't find any employee matching "${searchQuery}". Try a different keyword.`
            : 'Start building your company database by registering your first employee record.'}
        </p>
        {!searchQuery && (
          <button className="btn btn-primary" onClick={onAddClick}>
            Add First Employee
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="table-responsive-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th className="th-id">ID</th>
            <th>Employee</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th className="th-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="employee-row" id={`employee-row-${emp.id}`}>
              <td className="td-id">
                <span className="id-badge">#{emp.id}</span>
              </td>

              <td className="td-name">
                <div className="avatar-cell">
                  <div className="avatar-circle">{getInitials(emp.name)}</div>
                  <div className="name-details">
                    <span className="emp-full-name">{emp.name}</span>
                  </div>
                </div>
              </td>

              <td className="td-email">
                <div className="email-cell">
                  <Mail size={14} className="cell-icon" />
                  <span className="email-text">{emp.email}</span>
                </div>
              </td>

              <td className="td-dept">
                <span className={`dept-pill ${getDepartmentColorClass(emp.department)}`}>
                  {emp.department}
                </span>
              </td>

              <td className="td-designation">
                <div className="designation-cell">
                  <Briefcase size={14} className="cell-icon" />
                  <span>{emp.designation}</span>
                </div>
              </td>

              <td className="td-salary">
                <span className="salary-text">{formatSalary(emp.salary)}</span>
              </td>

              <td className="td-actions">
                <div className="action-buttons-group">
                  <button
                    id={`view-btn-${emp.id}`}
                    className="action-btn view-btn"
                    onClick={() => onView(emp)}
                    title="View details"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    id={`edit-btn-${emp.id}`}
                    className="action-btn edit-btn"
                    onClick={() => onEdit(emp)}
                    title="Edit employee"
                  >
                    <Edit3 size={16} />
                  </button>

                  <button
                    id={`delete-btn-${emp.id}`}
                    className="action-btn delete-btn"
                    onClick={() => onDelete(emp)}
                    title="Delete employee"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
