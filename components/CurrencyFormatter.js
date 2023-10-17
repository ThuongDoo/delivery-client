import { formatCurrency } from "react-native-format-currency";

const CurrencyFormatter = ({ amount }) => {
  const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] =
    formatCurrency({ amount, code: "VND" });
  return valueFormattedWithSymbol;
};

export default CurrencyFormatter;
