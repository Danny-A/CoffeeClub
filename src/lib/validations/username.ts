import { z } from "zod";

// Reserved usernames that cannot be used
export const RESERVED_USERNAMES = [
  "admin",
  "root",
  "system",
  "moderator",
  "mod",
  "support",
  "help",
] as const;

// Username validation schema
export const usernameSchema = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(30, "Username must be at most 30 characters")
  .toLowerCase() // Convert to lowercase before validation
  .refine(
    (username) => /^[a-z][a-z0-9_-]*[a-z0-9]$/.test(username),
    "Username must start with a letter and can only contain lowercase letters, numbers, underscores, and hyphens",
  )
  .refine(
    (username) => !/--/.test(username),
    "Username cannot contain consecutive hyphens",
  )
  .refine(
    (username) => !/__/.test(username),
    "Username cannot contain consecutive underscores",
  )
  .refine(
    (username) => /[a-z]/.test(username),
    "Username must contain at least one letter",
  )
  .refine(
    (username) =>
      !RESERVED_USERNAMES.includes(
        username as typeof RESERVED_USERNAMES[number],
      ),
    "This username is reserved and cannot be used",
  );

export type Username = z.infer<typeof usernameSchema>;

// Helper function to validate username
export function isValidUsername(username: string): boolean {
  const result = usernameSchema.safeParse(username);
  return result.success;
}

// Helper function to get validation error message
export function getUsernameError(username: string): string | null {
  const result = usernameSchema.safeParse(username);
  if (!result.success) {
    return result.error.errors[0].message;
  }
  return null;
}

// Helper function to format username (lowercase and trim)
export function formatUsername(username: string): string {
  return username.toLowerCase().trim();
}

// Helper function to check if username matches our pattern
export function matchesUsernamePattern(username: string): boolean {
  return (
    // Basic pattern check
    /^[a-z][a-z0-9_-]{0,28}[a-z0-9]$/.test(username) &&
    // No consecutive special characters
    !/--/.test(username) &&
    !/__/.test(username) &&
    // Must contain at least one letter
    /[a-z]/.test(username) &&
    // Not a reserved username
    !RESERVED_USERNAMES.includes(username as typeof RESERVED_USERNAMES[number])
  );
}
