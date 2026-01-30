import { Text, View, TouchableOpacity, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter } from "expo-router";

export default function User() {
  const router = useRouter();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/auth");
    } catch (error: any) {
      Alert.alert("Logout Error", error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-slate-900 p-6">
      <View className="items-center mb-10">
        <Text className="text-gray-500 dark:text-white text-sm uppercase tracking-widest">
          Logged in as
        </Text>
        <Text className="text-xl font-bold dark:text-white mt-1">
          {user?.email || "No user found"}
        </Text>
      </View>

      <TouchableOpacity 
        onPress={handleLogout}
        className="bg-red-500 py-4 px-10 rounded-2xl bg-red-600 w-full"
      >
        <Text className="dark:text-white text-center font-bold text-lg">
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}