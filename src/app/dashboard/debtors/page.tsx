"use client"
import { Debtor } from "@/app/@types/debtor";
import { useApi } from "@/app/hooks/useApi";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function Debtors() {
    const [loading, setLoading] = useState(true);
    const [debtors, setDebtors] = useState([] as Debtor[]);
    const api = useApi();
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const debtors = await api.findDebtorFromUser();
            setDebtors(debtors);
        };
        if (loading) fetchData();
        setLoading(false);
    })
    
    return (
        <ScrollArea className="px-4 py-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount in bills</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        debtors.map(debtor => (
                            <TableRow key={debtor.id}>
                                <TableCell>{debtor.name}</TableCell>
                                <TableCell>{debtor.phone}</TableCell>
                                <TableCell>{debtor.email}</TableCell>
                                <TableCell className="flex justify-start gap-4 p-1">
                                    <Button className="p-1 bg-transparent text-purple-700">
                                        <Eye />
                                    </Button>
                                    <Button className="p-1 bg-transparent text-purple-700">
                                        <Trash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </ScrollArea>
    )
}