import { useEffect, useState } from 'react';
import { subscribeToApiErrors } from './backend';

// Returns the most recent backend ApiError and a function to clear it.
export function useApiError() {
  const [error, setError] = useState(null);

  useEffect(() => subscribeToApiErrors(setError), []);

  return [error, () => setError(null)];
}
