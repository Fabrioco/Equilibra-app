import Container from "@/src/components/container";
import { useAuth } from "@/src/contexts/auth-context";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const { isLoading, login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    if (!email || !password) {
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return Toast.show({
        type: "error",
        text1: "Campos vazios",
        text2: "Preencha todos os dados.",
      });
    }

    try {
      await login({ email, password });

      // Sucesso!
      Toast.show({
        type: "success",
        text1: "Bem-vindo! 🎉",
        text2: `Olá, ${user?.name}.`,
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: error.message,
      });
    }
  };

  return (
    <Container>
      <Pressable onPress={Keyboard.dismiss} className="flex-1">
        <View className="flex-1 flex items-center justify-center px-4 py-8">
          <View className="w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            {/* Header */}
            <View className="flex flex-col gap-2 items-center mb-10">
              <Text className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase">
                Seja Bem-vindo
              </Text>
              <Text className="text-gray-400 font-medium text-center">
                Entre com suas credenciais para acessar
              </Text>
            </View>

            {/* Inputs Section */}
            <View className="flex flex-col gap-5">
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

              <View>
                <Link href="/no-auth/forgot-password" asChild>
                  <Text className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                    Esqueceu sua senha?
                  </Text>
                </Link>
              </View>

              {/* Botão Registrar */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="bg-black h-16 rounded-2xl items-center justify-center mt-6 shadow-xl shadow-black/20"
                onPress={handleLogin}
              >
                <Text className="text-white font-black uppercase tracking-widest italic">
                  {isLoading ? "Carregando..." : "Entrar"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View className="mt-10 flex-row justify-center items-center">
              <Text className="text-gray-400 font-medium">
                Não possui uma conta?{" "}
              </Text>
              <Link href="/auth/register" asChild>
                <TouchableOpacity>
                  <Text className="text-black font-black uppercase text-xs tracking-tighter">
                    Cadastre-se
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
