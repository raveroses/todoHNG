import { RadioInput } from "@/components/RadioInput";
import { Colors } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import DarkImage from "../assets/images/darkimage.jpg";
import LightImage from "../assets/images/lightimage.jpg";

type ThemeMode = keyof typeof Colors;

type Theme = (typeof Colors)[ThemeMode];
type Todo = {
  item: string;
  isCompleted: string;
};
export default function Home() {
  const addTodoMutation = useMutation(api.addTodo.addTodo);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoCompleted, setNewTodoCompleted] = useState(false);

  const { width } = useWindowDimensions();
  const isTablet = width > 800;

  const [theme, setTheme] = useState<Theme>(Colors.dark);
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");

  const handleToggle = (mode: string) => {
    console.log("Im clicked", mode);
    setTheme(Colors[mode as ThemeMode]);
    setThemeMode(mode as ThemeMode);
  };

  console.log("Theme", theme);

  const handleAddTodoList = async () => {
    if (newTodoText.trim()) {
      await addTodoMutation({
        item: newTodoText,
        isCompleted: newTodoCompleted ? "completed" : "",
      });

      // Add to local list
      setTodos((prev) => [
        ...prev,
        {
          item: newTodoText,
          isCompleted: newTodoCompleted ? "completed" : "",
        },
      ]);

      // Reset input
      setNewTodoText("");
      setNewTodoCompleted(false);
    }
  };

  const cancelBtn = () => {};
  return (
    <View
      style={[
        isTablet && styles.Body,
        !isTablet && {
          width: "100%",
        },
      ]}
    >
      <Image
        source={themeMode === "dark" ? DarkImage : LightImage}
        style={[
          isTablet
            ? styles.image
            : {
                width: "100%",
                maxWidth: "100%",
                height: 300,
              },
        ]}
        resizeMode="cover"
      />

      <View
        style={[
          isTablet
            ? styles.content
            : {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
                flexDirection: "column",
                width: "100%",
                flex: 1,
                padding: 10,
              },
        ]}
      >
        <View
          style={[
            isTablet
              ? {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "400px",
                }
              : {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  gap: "0px",
                },
          ]}
        >
          <Text
            style={[
              {
                color: theme.text,
              },
              isTablet
                ? { fontSize: 30, marginBottom: 10, color: "white" }
                : { fontSize: 20, marginBottom: 10, color: "white" },
            ]}
          >
            TODO
          </Text>

          {themeMode === "dark" && (
            <TouchableOpacity onPress={() => handleToggle("light")}>
              <Ionicons name="moon" size={24} color="white" />
            </TouchableOpacity>
          )}

          {themeMode === "light" && (
            <TouchableOpacity onPress={() => handleToggle("dark")}>
              <Ionicons name="sunny" size={24} color="orange" />
            </TouchableOpacity>
          )}
        </View>

        <View
          style={[
            isTablet
              ? {
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: theme.background,
                  padding: 15,
                  borderRadius: 5,
                  gap: 10,
                  alignItems: "center",
                }
              : {
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: theme.background,

                  padding: 15,
                  borderRadius: 5,
                  gap: 50,
                  alignItems: "center",
                },
          ]}
        >
          <RadioInput
            label="completed"
            selected={newTodoCompleted}
            onPress={() => setNewTodoCompleted((prev) => !prev)}
          />
          <TextInput
            placeholder="Create a new todo"
            value={newTodoText}
            onChangeText={setNewTodoText}
            style={[
              {
                color: theme.text,
              },
              isTablet
                ? {
                    width: 540,
                    borderWidth: 0,
                    outline: "none",
                    padding: 15,
                    marginBottom: 10,
                    backgroundColor: theme.background,
                  }
                : {
                    width: "100%",
                    borderWidth: 0,
                    outline: "none",
                  },
            ]}
            returnKeyType="done"
            onSubmitEditing={handleAddTodoList}
          />

          {/* <Button title="Submit" onPress={handleSubmit} /> */}
        </View>
        <TouchableOpacity onPress={handleAddTodoList}>
          <Text>Add To do List</Text>
        </TouchableOpacity>
        <View
          style={[
            isTablet
              ? {
                  backgroundColor: theme.background,

                  marginTop: 20,
                  padding: 10,
                  flex: 1,
                  flexDirection: "column",
                  gap: 20,
                }
              : {
                  backgroundColor: theme.background,

                  marginTop: 20,
                  padding: 20,
                  flex: 1,
                  flexDirection: "column",
                  gap: 50,
                },
          ]}
        >
          {/*  */}
          {todos.map((todo, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <RadioInput
                label=""
                selected={todo.isCompleted === "completed"}
                onPress={() => {
                  setTodos((prev) =>
                    prev.map((t, i) =>
                      i === index
                        ? {
                            ...t,
                            isCompleted:
                              t.isCompleted === "completed" ? "" : "completed",
                          }
                        : t
                    )
                  );
                }}
              />
              <Text
                style={{
                  color: theme.text,
                  flex: 1,
                  textDecorationLine:
                    todo.isCompleted === "completed" ? "line-through" : "none",
                }}
              >
                {todo.item}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setTodos((prev) => prev.filter((_, i) => i !== index))
                }
              >
                <Ionicons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>
          ))}
          <View
            style={[
              {
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                display: "flex",
              },
              isTablet && { display: "none" },
            ]}
          >
            <Text
              style={{
                color: theme.text,
              }}
            >
              5 items Left
            </Text>
            <TouchableOpacity onPress={() => setTodos([])}>
              <Text
                style={{
                  color: theme.text,
                }}
              >
                Clear Completed
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              isTablet
                ? {
                    flex: 1,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    // gap:00
                  }
                : { display: "none" },
            ]}
          >
            <Text
              style={{
                color: theme.text,
              }}
            >
              {todos.length} items Left
            </Text>
            <TouchableOpacity onPress={() => setTodos(todos)}>
              <Text
                style={{
                  color: theme.text,
                }}
              >
                All
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: theme.text,
              }}
            >
              Active
            </Text>
            <TouchableOpacity
              onPress={() => {
                const completedItem = todos.filter(
                  (item) => item.isCompleted === "completed"
                );
                setTodos(completedItem);
              }}
            >
              <Text
                style={{
                  color: theme.text,
                }}
              >
                Completed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTodos([])}>
              <Text
                style={{
                  color: theme.text,
                }}
              >
                Clear Completed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Body: {
    width: "100%",
    flex: 1,
    padding: 0,
    margin: 0,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 500,
  },

  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    flexDirection: "column",
    width: 540,
  },
});
