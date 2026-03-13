import api from './api';
import { User, Internship } from '../app/types';

export interface AdminDashboardData {
  totalUsers: number;
  totalAdmins: number;
  totalStudents: number;
  totalInternships: number;
  recentActivity: Array<{
    action: string;
    user: string;
    time: string;
  }>;
}

export interface SettingsData {
  appName: string;
  version: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  apiRequestsLast24h: number;
}

export const fetchAdminDashboard = async (): Promise<AdminDashboardData> => {
  const response = await api.get('/admin/dashboard');
  return response.data as AdminDashboardData;
};

export const fetchAdminUsers = async (): Promise<User[]> => {
  const response = await api.get('/admin/users');
  return response.data as User[];
};

export const fetchAdminInternships = async (): Promise<Internship[]> => {
  const response = await api.get('/admin/internships');
  return response.data as Internship[];
};

export const fetchAdminSettings = async (): Promise<SettingsData> => {
  const response = await api.get('/admin/settings');
  return response.data as SettingsData;
};
