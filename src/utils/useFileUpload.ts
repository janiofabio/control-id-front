import { useState } from 'react';
import { uploadFileToStrapi } from '../utils/api';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    try {
      const result = await uploadFileToStrapi(file);
      setIsUploading(false);
      return result;
    } catch (error) {
      setIsUploading(false);
      throw error;
    }
  };

  return { uploadFile, isUploading };
};