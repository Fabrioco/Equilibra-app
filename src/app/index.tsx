import { Text, View } from "react-native";
import "@/src/styles/global.css";
import { Redirect, router } from "expo-router";

export default function Index() {
  return <Redirect href={"/auth/register"} />;
}
