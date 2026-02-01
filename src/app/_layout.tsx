import { Slot } from "expo-router";
import "../styles/global.css";
import { AuthProvider } from "../contexts/auth-context";
import Toast from "react-native-toast-message";
import { toastConfig } from "../styles/toast-config";

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <Slot />
      </AuthProvider>
      <Toast
        autoHide={true}
        position="top"
        topOffset={60}
        visibilityTime={3000}
        config={toastConfig}
      />
    </>
  );
}
