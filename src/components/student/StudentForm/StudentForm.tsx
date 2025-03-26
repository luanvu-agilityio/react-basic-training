import React, { useState, useEffect, useRef } from 'react';
import { formatDate, formatDateForInput } from '@helpers/date-formatter';
import { Validator } from '@helpers/form-validation';
import { CloudinaryUploadService } from 'services/image-upload';
import { generateEnrollmentNumber } from '@helpers/enrollment-number-generator';
import { IStudent } from 'types/student';
import Button from '@components/common/buttons/Button';
import './StudentForm.css';

interface StudentFormViewProps {
  onSave: (studentData: Partial<IStudent>) => void;
  onCancel: () => void;
  getStudents?: () => Promise<IStudent[]>;
  student?: IStudent;
  isOpen: boolean;
  onClose: () => void;
}

const StudentForm: React.FC<StudentFormViewProps> = ({
  onSave,
  onCancel,
  getStudents,
  student,
  isOpen,
  onClose,
}) => {
  // Component state
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<IStudent>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form for add/edit mode
  useEffect(() => {
    if (isOpen) {
      if (student) {
        setIsEditMode(true);
        setCurrentStudentId(student.id || null);
        setFormData(student);
      } else {
        setIsEditMode(false);
        setCurrentStudentId(null);
        setFormData({});
        getEnrollmentNumber();
      }
      setErrors({});
    }
  }, [isOpen, student]);

  // Generate enrollment number for new students
  const getEnrollmentNumber = async () => {
    if (!getStudents) return;

    try {
      const students = await getStudents();
      const enrollNum = generateEnrollmentNumber(students);
      setFormData((prev) => ({ ...prev, enrollNum }));
    } catch (error) {
      console.error('Failed to generate enrollment number:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Map input IDs to student properties
    const fieldMap: Record<string, keyof IStudent> = {
      name: 'name',
      email: 'email',
      phone: 'phoneNum',
      admission: 'dateAdmission',
    };

    const field = fieldMap[id] || (id as keyof IStudent);

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    validateField(field, value);
  };

  // Handle image upload
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const imageUrl = await CloudinaryUploadService.uploadAvatar(files[0]);
      setFormData((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));
      //clear any previous errors for the avatar field
      setErrors((prev) => {
        const newError = { ...prev };
        delete newError['avatar'];
        return newError;
      });
    } catch (error) {
      console.log('Avatar upload failed', error);
      setErrors((prev) => ({
        ...prev,
        avatar: error instanceof Error ? error.message : 'Failed to upload avatar',
      }));
    }
  };

  // Form validation
  const validateField = async (field: keyof IStudent, value: string) => {
    const partialStudent: Partial<IStudent> = { [field]: value };

    if (isEditMode && currentStudentId) {
      partialStudent.id = currentStudentId;
    }

    // Check for duplicates on email field
    if (field === 'email' && getStudents) {
      const allStudents = await getStudents();
      const { errors: fieldErrors } = Validator.validateForm(partialStudent, allStudents);

      if (fieldErrors[field]) {
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
      }
    } else {
      const { errors: fieldErrors } = Validator.validateForm(partialStudent);

      if (fieldErrors[field]) {
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
      }
    }
  };

  // Form submission
  const handleSubmit = async () => {
    // Validate all required fields before submission
    const allStudents = getStudents ? await getStudents() : [];

    // Create the final student data object for validation
    const studentData: Partial<IStudent> = {
      ...formData,
      avatar:
        formData.avatar ??
        'https://res.cloudinary.com/ds82onf5q/image/upload/v1742547439/opzj4nkixf9ftq6bmeyj.jpg',
    };

    // Format date for submission if it exists
    if (formData.dateAdmission) {
      const date = new Date(formData.dateAdmission);
      studentData.dateAdmission = formatDate(date);
    }

    // Add ID if in edit mode
    if (currentStudentId) {
      studentData.id = currentStudentId;
    }

    // Validate all fields at once
    const { isValid, errors: validationErrors } = Validator.validateForm(studentData, allStudents);

    if (!isValid) {
      //Update error state with all validation errors
      setErrors(validationErrors);
      // Stop submission if validation fails
      return;
    }

    //If validation passed, proceed with the saving
    onSave(studentData);
    onClose();
  };

  // Check if form has any errors
  const hasErrors = Object.keys(errors).length > 0;

  if (!isOpen) return null;
  return (
    <div className="popup-container">
      {/* Header */}
      <div className="popup-header">
        <h2>{isEditMode ? 'Edit Student' : 'Add New Student'}</h2>
        <Button className="close-btn" onClick={onClose}>
          {' '}
          &times;
        </Button>
      </div>
      {/* Body */}
      <div className="popup-body">
        <div className="profile-upload">
          <div className="profile-placeholder">
            {formData.avatar ? (
              <img
                loading="lazy"
                src={formData.avatar}
                alt="Student avatar"
                className="student-avatar"
              />
            ) : (
              <img
                loading="lazy"
                src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868045/camera_zqn9bv.png"
                alt="camera"
              />
            )}
          </div>
          <Button onClick={handleUploadClick}>Upload photo</Button>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/jpeg,image/png,image/gif,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          {errors.avatar && <div className="error-message">{errors.avatar}</div>}
        </div>
        <form id="studentForm">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter student name"
              value={formData.name ?? ''}
              onChange={handleInputChange}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter student email"
              value={formData.email ?? ''}
              onChange={handleInputChange}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter student phone number"
              value={formData.phoneNum ?? ''}
              onChange={handleInputChange}
            />
            {errors.phoneNum && <div className="error-message">{errors.phoneNum}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="enroll">Enroll Number</label>
            <input
              style={{ background: 'var(--light-gray-color)' }}
              type="text"
              id="enroll"
              value={formData.enrollNum ?? ''}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="admission">Date of Admission</label>
            <div
              className="calendar-input"
              style={{ border: errors.dateAdmission ? '1px solid #ef4444' : '1px solid #d1d5db' }}
            >
              <input
                type="date"
                id="admission"
                value={formData.dateAdmission ? formatDateForInput(formData.dateAdmission) : ''}
                onChange={handleInputChange}
              />
              <img
                loading="lazy"
                src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868045/calendar_rnyiqj.png"
                alt="calendar icon"
                className="calendar-icon"
              />
            </div>
            {errors.dateAdmission && <div className="error-message">{errors.dateAdmission}</div>}
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="popup-footer">
        <Button
          className="btn btn-cancel"
          onClick={() => {
            onCancel();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          className="btn btn-add"
          style={{
            backgroundColor: hasErrors ? 'var(--light-gray-color)' : 'var(--orange-color)',
            cursor: hasErrors ? 'not-allowed' : 'pointer',
          }}
          onClick={handleSubmit}
          disabled={hasErrors}
        >
          {isEditMode ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </div>
  );
};
export default StudentForm;
