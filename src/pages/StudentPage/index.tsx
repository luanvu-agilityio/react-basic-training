import React, { useState, useEffect, useCallback, useRef, JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@components/common/Button';
import StudentForm from '@components/StudentForm';
import StudentList from '@components/StudentList';
import Header from '@components/PageHeader';
import Pagination from '@components/common/Pagination';
import { useToast } from 'contexts/Toast.context';
import { IStudent } from 'types/student';
import { ISortConfig } from 'types/sort';
import { generateUUID } from '@helpers/uuid-generator';
import { sortStudents } from '@helpers/sort-function';
import { getDataService } from 'services/student-service';
import Title from '@components/common/Title';
import './index.css';
import StudentSortDropdown from '@components/StudentSortDropdown';
import Text from '@components/common/Text';

/**
 * StudentsPage Component
 *
 * This component serves as the main page for managing student data. It provides features such as:
 * - Displaying a list of students with pagination and sorting.
 * - Adding, editing, and deleting student records.
 * - Searching for students by name or other criteria.
 * - Showing a form in a modal for adding or editing student details.
 */
const StudentsPage = (): JSX.Element => {
  const location = useLocation(); // React Router hook to access the current location.
  const navigate = useNavigate(); // React Router hook to programmatically navigate.
  // Add a ref to track if this is the initial load
  const initialLoadRef = useRef(true);

  // State variables
  const [allStudents, setAllStudents] = useState<IStudent[]>([]); // Stores all students fetched from the backend
  const [displayedStudents, setDisplayedStudents] = useState<IStudent[]>([]); // Students currently displayed (filtered or sorted)
  const [showForm, setShowForm] = useState(false); // Controls visibility of the student form modal
  const [selectedStudent, setSelectedStudent] = useState<IStudent | undefined>(undefined); // Stores the student being edited
  const { showToast, showConfirmation } = useToast(); // Toast notifications and confirmation dialogs
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching students
  const [sortConfig, setSortConfig] = useState<ISortConfig>({ field: 'name', order: 'asc' }); // Sorting configuration
  const [searchedStudents, setSearchedStudents] = useState<IStudent[] | null>(null); // Stores search results
  const [paginatedStudents, setPaginatedStudents] = useState<IStudent[]>([]); // Students displayed on the current page

  // Parse initial page and items per page from URL
  const [currentPage, setCurrentPage] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get('page') ?? '1', 10); // Default to page 1 if not specified.
  });

  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get('perPage') ?? '5', 10); // Default to 5 items per page if not specified.
  });

  // Update URL when pagination changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', currentPage.toString());
    searchParams.set('perPage', itemsPerPage.toString());

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true, // Replace the current history entry to avoid creating duplicate entries.
    });
  }, [currentPage, itemsPerPage, navigate, location.pathname]);

  // Fetch all students
  const loadStudents = useCallback(async () => {
    try {
      setIsLoading(true);
      const service = await getDataService();
      const fetchedStudents = await service.getAll();
      setAllStudents(fetchedStudents);
      setDisplayedStudents(fetchedStudents);
    } catch (error) {
      console.error('Failed to load students: ', error);
      showToast('error', 'Error', 'Failed to load students. Please try again.', 3000);
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (initialLoadRef.current) {
      loadStudents();
      initialLoadRef.current = false;
    }
  }, []);

  // Apply sort whenever sort config changes or displayed students change due to search
  useEffect(() => {
    // If search has been performed, sort the search results
    if (searchedStudents !== null) {
      // If search results exist, sort the search results.
      setDisplayedStudents(sortStudents(searchedStudents, sortConfig));
    } else {
      // Otherwise, sort all students.
      setDisplayedStudents(sortStudents(allStudents, sortConfig));
    }
  }, [sortConfig, searchedStudents, allStudents]);

  // Handle search results
  const handleSearchResults = (filteredStudents: IStudent[]) => {
    // Check if the search is being cleared (matching all students)
    if (
      filteredStudents.length === allStudents.length &&
      JSON.stringify(filteredStudents) === JSON.stringify(allStudents)
    ) {
      setSearchedStudents(null); // Reset to null to use allStudents directly
    } else {
      setSearchedStudents(filteredStudents);
    }
  };

  // Handle pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage; // Calculate the starting index for the current page.
    const endIndex = startIndex + itemsPerPage; // Calculate the ending index for the current page.
    setPaginatedStudents(displayedStudents.slice(startIndex, endIndex)); // Update the paginated students state.
  }, [displayedStudents, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (page: number, perPage: number) => {
    setCurrentPage(page); // Update the current page state.
    setItemsPerPage(perPage); // Update the items per page state.
  };

  const handleSortChange = (newConfig: ISortConfig) => {
    setSortConfig(newConfig);
  };

  // Save student (add or update)
  const handleSaveStudent = async (studentData: Partial<IStudent>) => {
    try {
      const service = await getDataService();
      if (studentData.id) {
        // Update existing student
        const updatedStudent = await service.update(studentData as IStudent);
        setAllStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student,
          ),
        ); // Update the allStudents state.
        setDisplayedStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student,
          ),
        ); // Update the displayedStudents state.
        showToast('success', 'Success', 'Student updated successfully!', 3000);
      } else {
        // Add new student
        const newStudent = {
          ...studentData,
          id: generateUUID(), // Generate a unique ID
        } as IStudent;
        console.log(newStudent);
        const createdStudent = await service.create(newStudent);

        setAllStudents((prevStudents) => [...prevStudents, createdStudent]); // Add the new student to the allStudents state.
        setDisplayedStudents((prevStudents) => [...prevStudents, createdStudent]); // Add the new student to the displayedStudents state.
        showToast('success', 'Success', 'Student added successfully!', 3000);
      }
      setShowForm(false); // Close the form modal.
      setSelectedStudent(undefined); // Clear the selected student state.
    } catch (error) {
      console.error('failed to save student:', error);
      showToast('error', 'Error', 'Failed to save student. Please try again', 3000);
    }
  };

  // Edit student
  const handleEditStudent = (student: IStudent) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  // Delete student
  const deleteStudent = async (student: IStudent) => {
    try {
      const service = await getDataService();
      await service.delete(student.id);

      setAllStudents((prevStudents) => prevStudents.filter((s) => s.id !== student.id)); // Remove the student from the allStudents state.

      if (searchedStudents !== null) {
        setSearchedStudents(searchedStudents.filter((s) => s.id !== student.id)); // Remove the student from the search results.
      }
      showToast('info', 'Deleted', 'Student has been deleted', 3000);
    } catch (error) {
      console.error('Failed to delete student:', error);
      showToast('error', 'Error', 'Failed to delete student. Please try again.', 3000);
    }
  };

  // Confirm delete student
  const handleDeleteStudent = (student: IStudent) => {
    showConfirmation(
      'Delete Student',
      `Are you sure you want to delete this student ${student.name} ?`, // Confirmation message.
      () => deleteStudent(student),
      () => console.log('Delete cancelled'),
    );
  };

  // Cancel form
  const handleCancelForm = () => {
    setShowForm(false); // Close the form modal.
    setSelectedStudent(undefined); // Clear the selected student state.
  };

  const getStudents = useCallback(async (): Promise<IStudent[]> => {
    const service = await getDataService();
    return service.getAll();
  }, []);

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
          <div className="page__header">
            <Title className="page__title" title="Students List" />
          </div>
          <div className="page__action">
            <StudentSortDropdown onSortChange={handleSortChange} initialConfig={sortConfig} />
            <Button
              className="btn btn--add"
              aria-label="Add new student"
              onClick={() => {
                setSelectedStudent(undefined); // Clear the selected student state.
                setShowForm(true);
              }}
            >
              <span>ADD NEW STUDENT</span>
            </Button>
          </div>
        </div>
        {isLoading ? (
          <Text className="loading-text" text="Loading students..." />
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
        {showForm && (
          <StudentForm
            isOpen={showForm}
            onClose={() => setShowForm(false)}
            onSave={handleSaveStudent}
            onCancel={handleCancelForm}
            getStudents={getStudents}
            student={selectedStudent}
          />
        )}
      </section>
    </div>
  );
};
export default StudentsPage;
