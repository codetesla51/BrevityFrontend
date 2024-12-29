export function checkAuthentication(redirectTo: string = '/auth'): boolean {
  const authToken = localStorage.getItem('auth_token') || '';

  if (!authToken) {
    window.location.href = redirectTo;
    return false;
  }

  return true;
}