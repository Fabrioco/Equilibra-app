import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <ScrollView contentContainerStyle={{ flex: 1 }}>{children}</ScrollView>
    </SafeAreaView>
  );
}
