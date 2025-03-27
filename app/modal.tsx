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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [datainicio, setDatainicio] = useState("");
  const [cidade, setCidade] = useState("");
  const [projeto, setProjeto] = useState("");

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
      name: string;
      cnpj: string;
      email: string;
      telefone: string;
      cidade: string;
      datainicio: string;
      projeto: string;
    }>(`SELECT * FROM users WHERE id = ?`, [parseInt(id as string)]);
    setName(result?.name!);
    setCnpj(result?.cnpj!);
    setEmail(result?.email!);
    setTelefone(result?.telefone!);
    setCidade(result?.cidade!);
    setDatainicio(result?.datainicio!);
    setProjeto(result?.projeto!);
  };

  const handleSave = async () => {
    try {
      const response = await database.runAsync(
        `INSERT INTO users (name, cnpj, email, telefone, cidade, datainicio, projeto) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, cnpj, email, telefone, cidade, datainicio, projeto]
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
        `UPDATE users SET name = ?, cnpj = ?, email = ?, telefone = ?, cidade = ?, datainicio = ?, projeto = ? WHERE id = ?`,
        [name, cnpj, email, telefone, cidade, datainicio, projeto, parseInt(id as string)]
      );
      console.log("Item updated successfully:", response?.changes!);
      router.back();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Item Modal" }} />
      <View
        style={{
          gap: 20,
          marginVertical: 20,
        }}
      >
        <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="CNPJ"
          value={cnpj}
          onChangeText={(text) => setCnpj(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Telefone"
          value={telefone}
          keyboardType="number-pad"
          onChangeText={(text) => setTelefone(text)}
          style={styles.textInput}
        />
        <TextInput
            placeholder="Cidade"
            value={cidade}
            onChangeText={(text) => setCidade(text)}
            style={styles.textInput}
        />
        <TextInput
          placeholder="Data Inicio"
          value={datainicio}
          onChangeText={(text) => setDatainicio(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Projeto"
          value={projeto}
          onChangeText={(text) => setProjeto(text)}
          style={styles.textInput}
        />
      </View>
      <View style={{ flex: 1, flexDirection: "row", gap: 20 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.button, { backgroundColor: "red" }]}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            editMode ? handleUpdate() : handleSave();
          }}
          style={[styles.button, { backgroundColor: "blue" }]}
        >
          <Text style={styles.buttonText}>{editMode ? "Atualizar" : "Salvar"}</Text>
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
