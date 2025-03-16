import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { TouchableOpacity, Text } from 'react-native';

export default function ProductLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Products" options={{ headerShown: false }}/>
      <Stack.Screen 
        name="Product" 
        options={({ navigation }) => ({
          title: "Product Detail",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#fff",
          },
          headerTitleAlign: "center",
          headerTintColor: "#aaa",
          animation: "fade",
          headerShadowVisible: false,

          // custom back btn
          headerLeft: () => <CustomBackButton />,
        })}
      />
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

function CustomBackButton() {
  const router = useRouter();
  const { fromSearch } = useLocalSearchParams();

  return (
    <TouchableOpacity
      onPress={() => {
        if (fromSearch === "true") {
          router.replace("/(search)/Search");
        } else {
          router.back();
        }
      }}
      style={{ marginLeft: 10 }}
    >
      <Text style={{ 
        color: "#aaa", 
        fontSize: 18,
        marginLeft: 10,
      }}>&#x276E;</Text>
    </TouchableOpacity>
  );
}
