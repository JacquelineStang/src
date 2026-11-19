import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

export default function SmartBusAcesso() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const [modoRecuperacao, setModoRecuperacao] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!email.trim() || !senha.trim()) {
      setErro("Informe seu e-mail e senha para entrar.");
      return;
    }

    const emailFormatado = email.trim().toLowerCase();
    const dadosSalvos = localStorage.getItem("smartbus_usuarios");
    const usuarios: Usuario[] = dadosSalvos ? JSON.parse(dadosSalvos) : [];

    const usuarioEncontrado = usuarios.find(
      (u) => u.email === emailFormatado && u.senha === senha.trim()
    );

    if (!usuarioEncontrado) {
      setErro("E-mail ou senha inválidos. Verifique ou faça seu cadastro.");
      return;
    }

    localStorage.setItem("smartbus_usuario_logado", JSON.stringify(usuarioEncontrado));
    navigate("/home");
  }

  function handleRecuperarSenha(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!email.trim() || !novaSenha.trim() || !confirmarNovaSenha.trim()) {
      setErro("Preencha seu e-mail e a nova senha nos dois campos.");
      return;
    }

    if (novaSenha.trim() !== confirmarNovaSenha.trim()) {
      setErro("As novas senhas não coincidem.");
      return;
    }

    if (novaSenha.trim().length < 4) {
      setErro("A nova senha deve ter pelo menos 4 caracteres.");
      return;
    }

    const emailFormatado = email.trim().toLowerCase();
    const dadosSalvos = localStorage.getItem("smartbus_usuarios");
    const usuarios: Usuario[] = dadosSalvos ? JSON.parse(dadosSalvos) : [];

    const indiceUsuario = usuarios.findIndex((u) => u.email === emailFormatado);

    if (indiceUsuario === -1) {
      setErro("Nenhum cadastro encontrado com este e-mail.");
      return;
    }

    usuarios[indiceUsuario].senha = novaSenha.trim();
    localStorage.setItem("smartbus_usuarios", JSON.stringify(usuarios));

    setSenha("");
    setNovaSenha("");
    setConfirmarNovaSenha("");
    setModoRecuperacao(false);
    setSucesso("Senha redefinida com sucesso! Digite sua nova senha para entrar.");
  }

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "none",
    boxSizing: "border-box" as const,
  };

  const btnPrimarioStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#FFCC00",
    color: "black",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "10px",
  };

  const btnSecundarioStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "transparent",
    color: "#FFCC00",
    border: "1px solid #FFCC00",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b2239",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <form
        onSubmit={modoRecuperacao ? handleRecuperarSenha : handleLogin}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "#0D3B4C",
          border: "4px solid #114d66",
          borderRadius: "10px",
          color: "white",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFCC00",
            color: "black",
            textAlign: "center",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ margin: "0 0 4px 0", fontSize: "1.6rem" }}>🚌 SmartBus</h1>
          <div style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
            Mobilidade Inteligente • Curitiba
          </div>
        </div>

        {erro && (
          <div
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
              fontSize: "0.9rem",
              textAlign: "center",
            }}
          >
            {erro}
          </div>
        )}

        {sucesso && (
          <div
            style={{
              backgroundColor: "#16a34a",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
              fontSize: "0.9rem",
              textAlign: "center",
            }}
          >
            {sucesso}
          </div>
        )}

        {!modoRecuperacao ? (
          <>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={{ ...inputStyle, marginBottom: "8px" }}
            />

            <div style={{ textAlign: "right", marginBottom: "15px" }}>
              <button
                type="button"
                onClick={() => {
                  setModoRecuperacao(true);
                  setErro("");
                  setSucesso("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#FFCC00",
                  fontSize: "0.85rem",
                  textDecoration: "underline",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Esqueci minha senha
              </button>
            </div>

            <button type="submit" style={btnPrimarioStyle}>
              ENTRAR
            </button>

            <button
              type="button"
              onClick={() => navigate("/cadastro")}
              style={btnSecundarioStyle}
            >
              CRIAR CONTA / CADASTRO
            </button>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: "1.1rem", marginTop: 0, marginBottom: "12px", textAlign: "center" }}>
              Redefinir Senha
            </h2>

            <input
              type="email"
              placeholder="Digite seu e-mail cadastrado"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Digite a nova senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Confirme a nova senha"
              value={confirmarNovaSenha}
              onChange={(e) => setConfirmarNovaSenha(e.target.value)}
              style={inputStyle}
            />

            <button type="submit" style={btnPrimarioStyle}>
              SALVAR NOVA SENHA
            </button>

            <button
              type="button"
              onClick={() => {
                setModoRecuperacao(false);
                setErro("");
                setNovaSenha("");
                setConfirmarNovaSenha("");
              }}
              style={btnSecundarioStyle}
            >
              VOLTAR PARA O LOGIN
            </button>
          </>
        )}
      </form>
    </div>
  );
}