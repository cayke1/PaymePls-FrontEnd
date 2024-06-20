import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function dateFormatter(data: Date) {
    const newDate = format(data, "d/MM/yyyy, HH:mm", {
        locale: ptBR,
    });
    
    return newDate;
}