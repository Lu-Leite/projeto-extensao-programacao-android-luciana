import {
  TouchableOpacity, Linking
} from "react-native";
import { View, Text, StyleSheet } from "react-native";
function linkExternal(){ Linking.openURL('https://github.com/Lu-Leite/projeto-extensao-programacao-android-luciana.git'); }

export default function TabAbout() {
  return (
    <View style={[styles.container, { padding: 20 }]}>
      <Text>Este é um trabalho de Extensão da disciplina Programação para Dispositivos Móveis para Android.</Text>
      <Text style={{ marginTop: 10 }}>Desenvolvedora: Luciana Barbosa Leite</Text>
      <TouchableOpacity onPress={linkExternal} style={styles.container}>
        <Text style={styles.link}>Repositório do Projeto</Text>
        {/* <StatusBar style="auto" /> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "beige", // Cor de fundo bege claro
  },
  link: {
    color: "blue", // azul link
    textDecorationLine: "underline", // Sublinhado link
  },
});
