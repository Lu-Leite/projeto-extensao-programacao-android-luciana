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

  const headerRight = () => (
    <TouchableOpacity
      onPress={() => router.push("/modal")}
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
                }}
              >
                <View>
                  <Text>{item.name}</Text>
                  <Text>{item.email}</Text>
                  <Text>{item.telefone}</Text>
                  <Text>{item.cnpj}</Text>
                  <Text>{item.datainicio}</Text>
                  <Text>{item.cidade}</Text>
                  <Text>{item.projeto}</Text>
                  
                </View>
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/modal?id=${item.id}`);
                  }}
                  style={{ marginTop: 50, marginRight: 10 }}
                > 
                  <FontAwesome name="edit" size={28} color="red" />
                </TouchableOpacity>
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
