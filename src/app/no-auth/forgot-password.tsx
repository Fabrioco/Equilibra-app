import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import Container from "@/src/components/container";
import { API_URL } from "@/src/config/api";

type Step = "REQUEST" | "VERIFY" | "RESET";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("REQUEST");
  const [isLoading, setIsLoading] = useState(false);

  // Estados do formulário
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 1. Solicitar Código
  const handleSendCode = async () => {
    if (!email)
      return Toast.show({ type: "error", text1: "E-mail obrigatório" });

    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/no-auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStep("VERIFY");
        Toast.show({
          type: "success",
          text1: "Enviado!",
          text2: "Verifique seu e-mail.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Usuário não encontrado.",
        });
      }
    } catch (err) {
      Toast.show({ type: "error", text1: "Erro de conexão" });
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Verificar Código
  const handleVerifyCode = async () => {
    if (code.length < 4)
      return Toast.show({ type: "error", text1: "Código inválido" });

    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/no-auth/verify-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token: code }),
      });
      if (res.ok) {
        setStep("RESET");
      } else {
        Toast.show({ type: "error", text1: "Código expirado ou inválido." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Resetar Senha
  const handleResetPassword = async () => {
    if (password !== confirmPassword)
      return Toast.show({ type: "error", text1: "Senhas não coincidem." });

    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/no-auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token: code, // Usamos o código validado como token
          newPassword: password,
          confirmNewPassword: confirmPassword,
        }),
      });
      if (res.ok) {
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Sua senha foi alterada.",
        });
        router.replace("/");
      } else {
        Toast.show({ type: "error", text1: "Erro ao redefinir." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Pressable onPress={Keyboard.dismiss} className="flex-1">
        <View className="flex-1 justify-center px-6 py-10">
          <View className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
            {/* Botão Voltar */}
            <Link href="/" asChild>
              <TouchableOpacity className="flex-row items-center mb-8">
                <Feather name="arrow-left" size={16} color="#9ca3af" />
                <Text className="ml-2 text-gray-400 font-black uppercase text-[10px] tracking-widest">
                  Voltar ao login
                </Text>
              </TouchableOpacity>
            </Link>

            {/* Cabeçalho Dinâmico */}
            <View className="mb-10">
              <Text className="text-3xl font-black text-gray-900 tracking-tighter italic uppercase">
                {step === "REQUEST" && "Recuperar acesso"}
                {step === "VERIFY" && "Verificar e-mail"}
                {step === "RESET" && "Nova senha"}
              </Text>
              <Text className="text-gray-400 font-medium mt-1">
                {step === "REQUEST" &&
                  "Enviaremos um código para o seu e-mail."}
                {step === "VERIFY" && "Insira o código de 6 dígitos enviado."}
                {step === "RESET" && "Crie uma senha forte e segura."}
              </Text>
            </View>

            {/* Formulário Dinâmico */}
            <View className="gap-5">
              {step === "REQUEST" && (
                <InputGroup
                  label="E-mail"
                  icon="mail"
                  value={email}
                  onChange={setEmail}
                  placeholder="seu@email.com"
                  keyboardType="email-address"
                />
              )}

              {step === "VERIFY" && (
                <InputGroup
                  label="Código de Segurança"
                  icon="shield"
                  value={code}
                  onChange={setCode}
                  placeholder="000000"
                  keyboardType="number-pad"
                />
              )}

              {step === "RESET" && (
                <>
                  <InputGroup
                    label="Nova Senha"
                    icon="lock"
                    value={password}
                    onChange={setPassword}
                    placeholder="••••••••"
                    secure={!showPassword}
                    toggleShow={() => setShowPassword(!showPassword)}
                    showState={showPassword}
                  />
                  <InputGroup
                    label="Confirmar"
                    icon="check-circle"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="••••••••"
                    secure={!showPassword}
                  />
                </>
              )}

              <TouchableOpacity
                onPress={
                  step === "REQUEST"
                    ? handleSendCode
                    : step === "VERIFY"
                      ? handleVerifyCode
                      : handleResetPassword
                }
                disabled={isLoading}
                className="bg-black h-16 rounded-2xl items-center justify-center mt-6 shadow-xl shadow-black/20"
              >
                <Text className="text-white font-black uppercase tracking-widest italic">
                  {isLoading ? "Processando..." : "Continuar"}
                </Text>
              </TouchableOpacity>

              {step === "VERIFY" && (
                <TouchableOpacity onPress={() => setStep("REQUEST")}>
                  <Text className="text-center text-gray-400 font-black uppercase text-[10px] tracking-widest mt-4">
                    Reenviar e-mail
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Container>
  );
}

// Subcomponente de Input para organização
function InputGroup({
  label,
  icon,
  value,
  onChange,
  placeholder,
  secure,
  toggleShow,
  showState,
  keyboardType,
}: any) {
  return (
    <View className="space-y-2">
      <Text className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
        {label}
      </Text>
      <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 h-14">
        <Feather name={icon} size={20} color="#9ca3af" />
        <TextInput
          className="flex-1 ml-3 text-gray-900 font-bold"
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          value={value}
          onChangeText={onChange}
          secureTextEntry={secure}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
        {toggleShow && (
          <TouchableOpacity onPress={toggleShow}>
            <Feather
              name={showState ? "eye-off" : "eye"}
              size={20}
              color="#9ca3af"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
