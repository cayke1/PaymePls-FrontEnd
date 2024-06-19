export interface Debtor {
    id?: string;
    name: string;
    phone: string;
    email?: string;
    bills?: any;
    userId: string | null;
}