import { ChangeEvent, useRef } from "react";

interface ValueInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChangeFunction: (value: string) => void;
}

export function ValueInput(props: ValueInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const formatCurrency = (
    value: string,
    isSelected: boolean = false
  ): string => {
    value = value.replace(/\D/g, "");

    const numberValue = isSelected ? parseInt(value) : parseInt(value) / 100;

    return numberValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let numericValue = value.replace(/[^\d,]/g, "");

    value = formatCurrency(numericValue || "0");

    e.target.value = value;
    handleGetCurrentAmount();
  };

  const handleGetCurrentAmount = () => {
    if (inputRef.current) {
      const value = inputRef.current.value;
      const numericValue = value.replace(/[^\d,]/g, "");
      return parseFloat(numericValue.replace(",", "."));
    }
  };
  return (
    <input
      onInput={handleInput}
      ref={inputRef}
      {...props}
      onChange={(e) => props.onChangeFunction(e.target.value)}
      placeholder="Value in R$"
      type="text"
      className="
      flex h-10 rounded-md border-0 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 outline-0 ring-0 focus:ring-0 focus:border-0 focus:outline-0"
    />
  );
}
