import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteIcon } from "@chakra-ui/icons";
import { addTodo, deleteTodo, toggleTodo } from "./redux/todo/index";
import { useToast } from "@chakra-ui/react";

import {
  Container,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  HStack,
  Box,
  Button,
  Text,
  Switch,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

const App = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const delToast = useToast();
  const addToast = useToast();
  const completeToast = useToast();
  const nicheToast = useToast();


  const validTodo = () => {
    if (title.trim().length === 0 || body.trim().length === 0) {
      nicheToast({
        title: "Fill the form.",
        description: "You have not filled the form fully.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    } else {
      dispatch(
        addTodo({
          id: Date.now(),
          title,
          body,
          completed: false,
        })
      );
      addToast({
        title: "Task added.",
        description: "You have added successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setTitle("");
      setBody("");
    }
  };

  return (
    <Container maxW={1250}>
      <Card my={10}>
        <CardHeader>
          <Heading size="md">Enter New Task</Heading>
        </CardHeader>
        <CardBody>
          <FormControl>
            <Stack spacing={4}>
              <Box>
                <FormLabel htmlFor="title">Enter title: </FormLabel>
                <Input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  id="title"
                  placeholder="Enter title"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="body">Enter description: </FormLabel>
                <Textarea
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value)
                    localStorage.setItem("body", e.target.value)
                  }}
                  id="body"
                  placeholder="Enter description"
                />
              </Box>
              <Button onClick={()=> {
              validTodo()
              
              }} colorScheme="teal">
                Add Task
              </Button>
            </Stack>
          </FormControl>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="md">Client Report</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider borderColor="grey.200" />}>
            {todos.length &&
              todos.map((todo) => (
                <Box key={todo.id} py="2">
                  <HStack justify="space-between" spacing={4}>
                    <Box>
                      <Heading
                        textDecoration={todo.completed ? "line-through" : ""}
                        size="xs"
                        textTransform="uppercase"
                      >
                        {todo.title}
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {todo.body}
                      </Text>
                    </Box>

                    <Box>
                      <Switch
                        onChange={() => {
                          dispatch(toggleTodo(todo.id));
                          completeToast({
                            title: "Task completed.",
                            description: "You have completed this task.",
                            status: "loading",
                            duration: 1000,
                            isClosable: true,
                          });
                        }}
                        isChecked={todo.completed}
                        style={{ marginRight: "10px" }}
                      />
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          dispatch(deleteTodo(todo.id));
                          localStorage.removeItem("title")
                          delToast({
                            title: "Deleted",
                            description: `You have deleted "${todo.title}" todo.`,
                            status: "warning",
                            duration: 9000,
                            isClosable: true,
                          });
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  </HStack>
                </Box>
              ))}
          </Stack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default App;
