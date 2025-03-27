import {
  TouchableOpacity, Linking
} from "react-native";
import { View, Text, StyleSheet } from "react-native";
function linkExternal(){ Linking.openURL('https://github.com/Lu-Leite/projeto-extensao-programacao-android-luciana.git'); }

export default function TabAbout() {
  return (
    <View style={[styles.container, { padding: 20 }]}>
      <Text style={styles.texto}>Este é um trabalho de Extensão da disciplina Programação para Dispositivos Móveis para Android.</Text>
      <Text style={[styles.texto, { marginTop: 20 }]}>Aluna: Luciana Barbosa Leite</Text>
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
    backgroundColor: "black", // Cor de fundo bege claro
  },
  link: {
    color: "yellow", // link amarelo
    textDecorationLine: "underline", // Sublinhado link
  },
  texto: {
    color: "white",
  },
});
