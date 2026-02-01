"use client";

import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from "react-native";
import { Link } from "expo-router";
import Container from "@/src/components/container";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/src/contexts/auth-context";
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  const { register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validate = () => {
    if (!name || !email || !password) {
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) {
      return Toast.show({
        type: "error",
        text1: "Campos vazios",
        text2: "Preencha todos os dados.",
      });
    }

    if (!isChecked) {
      return Toast.show({
        type: "error",
        text1: "Termos",
        text2: "Aceite os termos para continuar.",
      });
    }

    try {
      await register({ name: name.trimEnd(), email, password });

      // Sucesso!
      Toast.show({
        type: "success",
        text1: "Bem-vindo! 🎉",
        text2: "Sua conta no Equilibra foi criada.",
      });

      // Só limpa o formulário se deu certo
      resetForm();

      // Opcional: Redirecionar para a Home
      // router.replace("/home");
    } catch (err: any) {
      // O erro lançado pelo context cai aqui
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: err.message || "Não foi possível registrar.",
      });
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Container>
      <Pressable onPress={Keyboard.dismiss} className="flex-1">
        <View className="flex-1 flex items-center justify-center px-4 py-8">
          <View className="w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            {/* Header */}
            <View className="flex flex-col gap-2 items-center mb-10">
              <Text className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase">
                Crie sua conta
              </Text>
              <Text className="text-gray-400 font-medium text-center">
                Comece sua jornada conosco hoje mesmo.
              </Text>
            </View>

            {/* Inputs Section */}
            <View className="flex flex-col gap-5">
              {/* Nome */}
              <View className="space-y-2">
                <Text className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                  Nome Completo
                </Text>
                <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 h-14">
                  <Feather name="user" size={20} color="#9ca3af" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 font-bold"
                    placeholder="Seu nome"
                    placeholderTextColor="#9ca3af"
                    autoCapitalize="words"
                    autoCorrect={false}
                    textContentType="name"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Email */}
              <View className="space-y-2">
                <Text className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                  E-mail
                </Text>
                <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 h-14">
                  <Feather name="mail" size={20} color="#9ca3af" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 font-bold"
                    placeholder="exemplo@email.com"
                    placeholderTextColor="#9ca3af"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>

              {/* Senha */}
              <View className="space-y-2">
                <Text className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                  Senha
                </Text>
                <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 h-14">
                  <Feather name="lock" size={20} color="#9ca3af" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900 font-bold"
                    placeholder="••••••••"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="password"
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Feather name="eye-off" size={20} color="#9ca3af" />
                    ) : (
                      <Feather name="eye" size={20} color="#9ca3af" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Checkbox Termos */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsChecked(!isChecked)}
                className="flex-row items-center mt-2 ml-1"
              >
                {isChecked ? (
                  <Feather name="check" size={22} color="#10b981" />
                ) : (
                  <Feather name="square" size={22} color="#d1d5db" />
                )}
                <Text className="ml-3 text-gray-500 font-medium text-sm">
                  Eu aceitos os{" "}
                  <Text className="text-gray-900 font-bold">Termos</Text> e{" "}
                  <Text className="text-gray-900 font-bold">Políticas</Text>
                </Text>
              </TouchableOpacity>

              {/* Botão Registrar */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="bg-black h-16 rounded-2xl items-center justify-center mt-6 shadow-xl shadow-black/20"
                onPress={handleRegister}
              >
                <Text className="text-white font-black uppercase tracking-widest italic">
                  {isLoading ? "Carregando..." : "Registrar"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View className="mt-10 flex-row justify-center items-center">
              <Text className="text-gray-400 font-medium">
                Já tem uma conta?{" "}
              </Text>
              <Link href="/" asChild>
                <TouchableOpacity>
                  <Text className="text-black font-black uppercase text-xs tracking-tighter">
                    Entrar
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </Pressable>
    </Container>
  );
}
