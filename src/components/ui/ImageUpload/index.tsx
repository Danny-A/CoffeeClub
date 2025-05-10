import Image from 'next/image';
import { useRef } from 'react';

import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';

export type ImageUploadProps = {
  onChange: (file: File | null) => void;
  previewUrl: string | null;
  onRemove: () => void;
  accept?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
};

export function ImageUpload({
  onChange,
  previewUrl,
  onRemove,
  accept = 'image/*',
  label = 'Upload image',
  disabled = false,
  error,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const handleRemove = () => {
    onRemove();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex items-center gap-4">
      {previewUrl ? (
        <div className="relative w-24 h-24 rounded-lg overflow-hidden">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover"
            sizes="96px"
            priority={false}
          />
        </div>
      ) : (
        <div className="w-24 h-24 flex items-center justify-center bg-muted rounded-lg text-muted-foreground text-xs">
          No image
        </div>
      )}
      <div className="flex flex-col gap-2 flex-1">
        <FormField
          type="file"
          label={label}
          accept={accept}
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={disabled}
          error={error}
        />
        {previewUrl && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleRemove}
            disabled={disabled}
          >
            Remove image
          </Button>
        )}
      </div>
    </div>
  );
}
