import { Stack } from 'expo-router'

export default function ProductLayout() {
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
      <Stack.Screen name="Cart" options={{ 
        title: "Shopping Cart",
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
      <Stack.Screen name="Checkout" options={{ 
        title: "Checkout",
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
