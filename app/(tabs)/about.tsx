import { View, Text, StyleSheet } from "react-native";

export default function TabAbout() {
  return (
    <View style={styles.container}>
      <Text>Este é um trabalho de Extensão da disciplina Programação para Dispositivos Móveis para Android.</Text>
      <Text>Desenvolvedora: Luciana Barbosa Leite</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "beige", // Cor de fundo bege claro
  },
});
