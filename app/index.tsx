import { RadioInput } from "@/components/RadioInput";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
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
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

type ThemeMode = keyof typeof Colors;

type Theme = (typeof Colors)[ThemeMode];
type Todo= {
  item:string,
  isCompleted:string,
 }
export default function Home() {
 const addTodoMutation = useMutation(api.addTodo.addTodo);

 
 const [todo,setTodo]= useState<Todo>({
  item:"",
  isCompleted:""
 })

 console.log(todo)

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
const handleOnChange = (text: string) => {
  setTodo(prev => ({
    ...prev,
    item: text
  }));
};

const handleAddTodoList = async () => {
  if (todo.item.trim()) {
    await addTodoMutation({
      item: todo.item,
      isCompleted: todo.isCompleted
    });
    setTodo({ item: "", isCompleted: "" });
  }
};

























  return (
    <View style={[isTablet && styles.Body, !isTablet && { width: "100%" }]}>
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
                top: 120,
                left: 90,
                flex: 1,
                flexDirection: "column",
                width: 400,
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
            selected={todo.isCompleted === "completed"}
            onPress={() => handleOnChange}
          />
          <TextInput
            placeholder="Create a new todo"
            value={todo.item}
            onChangeText={handleOnChange}
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
            // />
          />

          {/* <Button title="Submit" onPress={handleSubmit} /> */}
        </View>

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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 30,
              borderBottomWidth: 1,
            }}
          >
            <RadioInput
              label="Option 1"
              selected={selected === "option1"}
              onPress={() => setSelected("option1")}
            />

            <Text
              style={{
                color: theme.text,
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
            </Text>
            <View>
              <Ionicons name="close" size={24} style={{ color: theme.text }} />
            </View>
          </View>
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
            <Text
              style={{
                color: theme.text,
              }}
            >
              Clear Completed
            </Text>
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
              5 items Left
            </Text>
            <Text
              style={{
                color: theme.text,
              }}
            >
              All
            </Text>
            <Text
              style={{
                color: theme.text,
              }}
            >
              Active
            </Text>
            <Text
              style={{
                color: theme.text,
              }}
            >
              Completed
            </Text>
            <Text
              style={{
                color: theme.text,
              }}
            >
              Clear Completed
            </Text>
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
  },
  image: {
    width: "100%",
    height: 500,
  },

  content: {
    position: "absolute",
    top: 200,
    left: "35%",
    flex: 1,
    flexDirection: "column",
    width: 540,
  },
});
