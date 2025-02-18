import { Stack } from 'expo-router'

export default function ScanLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#32003F",
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
          color: "#fff",
        },
        headerTitleAlign: "center",
        // colour for btn and icons
        headerTintColor: "#aaa",
        // dumb fancy stuff for fun
        animation: "fade",
        title: "Scan Wood",
        // remove border
        headerShadowVisible: false,
      }}
    />
  )
}
