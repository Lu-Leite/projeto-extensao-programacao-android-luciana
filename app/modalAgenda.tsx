import { router, Stack, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ItemModal() {
  // gat the id from the url
  const { id } = useLocalSearchParams();

  // local state
  const [data, setData] = useState("");
  const [compromisso, setCompromisso] = useState("");

  // local state for edit mode
  const [editMode, setEditMode] = useState(false);

  // get the database context
  const database = useSQLiteContext();

  React.useEffect(() => {
    if (id) {
      // if id is present, then we are in edit mode
      setEditMode(true);
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    const result = await database.getFirstAsync<{
      id: number;
      data: string;
      compromisso: string;
    }>(`SELECT * FROM agenda WHERE id = ?`, [parseInt(id as string)]);
    setData(result?.data!);
    setCompromisso(result?.compromisso!);
  };

  const handleSave = async () => {
    try {
      const response = await database.runAsync(
        `INSERT INTO agenda (data, compromisso) VALUES (?, ?)`,
        [data, compromisso]
      );
      console.log("Item saved successfully:", response?.changes!);
      router.back();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await database.runAsync(
        `UPDATE agenda SET data = ?, compromisso = ? WHERE id = ?`,
        [data, compromisso, parseInt(id as string)]
      );
      console.log("Item updated successfully:", response?.changes!);
      router.back();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: editMode ? "Editar" : "Novo Compromisso" }} />
      <View
        style={{
          gap: 20,
          marginVertical: 20,
        }}
      >
        <TextInput
          placeholder="Data"
          value={data}
          onChangeText={(text) => setData(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Compromisso"
          value={compromisso}
          onChangeText={(text) => setCompromisso(text)}
          style={styles.textInput}
        />
      </View>
      <View style={{ flex: 1, flexDirection: "row", gap: 20 }}>
        <TouchableOpacity
          onPress={async () => {
            editMode ? handleUpdate() : handleSave();
          }}
          style={[styles.button, { backgroundColor: "green" }]}
        >
          <Text style={styles.buttonText}>{editMode ? "Atualizar" : "Salvar"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.button, { backgroundColor: "orange" }]}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    width: 300,
    borderRadius: 5,
    borderColor: "slategray",
  },
  button: {
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
});
