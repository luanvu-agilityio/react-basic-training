import React, { useRef } from 'react';
import Button from '@components/common/Button';
import './index.css';

/**
 * AvatarUpload Component
 *
 * A component that handles image upload functionality for student avatars.
 *
 * Features:
 * - Custom upload button with hidden file input
 * - Image preview
 * - Default avatar fallback
 * - File type restrictions
 * - Error message display
 */
interface AvatarUploadProps {
  avatar?: string;
  /** Fallback image URL when no avatar is set */
  defaultAvatar: string;
  /** Callback function to handle file upload */
  onUpload: (file: File) => Promise<void>;
  /** Error message to display if upload fails */
  error?: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatar,
  defaultAvatar = 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742868045/camera_zqn9bv.png',
  onUpload,
  error,
}) => {
  // Reference to hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Triggers the hidden file input click when upload button is clicked
   */
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Handles file selection and triggers upload
   * @param e - Change event from file input
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await onUpload(files[0]);
  };

  return (
    <div className="profile-upload">
      {/* Avatar preview container */}
      <div className="profile-placeholder">
        {avatar ? (
          <img loading="lazy" src={avatar} alt="Student avatar" className="student-avatar" />
        ) : (
          <img loading="lazy" src={defaultAvatar} alt="camera" />
        )}
      </div>

      {/* Custom upload button */}
      <Button className="upload-btn" onClick={handleUploadClick}>
        Upload photo
      </Button>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Error message display */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AvatarUpload;
