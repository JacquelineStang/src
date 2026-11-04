import { useNavigate } from "react-router-dom";

export default function SmartBusFavoritos() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#0D3B4C",
        color: "white",
        borderRadius: "10px"
      }}
    >
      <h1>⭐ Favoritos</h1>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      >
        🚌 203 Santa Cândida
      </div>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      >
        🚌 505 Boqueirão
      </div>

      <div
        style={{
          backgroundColor: "#1C6688",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      >
        🚌 666 Interbairros
      </div>

      <button
        onClick={() => navigate("/home")}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "12px",
          backgroundColor: "#FFCC00",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        VOLTAR
      </button>
    </div>
  );
}