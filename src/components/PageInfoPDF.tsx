import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Bill } from "@/app/@types/bill";
import { Payment } from "@/app/@types/payment";
import { priceFormatter } from "@/app/utils/priceFormatter";
import { dateFormatter } from "@/app/utils/dateFormatter";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#bfb05a",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 12,
    textAlign: "center",
  },
});

interface PageInfoPDFProps {
  bills: Bill[];
  payments: Payment[];
  total: string;
}

const PageInfoPDF = ({ bills, payments, total }: PageInfoPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Gerado em: {dateFormatter(new Date(Date.now()))}</Text>
        <Text>Total devido: {total}</Text>
      </View>
      <View style={styles.section}>
        <Text>Contas:</Text>
        {bills.map((bill, i) => (
          <Text key={i}>
            {bill.description} : {priceFormatter(bill.value)} (
            {bill.active ? "Não pago" : "Pago"})
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text>Pagamentos:</Text>
        {payments.map((payment, i) => (
          <Text key={i}>
            {dateFormatter(payment.created_at)}: {priceFormatter(payment.value)}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default PageInfoPDF;
