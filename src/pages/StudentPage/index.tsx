import { useState, useEffect, JSX } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@components/common/Button';
import StudentList from '@components/StudentList';
import Header from '@components/PageHeader';
import Pagination from '@components/common/Pagination';
import { useToast } from 'contexts/Toast.context';
import { IStudent } from 'types/student';
import { ISortConfig } from 'types/sort';
import { sortStudents } from '@utils/sort-function';
import StudentSortDropdown from '@components/StudentSortDropdown';
import Text from '@components/common/Text';
import StudentForm from '@components/StudentForm';
import { useStudentOperations } from '@hooks/useStudentOperations';
import { useStudentForm } from '@hooks/useStudentForm';
import { usePagination } from '@hooks/usePagination'; // Import the new hook
import './index.css';
import LoadingSpinner from '@components/common/LoadingSpinner';

/**
 * StudentsPage Component
 *
 * This component serves as the main page for managing student data. It provides features such as:
 * - Displaying a list of students with pagination and sorting.
 * - Adding, editing, and deleting student records.
 * - Searching for students by name or other criteria.
 * - Managing form state and validation for student data.
 */
const StudentsPage = (): JSX.Element => {
  const location = useLocation();
  const { showToast, showConfirmation } = useToast();

  // Student operations using the custom hook
  const { allStudents, isLoading, loadStudents, saveStudent, deleteStudent } =
    useStudentOperations(showToast);

  // State variables for UI control
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | undefined>(undefined);
  const [displayedStudents, setDisplayedStudents] = useState<IStudent[]>([]);
  const [searchedStudents, setSearchedStudents] = useState<IStudent[] | null>(null);
  const [sortConfig, setSortConfig] = useState<ISortConfig>({ field: 'name', order: 'asc' });
  const [simulatedLoading, setSimulatedLoading] = useState(true); /// for demonstration purposes

  useEffect(() => {
    if (!isLoading) {
      // Once actual loading is done, keep showing the loading state for demonstration
      const timer = setTimeout(() => {
        setSimulatedLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Student form management using the custom hook
  const {
    formData,
    errors,
    tempAvatarUrl,
    isEditMode,
    handleInputChange,
    handleFileSelect,
    initializeForm,
    handleSubmitForm,
  } = useStudentForm(allStudents, saveStudent);

  // Get URL search params for initial pagination values
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get('page') ?? '1', 10);
  const initialItemsPerPage = parseInt(searchParams.get('perPage') ?? '5', 10);

  // Use the pagination hook
  const {
    currentPage,
    itemsPerPage,
    paginatedItems: paginatedStudents,
    handlePageChange,
  } = usePagination(displayedStudents, {
    initialPage,
    initialItemsPerPage,
  });

  // Load students on initial mount
  useEffect(() => {
    loadStudents();
  }, []);

  // Update displayed students when allStudents changes
  useEffect(() => {
    setDisplayedStudents(allStudents);
  }, [allStudents]);

  // Apply sort whenever sort config changes or displayed students change due to search
  useEffect(() => {
    if (searchedStudents !== null) {
      setDisplayedStudents(sortStudents(searchedStudents, sortConfig));
    } else {
      setDisplayedStudents(sortStudents(allStudents, sortConfig));
    }
  }, [sortConfig, searchedStudents, allStudents]);

  // Handle sort change
  const handleSortChange = (newConfig: ISortConfig) => {
    setSortConfig(newConfig);
  };

  // Handle search results
  const handleSearchResults = (filteredStudents: IStudent[]) => {
    if (
      filteredStudents.length === allStudents.length &&
      JSON.stringify(filteredStudents) === JSON.stringify(allStudents)
    ) {
      setSearchedStudents(null);
    } else {
      setSearchedStudents(filteredStudents);
    }
  };

  // Initialize form when opening the form modal
  useEffect(() => {
    if (showForm) {
      initializeForm(selectedStudent);
    }
  }, [showForm, selectedStudent, initializeForm]);

  // Edit student handler
  const handleEditStudent = (student: IStudent) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  // Form submission wrapper
  const handleFormSubmit = async () => {
    const success = await handleSubmitForm();
    if (success) {
      setShowForm(false);
      setSelectedStudent(undefined);
    }
  };

  // Delete student confirmation
  const handleDeleteStudent = (student: IStudent) => {
    showConfirmation(
      'Delete Student',
      `Are you sure you want to delete this student ${student.name}?`,
      () => deleteStudent(student),
      () => {},
    );
  };

  return (
    <div>
      <Header
        allStudents={allStudents}
        onSearchResults={handleSearchResults}
        searchPlaceholder="Search students..."
      />
      <section className="page">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <div className="page-header" style={{ backgroundColor: 'transparent' }}>
            <Text className="page-name" text="Students List" />
          </div>
          <div className="page-actions">
            <StudentSortDropdown onSortChange={handleSortChange} initialConfig={sortConfig} />
            <Button
              variant="add"
              aria-label="Add new student"
              onClick={() => {
                setSelectedStudent(undefined);
                setShowForm(true);
              }}
            >
              <Text text="ADD NEW STUDENT" as="span" />
            </Button>
          </div>
        </div>
        {isLoading || simulatedLoading ? (
          <LoadingSpinner loadingText="Loading students list... Please wait..." />
        ) : (
          <>
            <StudentList
              students={paginatedStudents}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
            />

            <Pagination
              totalItems={displayedStudents.length}
              onPageChange={handlePageChange}
              initialPage={currentPage}
              initialItemsPerPage={itemsPerPage}
            />
          </>
        )}

        {/* Student Form Modal */}
        <StudentForm
          formData={formData}
          errors={errors}
          tempAvatarUrl={tempAvatarUrl}
          isOpen={showForm}
          isEditMode={isEditMode}
          onInputChange={handleInputChange}
          onFileSelect={handleFileSelect}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      </section>
    </div>
  );
};

export default StudentsPage;
