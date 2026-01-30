import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "expo-router";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleLogin = async () => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        router.replace("/(tabs)/user");
    } catch (error: any) {
        Alert.alert("Login Error", error.message);
    }
    };

    return (
        <View className="flex-1 justify-center p-6 dark:bg-slate-900">
            <Text className="text-3xl font-bold mb-8 text-center dark:text-white">Welcome Back</Text>

            <TextInput
                className="border dark:text-white border-gray-300 p-4 rounded-xl mb-4"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                className="border dark:text-white border-gray-300 p-4 rounded-xl mb-6"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity 
                className="bg-blue-600 p-4 rounded-xl"
                onPress={handleLogin}
            >
                <Text className="text-center font-bold text-lg dark:text-white">Sign In</Text>
            </TouchableOpacity>
        </View>
    );
}