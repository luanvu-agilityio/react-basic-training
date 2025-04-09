import { useState, useCallback } from 'react';
import { IStudent } from 'types/student';
import { getDataService } from 'services/student-service';
import { generateUUID } from '@utils/uuid-generator';

/**
 * Custom hook for student CRUD operations
 */
export const useStudentOperations = (
  showToast: (
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message: string,
    duration?: number,
  ) => void,
) => {
  const [allStudents, setAllStudents] = useState<IStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches all students from the data service
   */
  const loadStudents = useCallback(async () => {
    try {
      setIsLoading(true);
      const service = await getDataService();
      const fetchedStudents = await service.getAll();
      setAllStudents(fetchedStudents);
    } catch (error) {
      console.error('Failed to load students: ', error);
      showToast('error', 'Error', 'Failed to load students. Please try again.', 3000);
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  /**
   * Saves a student (create or update)
   * Returns true if successful, false otherwise
   */
  const saveStudent = useCallback(
    async (studentData: Partial<IStudent>): Promise<boolean> => {
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

          showToast('success', 'Success', 'Student updated successfully!', 3000);
        } else {
          // Add new student
          const newStudent = {
            ...studentData,
            id: generateUUID(), // Generate a unique ID
          } as IStudent;

          const createdStudent = await service.create(newStudent);
          setAllStudents((prevStudents) => [...prevStudents, createdStudent]);

          showToast('success', 'Success', 'Student added successfully!', 3000);
        }

        return true;
      } catch (error) {
        console.error('Failed to save student:', error);
        showToast('error', 'Error', 'Failed to save student. Please try again', 3000);
        return false;
      }
    },
    [showToast],
  );

  /**
   * Deletes a student
   */
  const deleteStudent = useCallback(
    async (student: IStudent) => {
      try {
        const service = await getDataService();
        await service.delete(student.id);

        setAllStudents((prevStudents) => prevStudents.filter((s) => s.id !== student.id));

        showToast('info', 'Deleted', 'Student has been deleted', 3000);
        return true;
      } catch (error) {
        console.error('Failed to delete student:', error);
        showToast('error', 'Error', 'Failed to delete student. Please try again.', 3000);
        return false;
      }
    },
    [showToast],
  );

  return {
    allStudents,
    isLoading,
    loadStudents,
    saveStudent,
    deleteStudent,
  };
};
