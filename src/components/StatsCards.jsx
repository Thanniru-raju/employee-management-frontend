import React from 'react';
import { Users, Building2, DollarSign, TrendingUp } from 'lucide-react';

export default function StatsCards({ employees }) {
  const totalEmployees = employees.length;

  const uniqueDepartments = new Set(
    employees.map((e) => e.department && e.department.trim().toLowerCase())
  ).size;

  const totalPayroll = employees.reduce((sum, e) => sum + (Number(e.salary) || 0), 0);
  const avgSalary = totalEmployees > 0 ? totalPayroll / totalEmployees : 0;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const cards = [
    {
      id: 'stat-total-emp',
      title: 'Total Employees',
      value: totalEmployees,
      icon: Users,
      color: 'blue',
      change: 'Active workforce',
    },
    {
      id: 'stat-dept-count',
      title: 'Departments',
      value: uniqueDepartments,
      icon: Building2,
      color: 'purple',
      change: 'Operational units',
    },
    {
      id: 'stat-total-payroll',
      title: 'Total Payroll',
      value: formatCurrency(totalPayroll),
      icon: DollarSign,
      color: 'emerald',
      change: 'Monthly compensation',
    },
    {
      id: 'stat-avg-salary',
      title: 'Average Salary',
      value: formatCurrency(avgSalary),
      icon: TrendingUp,
      color: 'amber',
      change: 'Per employee average',
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.id} id={card.id} className={`stat-card stat-${card.color}`}>
            <div className="stat-card-header">
              <div>
                <p className="stat-label">{card.title}</p>
                <h3 className="stat-value">{card.value}</h3>
              </div>
              <div className="stat-icon-wrapper">
                <Icon size={24} />
              </div>
            </div>
            <div className="stat-footer">
              <span className="stat-footer-text">{card.change}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
