import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";

const createDbIfNeeded = async (db: SQLiteDatabase) => {
  //
  console.log("Creating database");
  try {
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, cnpj TEXT, email TEXT, telefone TEXT, cidade TEXT, datainicio TEXT, projeto TEXT)"
    );

    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS agenda (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT, compromisso TEXT)"
    );
  } catch (error) {
    console.error("Error creating database:", error);
  }
};

export default function RootLayout() {
  return (
    <>
      <SQLiteProvider databaseName="test.db" onInit={createDbIfNeeded}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
            }}
          />
          {/* <Stack.Screen
            name="modalAgenda"
            options={{
              presentation: "modal",
            }}
          /> */}
        </Stack>
      </SQLiteProvider>
      <StatusBar style="auto" />
    </>
  );
}
