import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@components/common/buttons/Button';
import StudentForm from '@components/student/StudentForm/StudentForm';
import StudentList from '@components/student/StudentList/StudentList';
import Header from '@components/layout/header/Header/Header';
import SortDropdown from '@components/student/SortDropdown/SortDropdown';
import Pagination from '@components/common/pagination/Pagination';
import { useToast } from 'contexts/Toast.context';
import { IStudent } from 'types/student';
import { ISortConfig } from 'types/sort';
import { generateUUID } from '@helpers/uuid-generator';
import { sortStudents } from '@helpers/sort-function';
import { getDataService } from 'services/student-service';

const StudentsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [allStudents, setAllStudents] = useState<IStudent[]>([]);
  const [displayedStudents, setDisplayedStudents] = useState<IStudent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | undefined>(undefined);
  const { showToast, showConfirmation } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<ISortConfig>({ field: 'name', order: 'asc' });
  const [searchedStudents, setSearchedStudents] = useState<IStudent[] | null>(null);
  const [paginatedStudents, setPaginatedStudents] = useState<IStudent[]>([]);

  // Parse initial page and items per page from URL
  const [currentPage, setCurrentPage] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get('page') ?? '1', 10);
  });

  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get('perPage') ?? '5', 10);
  });

  // Update URL when pagination changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', currentPage.toString());
    searchParams.set('perPage', itemsPerPage.toString());

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  }, [currentPage, itemsPerPage, navigate, location.pathname]);

  useEffect(() => {
    const loadStudents = async () => {
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
    };
    loadStudents();
  }, [showToast]);

  // Apply sort whenever sort config changes or displayed students change due to search
  useEffect(() => {
    // If search has been performed, sort the search results
    if (searchedStudents !== null) {
      setDisplayedStudents(sortStudents(searchedStudents, sortConfig));
    } else {
      setDisplayedStudents(sortStudents(allStudents, sortConfig));
    }
  }, [sortConfig, searchedStudents, allStudents]);

  const handleSearchResults = (filteredStudents: IStudent[]) => {
    setSearchedStudents(filteredStudents);
  };

  // Handle pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedStudents(displayedStudents.slice(startIndex, endIndex));
  }, [displayedStudents, currentPage, itemsPerPage]);

  const handlePageChange = (page: number, perPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(perPage);
  };

  const handleSortChange = (newConfig: ISortConfig) => {
    setSortConfig(newConfig);
  };

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
        );
        setDisplayedStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student,
          ),
        );
        showToast('success', 'Success', 'Student updated successfully!', 3000);
      } else {
        // Add new student
        const newStudent = {
          ...studentData,
          id: generateUUID(), // Generate a unique ID
        } as IStudent;
        console.log(newStudent);
        const createdStudent = await service.create(newStudent);

        setAllStudents((prevStudents) => [...prevStudents, createdStudent]);
        setDisplayedStudents((prevStudents) => [...prevStudents, createdStudent]);
        showToast('success', 'Success', 'Student added successfully!', 3000);
      }
      setShowForm(false);
      setSelectedStudent(undefined);
    } catch (error) {
      console.error('failed to save student:', error);
      showToast('error', 'Error', 'Failed to save student. Please try again', 3000);
    }
  };

  const handleEditStudent = (student: IStudent) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  const deleteStudent = async (student: IStudent) => {
    try {
      const service = await getDataService();
      await service.delete(student.id);
      setAllStudents((prevStudents) => prevStudents.filter((s) => s.id !== student.id));
      if (searchedStudents !== null) {
        setSearchedStudents(searchedStudents.filter((s) => s.id !== student.id));
      }
      showToast('info', 'Deleted', 'Student has been deleted', 3000);
    } catch (error) {
      console.error('Failed to delete student:', error);
      showToast('error', 'Error', 'Failed to delete student. Please try again.', 3000);
    }
  };

  const handleDeleteStudent = (student: IStudent) => {
    showConfirmation(
      'Delete Student',
      `Are you sure you want to delete this student ${student.name} ?`,
      () => deleteStudent(student),
      () => console.log('Delete cancelled'),
    );
  };
  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedStudent(undefined);
  };

  const getStudents = async (): Promise<IStudent[]> => {
    const service = await getDataService();
    return service.getAll();
  };

  return (
    <div>
      <Header allStudents={allStudents} onSearchResults={handleSearchResults} />
      <section className="page">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div className="page__header">
            <h1 className="page__title">Students List</h1>
          </div>
          <div className="page__action">
            <SortDropdown onSortChange={handleSortChange} initialConfig={sortConfig} />
            <Button
              className="page__add-btn"
              buttonType="add"
              htmlType="button"
              onClick={() => {
                setSelectedStudent(undefined);
                setShowForm(true);
              }}
            >
              ADD NEW STUDENT
            </Button>
          </div>
        </div>
        {isLoading ? (
          <div> Loading students...</div>
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
