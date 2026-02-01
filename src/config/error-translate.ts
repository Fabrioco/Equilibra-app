export const ERROR_TRANSLATE: Record<string, string> = {
  "User already exists": "Usuário já cadastrado",
  "User not found": "Usuário não encontrado",
  "Invalid credentials": "Email ou senha inválidos",
  "Too small: expected string to have >=8 characters":
    "Senha deve ter pelo menos 8 caracteres",
};

export function translateError(error: string) {
  return ERROR_TRANSLATE[error] || error;
}