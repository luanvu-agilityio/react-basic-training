import { useState, useEffect, JSX } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
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
import { usePagination } from '@hooks/usePagination';
import LoadingSpinner from '@components/common/LoadingSpinner';

// Styled components
const PageContainer = styled.section`
  padding: 0 3rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #f8f8f8;
  height: calc(100vh - 6rem);
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    padding: 0 1rem;
  }

  @media screen and (max-width: 480px) {
    height: 100vh;
    padding: 0 1rem;
  }
`;

const PageHeader = styled.div`
  background-color: transparent;
`;

const PageName = styled(Text)`
  font-size: var(--font-size-22);
  font-weight: var(--font-weight-bold);
`;

const PageActions = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 2rem;
`;

const AddButton = styled(Button)`
  @media screen and (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

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
  const [simulatedLoading, setSimulatedLoading] = useState(true); // for demonstration purposes

  useEffect(() => {
    if (!isLoading) {
      // Once actual loading is done, keep showing the loading state for demonstration
      const timer = setTimeout(() => {
        setSimulatedLoading(false);
      }, 1000);

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
    loadStudents();
  }, []);

  // Update displayed students when allStudents changes
  useEffect(() => {
    setDisplayedStudents(allStudents);
  }, [allStudents]);

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
      setSearchedStudents(null);
    } else {
      setSearchedStudents(filteredStudents);
    }
  };

  // Initialize form when opening the form modal
  // Initialize form when opening the form modal
  useEffect(() => {
    if (showForm) {
      initializeForm(selectedStudent);
    }
  }, [showForm, selectedStudent, initializeForm]);
      initializeForm(selectedStudent);
    }
  }, [showForm, selectedStudent, initializeForm]);

  // Edit student handler
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
        searchPlaceholder="Search..."
      />
      <PageContainer>
        <HeaderRow>
          <PageHeader>
            <PageName text="Students List" />
          </PageHeader>
          <PageActions>
            <StudentSortDropdown onSortChange={handleSortChange} initialConfig={sortConfig} />
            <AddButton
              variant="add"
              aria-label="Add new student"
              onClick={() => {
                setSelectedStudent(undefined);
                setSelectedStudent(undefined);
                setShowForm(true);
              }}
            >
              <Text text="ADD NEW STUDENT" as="span" />
            </AddButton>
          </PageActions>
        </HeaderRow>
        {isLoading || simulatedLoading ? (
          <LoadingSpinner loadingText="Loading students data... Please wait..." />
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

        {/* Student Form Modal remains unchanged as it's a separate component */}
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
      </PageContainer>
    </div>
  );
};


export default StudentsPage;
