export interface Bill {
    id?: string;
    description: string;
    value: number;
    created_at: Date;
    next_charge: Date;
    payd_at?: Date | null;
    active: boolean;
    debtorId?: string | null;
}