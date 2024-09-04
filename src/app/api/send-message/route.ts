import { priceFormatter } from "@/app/utils/priceFormatter";
import PageInfoPDF from "@/components/PageInfoPDF";
import ReactPDF from "@react-pdf/renderer";
import { NextRequest } from "next/server";
import { join } from "node:path";

export const dynamic = "force-static";

export async function POST(req: NextRequest) {
  const { debtor, bills, payments } = await req.json();
  const totalDue = bills.reduce((sum: any, bill: any) => sum + (bill.active ? bill.value : 0), 0);
  const totalPaid = payments.reduce((sum: any, payment: any) => sum + payment.value, 0);
  const total = (totalDue - totalPaid)
  const data = {
    bills: JSON.parse(JSON.stringify(bills)),
    payments: JSON.parse(JSON.stringify(payments)),
    total: priceFormatter(total),
  };

  // Generate PDF content

  // Save PDF locally
  const fileName = `invoice_${Date.now()}.pdf`;
  const filePath = join(process.cwd(), "public", "pdfs", fileName);
  ReactPDF.render(
    PageInfoPDF(data) as React.ReactElement,
    filePath
  )
  return Response.json({ sexo: "2" });
}

