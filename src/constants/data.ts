import { NavItem } from '@/components/dashboard-nav';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Debtors',
    href: '/dashboard/debtors',
    icon: 'user',
    label: 'user'
  },
  {
    title: 'Bills',
    href: '/dashboard/bills',
    icon: 'billing',
    label: 'billing'
  },
  {
    title: 'Logout',
    href: '/logout',
    icon: 'login',
    label: 'logout'
  }
];