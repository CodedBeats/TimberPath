import { Stack } from 'expo-router';

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
