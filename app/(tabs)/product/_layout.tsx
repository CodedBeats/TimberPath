import { Stack } from 'expo-router'

export default function ProductsLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Products" options={{ headerShown: false }}/>
      <Stack.Screen name="Product" options={{ 
        title: "Product Detail",
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
        // remove border
        headerShadowVisible: false,
      }} />
    </Stack>
  );
}
