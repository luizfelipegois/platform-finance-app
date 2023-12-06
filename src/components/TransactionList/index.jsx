import React from "react";
import Transactions from "../../components/Transactions";

const TransactionList = ({ transactions }) =>
  transactions.reverse().map(({ id, value, date, status, type }) => (
    <Transactions
      key={id}
      id={id}
      value={value}
      date={date}
      status={status}
      type={type}
    />
  ));

export default TransactionList;
