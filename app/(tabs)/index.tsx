import { router, Stack, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSQLiteContext } from "expo-sqlite";

export default function TabHome() {
  const [data, setData] = React.useState<
    { id: number; name: string; cnpj: string, email: string, telefone: string, cidade: string, datainicio: string, projeto: string }[]
  >([]);
  const database = useSQLiteContext();
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const handleDelete = async (id: number) => {
      try {
        await database.runAsync(
          `DELETE FROM users WHERE id = ?;`,
          [id]
        );
        loadData();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    };

  const headerRight = () => (
    <TouchableOpacity
      onPress={() => router.push("/modalCliente")}
      style={{ marginRight: 20 }}
    >
      <FontAwesome name="plus-circle" size={28} color="blue" />
    </TouchableOpacity>
  );

  const loadData = async () => {
    const result = await database.getAllAsync<{
      id: number;
      name: string;
      cnpj: string;
      email: string;
      telefone: string;
      cidade: string;
      datainicio: string;
      projeto: string;
    }>("SELECT * FROM users");
    setData(result);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerRight }} />
      <View>
        <FlatList
          data={data}
          renderItem={({
            item,
          }: {
            item: { 
              id: number;
              name: string;
              email: string;
              telefone: string;
              cnpj: string;
              datainicio: string;
              cidade: string;
              projeto: string; 
            };
          }) => (
            <View style={{ padding: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderWidth: 1, // Adicionada borda simples
                  borderColor: "green", // Cor da borda
                  borderRadius: 5, // Bordas arredondadas
                  margin: 5, // Margem externa
                  padding: 10, // Margem interna aumentada
                }}
              >
                <View>
                  <Text style={styles.text}>Nome: {item.name}</Text>
                  <Text style={styles.text}>Email: {item.email}</Text>
                  <Text style={styles.text}>Telefone: {item.telefone}</Text>
                  <Text style={styles.text}>CNPJ: {item.cnpj}</Text>
                  <Text style={styles.text}>Data de Início: {item.datainicio}</Text>
                  <Text style={styles.text}>Cidade: {item.cidade}</Text>
                  <Text style={styles.text}>Projeto: {item.projeto}</Text>
                </View>
                <View style={{ alignItems: "center"}}>
                  <TouchableOpacity
                    onPress={() => {
                      router.push(`/modalCliente?id=${item.id}`);
                    }}
                    style={{ marginTop: 30 }}
                  > 
                    <FontAwesome name="edit" size={28} color="gold" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleDelete(item.id);
                    }}
                    style={{ marginTop: 30 }}
                  > 
                    <FontAwesome name="trash" size={28} color="grey" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Cor de fundo preta
  },
  text: {
    color: "white", // Cor do texto branca
  },
  button: {
    height: 30,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "blue",
    alignContent: "flex-end",
  }
});
