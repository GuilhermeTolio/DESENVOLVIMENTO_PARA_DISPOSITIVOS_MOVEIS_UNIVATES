import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Game Vault' }} />
        <Stack.Screen name="formulario" options={{ title: 'Gestión de Juego' }} />
      </Stack>
    </>
  );
}
