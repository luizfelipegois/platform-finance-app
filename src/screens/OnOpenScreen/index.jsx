import React from "react";
import WithdrawalScreen from "../WithdrawalScreen";

const OnOpenScreen = () => (
  <WithdrawalScreen
    statusFilter="pending"
    title="Nenhum resgate encontrado"
    emptyState={{
      iconName: "ios-newspaper-outline",
      title: "Nenhum resgate encontrado",
      description: "Para realizar um novo resgate clique no botão abaixo",
    }}
  />
);

export default OnOpenScreen;
