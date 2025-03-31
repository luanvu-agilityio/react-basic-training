import StudentsPage from '@pages/StudentPage';
import { ComponentType } from 'react';

/**
 * Route Configuration
 *
 * Defines all available routes and their associated components in the application.
 *
 * ROUTES: Object containing path constants for all routes
 * RouteConfig: Interface defining the structure of route configuration
 * NavItem: Union type for navigation item types
 * PAGE_CONFIG: Array of route configurations used to dynamically generate routes
 */
export const ROUTES = {
  LOGIN: '/login',
  HOME: '/home',
  STUDENTS: '/students',
  COURSES: '/courses',
  PAYMENT: '/payment',
  REPORT: '/report',
  SETTINGS: '/setting',
  DEFAULT: '/students',
};

export interface RouteConfig {
  path: string;
  name: string;
  component: ComponentType | null;
  navItem: NavItem;
}

export type NavItem = 'home' | 'students' | 'courses' | 'payments' | 'reports' | 'settings';

export const PAGE_CONFIG: RouteConfig[] = [
  { path: ROUTES.DEFAULT, name: 'Students', component: StudentsPage, navItem: 'students' },
  { path: ROUTES.HOME, name: 'Home', component: null, navItem: 'home' },
  { path: ROUTES.COURSES, name: 'Course', component: null, navItem: 'courses' },
  { path: ROUTES.PAYMENT, name: 'Payment', component: null, navItem: 'payments' },
  { path: ROUTES.REPORT, name: 'Report', component: null, navItem: 'reports' },
  { path: ROUTES.SETTINGS, name: 'Settings', component: null, navItem: 'settings' },
  { path: ROUTES.STUDENTS, name: 'Students', component: StudentsPage, navItem: 'students' },
];
