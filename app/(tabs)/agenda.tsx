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
    { id: number; data: string; compromisso: string }[]
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
          `DELETE FROM agenda WHERE id = ?;`,
          [id]
        );
        loadData();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    };

  const headerRight = () => (
    <TouchableOpacity
      onPress={() => router.push("/modalAgenda")}
      style={{ marginRight: 20 }}
    >
      <FontAwesome name="plus-circle" size={28} color="blue" />
    </TouchableOpacity>
  );

  const loadData = async () => {
    const result = await database.getAllAsync<{
      id: number;
      data: string;
      compromisso: string;
    }>("SELECT * FROM agenda");
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
              data: string;
              compromisso: string; 
            };
          }) => (
            <View style={{ padding: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderWidth: 1, // Adicionada borda simples
                  borderColor: "black", // Cor da borda
                  borderRadius: 5, // Bordas arredondadas
                  margin: 5, // Margem externa
                  padding: 10, // Margem interna aumentada
                }}
              >
                <View>
                  <Text>Data: {item.data}</Text>
                  <Text>Compromisso: {item.compromisso}</Text>
                </View>
                <View style={{ alignItems: "center"}}>
                  <TouchableOpacity
                    onPress={() => {
                      router.push(`/modalAgenda?id=${item.id}`);
                    }}
                    style={{ marginTop: 30 }}
                  > 
                    <FontAwesome name="edit" size={28} color="red" />
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
    backgroundColor: "beige", // Cor de fundo bege claro
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
