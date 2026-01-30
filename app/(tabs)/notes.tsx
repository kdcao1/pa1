import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, Alert, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform} from "react-native";
import { collection, addDoc, onSnapshot, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { database, auth } from "../../firebaseConfig"; 
import { Ionicons } from "@expo/vector-icons";

export default function Notes() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(database, "notes"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(notesData);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const saveNote = async () => {
    if (newNote.trim() === "") return;
    try {
      await addDoc(collection(database, "notes"), {
        text: newNote,
        userId: auth.currentUser?.uid,
        createdAt: serverTimestamp(),
      });
      setNewNote("");
      setModalVisible(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Alert.alert("Database Error", "Check your Firestore rules!");
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-slate-900 p-4">
      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-gray-100 dark:bg-slate-800 p-5 rounded-2xl mb-4 border border-gray-200 dark:border-slate-700">
              <Text className="text-lg dark:text-white">{item.text}</Text>
              <Text className="text-xs text-gray-400 mt-2">
                {item.createdAt?.toDate().toLocaleDateString() || "Saving..."}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-10">No notes yet. Tap + to start!</Text>
          }
        />
      )}

      {/* Floating Plus Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-10 right-8 bg-blue-600 w-16 h-16 rounded-full items-center justify-center shadow-2xl"
      >
        <Ionicons name="add" size={40} color="white" />
      </TouchableOpacity>

      {/* Entry Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/60">
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 justify-end"
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="bg-white dark:bg-slate-800 p-8 rounded-t-[40px] h-2/3 shadow-2xl">
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-2xl font-bold dark:text-white">New Entry</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text className="text-blue-600 font-bold">Cancel</Text>
                    </TouchableOpacity>
                </View>
                
                <TextInput
                    multiline
                    className="flex-1 p-5 bg-gray-50 dark:bg-slate-700 dark:text-white rounded-3xl text-lg"
                    placeholder="What's on your mind?"
                    placeholderTextColor="#94a3b8"
                    value={newNote}
                    onChangeText={setNewNote}
                    autoFocus
                    textAlignVertical="top"
                />

                <TouchableOpacity 
                    onPress={saveNote}
                    className="bg-blue-600 py-5 rounded-2xl mt-6"
                >
                    <Text className="text-white text-center font-bold text-xl">Save Note</Text>
                </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}