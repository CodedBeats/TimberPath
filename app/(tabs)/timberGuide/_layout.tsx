import { Stack } from 'expo-router'

export default function TimberGuideLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="TimberGuide" options={{ headerShown: false }}/>
      <Stack.Screen name="GuidesSuggestedWoods" options={{ 
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
        title: "Timber Guide",
        // remove border
        headerShadowVisible: false,
      }} />
    </Stack>
  );
}
