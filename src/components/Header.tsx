import React from "react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = "🚌 SmartBus",
  subtitle = "Mobilidade Inteligente"
}) => {
  return (
    <div
      style={{
        backgroundColor: "#FFCC00",
        color: "black",
        textAlign: "center",
        padding: "15px",
        borderRadius: "5px",
        marginBottom: "20px"
      }}
    >
      <h1 style={{ margin: "0 0 5px 0", fontSize: "24px" }}>{title}</h1>
      <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "normal" }}>{subtitle}</h2>
    </div>
  );
};
