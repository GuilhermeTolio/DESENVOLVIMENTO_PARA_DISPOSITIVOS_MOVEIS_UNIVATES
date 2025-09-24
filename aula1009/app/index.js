import { useState } from "react";
import { View, Text, Button } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Index</Text>
      <Button title="Clique para ver um gatinho" onPress={() => {}} />
    </SafeAreaView>
  );
}