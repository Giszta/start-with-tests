export function isValidEmail(email: string): boolean {
  if (!email) return false;

  const normalizedEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(normalizedEmail);
}