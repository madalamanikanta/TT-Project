import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Briefcase, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        // Handle both response formats: user contains 'roles' array OR 'role' string
        const roleStr = response.data.user?.role;
        const rolesArr = response.data.user?.roles;
        const role = rolesArr?.[0] || roleStr || '';
        
        if (role !== 'ADMIN' && role !== 'ROLE_ADMIN') {
          setError('You must be an admin to access this area');
          return;
        }

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('role', role);
        navigate('/admin/dashboard');
      } else {
        setError(response.data.error || 'Login failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Unable to login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-3">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-semibold text-gray-900">Admin Login</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
            Sign in as Admin
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Enter your admin credentials to access the dashboard.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Login Failed</p>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
