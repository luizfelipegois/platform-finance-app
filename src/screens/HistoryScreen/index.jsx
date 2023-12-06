import React from "react";
import WithdrawalScreen from "../WithdrawalScreen";

const HistoryScreen = () => (
  <WithdrawalScreen
    statusFilter={(status) => status === "concluded" || status === "refused"}
    title="Histórico vazio"
    emptyState={{
      iconName: "ios-newspaper-outline",
      title: "Histórico vazio",
      description: "No momento você não possui histórico de levantamentos",
    }}
  />
);

export default HistoryScreen;
