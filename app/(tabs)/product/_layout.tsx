import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { TouchableOpacity, Text } from 'react-native';

export default function ProductLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: true,
      // animation: 'fade', 
      contentStyle: { backgroundColor: '#000' }, 
    }}>
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
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#121212" },

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
        // remove border
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#121212" },
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
        // remove border
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#121212" },
      }} />
    </Stack>
  );
}

function CustomBackButton() {
  const { fromSearch } = useLocalSearchParams();
  const router = useRouter();

    const handleBack = () => {
      if (fromSearch === "true") {
        router.replace("/(search)/Search");
      } else {
        router.back();
      }
  };

  return (
    <TouchableOpacity
      onPress={handleBack}
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
