import React from "react";

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "action";
}

export const NavButton: React.FC<NavButtonProps> = ({
  children,
  variant = "primary",
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: variant === "action" ? "bold" : "normal",
    marginBottom: "10px",
    backgroundColor:
      variant === "action"
        ? "#FFCC00"
        : variant === "secondary"
        ? "#0D3B4C"
        : "#1C6688",
    color: variant === "action" ? "#000" : "#FFF",
    ...style
  };

  return (
    <button style={baseStyle} {...props}>
      {children}
    </button>
  );
};
