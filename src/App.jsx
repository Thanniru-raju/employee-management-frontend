import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import SearchBar from './components/SearchBar';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/EmployeeModal';
import EmployeeDetailsModal from './components/EmployeeDetailsModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import employeeService from './services/api';
import './App.css';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalBackendError, setModalBackendError] = useState(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [employeeToView, setEmployeeToView] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  // Fetch employees from Spring Boot REST API
  const fetchEmployees = useCallback(async (query = '') => {
    setIsLoading(true);
    try {
      const data = await employeeService.getAllEmployees(query);
      setEmployees(Array.isArray(data) ? data : []);
      setIsBackendOnline(true);
    } catch (err) {
      console.error('Failed to load employees:', err);
      setIsBackendOnline(false);
      showToast('error', `Cannot reach backend API: ${err.message}. Make sure Spring Boot is running on port 8080.`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Handle Search Input Change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    fetchEmployees(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchEmployees('');
  };

  // Open Form Modal for Adding
  const handleOpenAddModal = () => {
    setEmployeeToEdit(null);
    setModalBackendError(null);
    setIsFormModalOpen(true);
  };

  // Open Form Modal for Editing
  const handleOpenEditModal = (emp) => {
    setEmployeeToEdit(emp);
    setModalBackendError(null);
    setIsFormModalOpen(true);
  };

  // Open View Details Modal
  const handleOpenViewModal = (emp) => {
    setEmployeeToView(emp);
    setIsDetailsModalOpen(true);
  };

  // Open Delete Confirmation Modal
  const handleOpenDeleteModal = (emp) => {
    setEmployeeToDelete(emp);
    setIsDeleteModalOpen(true);
  };

  // Form Submit Handler (Handles both Create and Update)
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setModalBackendError(null);

    try {
      if (employeeToEdit) {
        // Update Employee: PUT /api/employees/{id}
        const updated = await employeeService.updateEmployee(employeeToEdit.id, formData);
        showToast('success', `Employee "${updated.name}" updated successfully!`);
      } else {
        // Create Employee: POST /api/employees
        const created = await employeeService.createEmployee(formData);
        showToast('success', `Employee "${created.name}" created and saved to MySQL!`);
      }

      setIsFormModalOpen(false);
      setEmployeeToEdit(null);
      fetchEmployees(searchQuery);
    } catch (err) {
      console.error('Save failed:', err);
      const errMsg = err.message || 'An error occurred while saving.';
      // Check if duplicate email error (HTTP 409)
      if (err.status === 409 || errMsg.toLowerCase().includes('already exists') || errMsg.toLowerCase().includes('duplicate')) {
        setModalBackendError(errMsg);
      } else if (err.status === 400 && err.data && err.data.validationErrors) {
        const errorList = Object.values(err.data.validationErrors).join(', ');
        setModalBackendError(`Validation error: ${errorList}`);
      } else {
        setModalBackendError(errMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Handler: DELETE /api/employees/{id}
  const handleDeleteConfirm = async () => {
    if (!employeeToDelete) return;
    setIsDeleting(true);

    try {
      await employeeService.deleteEmployee(employeeToDelete.id);
      showToast('success', `Employee "${employeeToDelete.name}" was permanently deleted.`);
      setIsDeleteModalOpen(false);
      setEmployeeToDelete(null);
      fetchEmployees(searchQuery);
    } catch (err) {
      console.error('Delete failed:', err);
      showToast('error', `Failed to delete employee: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header Navigation */}
      <Navbar
        onAddClick={handleOpenAddModal}
        isBackendOnline={isBackendOnline}
        totalCount={employees.length}
      />

      {/* Main Dashboard Container */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Top Metric Cards */}
          <StatsCards employees={employees} />

          {/* Table Card Section */}
          <div className="content-card">
            <div className="content-card-header">
              <div>
                <h2 className="card-title">Employee Directory</h2>
                <p className="card-subtitle">Manage workforce records stored in persistent MySQL database</p>
              </div>
            </div>

            {/* Search and Action Bar */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onClearSearch={handleClearSearch}
              onRefresh={() => fetchEmployees(searchQuery)}
              totalResults={employees.length}
              isLoading={isLoading}
            />

            {/* Employees Data Table */}
            <EmployeeTable
              employees={employees}
              isLoading={isLoading}
              onView={handleOpenViewModal}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
              onAddClick={handleOpenAddModal}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <EmployeeModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        employeeToEdit={employeeToEdit}
        isSubmitting={isSubmitting}
        backendError={modalBackendError}
      />

      <EmployeeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        employee={employeeToView}
        onEdit={(emp) => handleOpenEditModal(emp)}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        employee={employeeToDelete}
        isDeleting={isDeleting}
      />

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>
          Employee Management System &copy; {new Date().getFullYear()} &bull; Built with React, Spring Boot 3 &amp; MySQL
        </p>
      </footer>
    </div>
  );
}
