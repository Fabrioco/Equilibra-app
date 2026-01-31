import React from "react";
import { ScrollView, View } from "react-native";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View className="flex-1 bg-neutral-50">{children}</View>
    </ScrollView>
  );
}
