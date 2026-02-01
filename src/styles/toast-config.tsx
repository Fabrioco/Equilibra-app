// src/styles/toast-config.tsx
import { View, Text } from "react-native";
import { ToastConfig } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
  // Personalizando o Toast de Sucesso
  success: (props) => (
    <View className="w-[90%] bg-emerald-500 p-4 rounded-2xl border-l-8 border-emerald-700 shadow-lg flex-row items-center">
      <View className="flex-1">
        <Text className="text-white font-black uppercase text-xs tracking-widest italic">
          {props.text1}
        </Text>
        <Text className="text-emerald-50 font-medium text-sm">
          {props.text2}
        </Text>
      </View>
    </View>
  ),

  // Personalizando o Toast de Erro (Estilo Equilibra)
  error: (props) => (
    <View className="w-[90%] bg-white p-5 rounded-3xl border border-gray-100 shadow-2xl flex-row items-center">
      <View className="bg-red-100 p-2 rounded-xl mr-4">
        {/* Você pode colocar um ícone Feather aqui se quiser */}
        <View className="w-2 h-2 bg-red-500 rounded-full" />
      </View>
      <View className="flex-1">
        <Text className="text-gray-900 font-black uppercase text-xs tracking-tighter italic">
          {props.text1}
        </Text>
        <Text className="text-gray-500 font-medium text-[13px]">
          {props.text2}
        </Text>
      </View>
    </View>
  ),
};
