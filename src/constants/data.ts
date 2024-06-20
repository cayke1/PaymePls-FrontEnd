import { NavItem } from '@/components/dashboard-nav';

export type Debtor = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const debtors: Debtor[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
];

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