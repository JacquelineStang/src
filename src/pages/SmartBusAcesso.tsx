import { useNavigate } from "react-router-dom";
import { useState } from "react";
 
interface Usuario {
nome: string;
email: string;
senha: string;
}
 
export default function SmartBusCadastro() {
const navigate = useNavigate();
 
const [nome, setNome] = useState("");
const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");
const [erro, setErro] = useState("");
 
function handleSalvarCadastro(e: React.FormEvent) {
e.preventDefault();
setErro("");
 
if (!nome.trim() || !email.trim() || !senha.trim()) {
setErro("Preencha todos os campos para continuar.");
return;
}
 
const emailFormatado = email.trim().toLowerCase();
const dadosSalvos = localStorage.getItem("smartbus_usuarios");
const usuarios: Usuario[] = dadosSalvos ? JSON.parse(dadosSalvos) : [];
 
const jaExiste = usuarios.some((u) => u.email === emailFormatado);
if (jaExiste) {
setErro("Este e-mail já está cadastrado. Faça login.");
return;
}
 
usuarios.push({
nome: nome.trim(),
email: emailFormatado,
senha: senha.trim(),
});
 
localStorage.setItem("smartbus_usuarios", JSON.stringify(usuarios));
alert("Cadastro realizado com sucesso! Agora faça seu login.");
navigate("/");
}
 
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
onSubmit={handleSalvarCadastro}
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
<h1 style={{ margin: 0, fontSize: "1.5rem" }}>Cadastro SmartBus</h1>
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
 
<input
type="text"
placeholder="Nome Completo"
value={nome}
onChange={(e) => setNome(e.target.value)}
style={{
width: "100%",
padding: "12px",
marginBottom: "15px",
borderRadius: "5px",
border: "none",
boxSizing: "border-box",
}}
/>
 
<input
type="email"
placeholder="Digite seu e-mail"
value={email}
onChange={(e) => setEmail(e.target.value)}
style={{
width: "100%",
padding: "12px",
marginBottom: "15px",
borderRadius: "5px",
border: "none",
boxSizing: "border-box",
}}
/>
 
<input
type="password"
placeholder="Crie uma senha"
value={senha}
onChange={(e) => setSenha(e.target.value)}
style={{
width: "100%",
padding: "12px",
marginBottom: "15px",
borderRadius: "5px",
border: "none",
boxSizing: "border-box",
}}
/>
 
<button
type="submit"
style={{
width: "100%",
padding: "12px",
backgroundColor: "#FFCC00",
color: "black",
border: "none",
borderRadius: "5px",
fontWeight: "bold",
cursor: "pointer",
marginBottom: "10px",
}}
>
SALVAR CADASTRO
</button>
 
<button
type="button"
onClick={() => navigate("/")}
style={{
width: "100%",
padding: "10px",
backgroundColor: "transparent",
color: "#FFCC00",
border: "1px solid #FFCC00",
borderRadius: "5px",
fontWeight: "bold",
cursor: "pointer",
}}
>
VOLTAR PARA O LOGIN
</button>
</form>
</div>
);
}