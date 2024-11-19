import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string, resolving conflicts and ensuring
 * uniqueness. Utilizes `clsx` for conditional class name manipulation and `twMerge` for
 * merging Tailwind CSS classes efficiently.
 *
 * @param inputs - An array of class values that can be strings or objects where keys are
 * class names and values are boolean indicating whether the class should be included.
 * @returns A single string containing all combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
