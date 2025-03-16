import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import { TouchableOpacity, Text } from 'react-native';

export default function EducationLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Education" options={{ headerShown: false }} />
      
      <Stack.Screen 
        name="AddArticle" 
        options={{
          title: 'Add Article',
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
          headerTitleAlign: 'center',
          headerTintColor: '#aaa',
          animation: 'fade',
          headerShadowVisible: false,
        }} 
      />
      <Stack.Screen 
        name="AddCategory" 
        options={{
          title: 'Add Category',
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
          headerTitleAlign: 'center',
          headerTintColor: '#aaa',
          animation: 'fade',
          headerShadowVisible: false,
        }} 
      />
      <Stack.Screen 
        name="ArticleDetail" 
        options={{
          title: 'Article Detail',
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
          headerTitleAlign: 'center',
          headerTintColor: '#aaa',
          animation: 'fade',
          headerShadowVisible: false,

          // custom back btn
          headerLeft: () => <CustomBackButton />,
        }} 
      />
      <Stack.Screen 
        name="ArticlesByCategory" 
        options={{
          title: 'Articles by Category',
          headerTitleStyle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
          headerTitleAlign: 'center',
          headerTintColor: '#aaa',
          animation: 'fade',
          headerShadowVisible: false,
        }} 
      />
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
