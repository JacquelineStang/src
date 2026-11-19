// Dentro da interface do seu contexto (ex: AuthContextType), adicione:
// resetPassword: (email: string, newPassword: string) => boolean;

const resetPassword = (email: string, newPassword: string): boolean => {
  // ⚠️ CONFIRA AQUI: Use a mesma chave que apareceu no Armazenamento Local do navegador
  const STORAGE_KEY = 'smartbus_users'; 
  
  const storedUsers = localStorage.getItem(STORAGE_KEY);
  if (!storedUsers) return false;

  const users = JSON.parse(storedUsers);
  
  // Procura o usuário pelo e-mail
  const userIndex = users.findIndex(
    (u: any) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
  );

  // Se não encontrar o e-mail cadastrado, retorna falso
  if (userIndex === -1) {
    return false;
  }

  // ⚠️ CONFIRA AQUI: Veja no seu JSON se o campo é 'password' ou 'senha'
  users[userIndex].password = newPassword; 

  // Salva a lista atualizada de volta no localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return true;
};

// Não se esqueça de incluir 'resetPassword' no value={{ ... }} do seu AuthContext.Provider!