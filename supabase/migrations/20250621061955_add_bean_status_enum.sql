-- Add bean_status enum
CREATE TYPE bean_status AS ENUM ('pending_review', 'approved', 'rejected', 'published');

-- Add status column to beans table
ALTER TABLE beans ADD COLUMN status bean_status NOT NULL DEFAULT 'pending_review';

-- Update existing beans: published -> published, not published -> approved
UPDATE beans SET status = 'published' WHERE is_published = true;
UPDATE beans SET status = 'approved' WHERE is_published = false; 