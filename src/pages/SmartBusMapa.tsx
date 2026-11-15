import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Veiculo {
  codigo: string;
  nome: string;
  categoria: string;
  velocidade: number;
  lat: number;
  lng: number;
  proximaParada: string;
}

export default function SmartBusMapa() {
  const navigate = useNavigate();

  const [horaAtual, setHoraAtual] = useState(new Date());

  const [veiculos, setVeiculos] = useState<Veiculo[]>([
    {
      codigo: "303",
      nome: "Centenário / Campo Comprido",
      categoria: "Expresso",
      velocidade: 28,
      lat: -25.4411,
      lng: -49.2225,
      proximaParada: "Praça Rui Barbosa",
    },
    {
      codigo: "022",
      nome: "Inter 2 - Hauer",
      categoria: "Linha Direta",
      velocidade: 31,
      lat: -25.4358,
      lng: -49.3174,
      proximaParada: "Terminal Hauer",
    },
    {
      codigo: "023",
      nome: "Inter 2 - Capão da Imbuia",
      categoria: "Linha Direta",
      velocidade: 30,
      lat: -25.4071,
      lng: -49.2528,
      proximaParada: "Capão da Imbuia",
    },
  ]);

  const [veiculoSelecionado, setVeiculoSelecionado] =
    useState<Veiculo>(veiculos[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHoraAtual(new Date());

      setVeiculos((atual) =>
        atual.map((v) => ({
          ...v,
          lat: v.lat + (Math.random() - 0.5) * 0.001,
          lng: v.lng + (Math.random() - 0.5) * 0.001,
        }))
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const encontrado = veiculos.find(
      (v) => v.codigo === veiculoSelecionado.codigo
    );

    if (encontrado) {
      setVeiculoSelecionado(encontrado);
    }
  }, [veiculos]);

  const bbox = `${
    veiculoSelecionado.lng - 0.015
  }%2C${veiculoSelecionado.lat - 0.015}%2C${
    veiculoSelecionado.lng + 0.015
  }%2C${veiculoSelecionado.lat + 0.015}`;

  const mapaUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${veiculoSelecionado.lat}%2C${veiculoSelecionado.lng}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b2239",
        padding: "12px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#0D3B4C",
          border: "4px solid #114d66",
          borderRadius: "10px",
          padding: "16px",
          color: "white",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFCC00",
            color: "#000",
            textAlign: "center",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "16px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "1.3rem",
            }}
          >
            📍 SmartBus Tempo Real
          </h1>

          <div
            style={{
              marginTop: "6px",
              fontSize: "0.85rem",
              fontWeight: "bold",
            }}
          >
            {horaAtual.toLocaleTimeString("pt-BR")}
          </div>
        </div>

        <iframe
          title="Mapa SmartBus"
          src={mapaUrl}
          style={{
            width: "100%",
            height: "250px",
            border: "none",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        />

        <h2
          style={{
            color: "#FFCC00",
            fontSize: "1rem",
            marginBottom: "12px",
          }}
        >
          🚌 Veículos em Operação
        </h2>

        {veiculos.map((veiculo) => (
          <div
            key={veiculo.codigo}
            onClick={() => setVeiculoSelecionado(veiculo)}
            style={{
              backgroundColor: "#1C6688",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "10px",
              cursor: "pointer",
              border:
                veiculoSelecionado.codigo === veiculo.codigo
                  ? "2px solid #FFCC00"
                  : "2px solid transparent",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              {veiculo.codigo} - {veiculo.nome}
            </div>

            <div
              style={{
                fontSize: "0.85rem",
                color: "#E2E8F0",
              }}
            >
              Categoria: {veiculo.categoria}
            </div>

            <div
              style={{
                fontSize: "0.85rem",
                color: "#E2E8F0",
              }}
            >
              Velocidade: {veiculo.velocidade} km/h
            </div>

            <div
              style={{
                fontSize: "0.85rem",
                color: "#FFCC00",
                marginTop: "4px",
              }}
            >
              Próxima parada: {veiculo.proximaParada}
            </div>
          </div>
        ))}

        <button
          onClick={() => navigate("/linhas")}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#1C6688",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          🚌 VER LINHAS
        </button>

        <button
          onClick={() => navigate("/home")}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#FFCC00",
            color: "black",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          VOLTAR
        </button>
      </div>
    </div>
  );
}