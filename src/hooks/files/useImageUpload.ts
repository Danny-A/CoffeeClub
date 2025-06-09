import { useState } from 'react';

export function useImageUpload(uploadFn: (file: File) => Promise<string>) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [removed, setRemoved] = useState(false);

  const handleChange = (file: File | null) => {
    setFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
    setRemoved(false);
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    setRemoved(true);
  };

  const upload = async (existingUrl?: string | null) => {
    if (removed) return null; // Explicitly clear the field
    if (file) return uploadFn(file);
    return existingUrl || undefined; // Keep existing if not changed
  };

  return {
    setPreviewUrl,
    previewUrl,
    handleChange,
    handleRemove,
    upload,
    removed,
  };
}
