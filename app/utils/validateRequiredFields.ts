export function validateRequiredFields(
  values: Record<string, string>
): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.entries(values).forEach(([field, value]) => {
    if (!value.trim()) {
      errors[field] = 'To pole jest wymagane';
    }
  });

  return errors;
}