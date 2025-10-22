import { useEffect } from 'react';
import { useLocation, useSearch } from 'wouter';

export default function AuthCallbackPage() {
  const [, setLocation] = useLocation();
  const search = useSearch();

  useEffect(() => {
    // Parse URL parameters
    const params = new URLSearchParams(search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    const error = params.get('error');

    if (error) {
      // Redirect to login with error
      setLocation(`/login?error=${error}`);
      return;
    }

    if (accessToken && refreshToken) {
      // Store tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Fetch user info
      fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          // Redirect to dashboard
          setLocation('/dashboard');
        })
        .catch(() => {
          setLocation('/login?error=auth_failed');
        });
    } else {
      setLocation('/login?error=missing_tokens');
    }
  }, [search, setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Autenticando...</p>
      </div>
    </div>
  );
}

