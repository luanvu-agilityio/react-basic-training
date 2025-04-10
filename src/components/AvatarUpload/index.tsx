import { ChangeEvent, useRef } from 'react';
import Button from '@components/common/Button';
import { CAMERA_ICON } from '@constants/avatar';
import './index.css';
import Avatar from '@components/common/Avatar';

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
  previewUrl?: string;
  /** Callback function to store selected file for later upload */
  onFileSelect: (file: File | null) => void;
  /** Error message to display if upload fails */
  error?: string;
}

const AvatarUpload = ({ avatar, onFileSelect, previewUrl, error }: AvatarUploadProps) => {
  // Reference to hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayAvatar = previewUrl ?? avatar ?? CAMERA_ICON;
  const isPlaceholder = !avatar && !previewUrl;

  // Handle image loading error and set fallback to default image
  const handleImageError = () => {};

  /**
   * Triggers the hidden file input click when select button is clicked
   */
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Handles file selection and passes file to parent for later upload
   * @param e - Change event from file input
   */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      onFileSelect(null);
      return;
    }

    // Pass the selected file to parent component without uploading
    onFileSelect(files[0]);

    // Reset file input
    e.target.value = '';
  };

  return (
    <div className="profile-upload">
      {/* Avatar preview container */}
      <div className="profile-placeholder">
        <Avatar
          src={displayAvatar}
          alt={isPlaceholder ? 'camera' : 'avatar'}
          className={isPlaceholder ? '' : 'avatar'}
          onError={handleImageError}
          style={{ width: '65px', height: '65px', backgroundColor: 'transparent' }}
        />
      </div>

      {/* Custom upload button */}
      <Button variant="upload" onClick={handleUploadClick}>
        Select photo
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
