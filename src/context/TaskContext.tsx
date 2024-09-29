import { createContext, ReactNode, useEffect, useState } from "react";
import { TaskProps } from "../utils/types"; // Certifique-se de que TaskProps está corretamente definido
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TaskContextProps {
  task: TaskProps;
  tasks: TaskProps[];
  selectTask: (task: TaskProps) => void;
  clearTask: () => void;
  createTask: (title: string) => void;
  setTasks: (tasks: TaskProps[]) => void;
}

interface TaskProviderProps {
  children: ReactNode;
}

// Criando o contexto com valores padrão
export const TaskContext = createContext<TaskContextProps>({
  task: { 
    id: 0, 
    title: '', 
    description: '', 
    status: false, 
    data: new Date(), 
    label: { id: 0, title: '', color: '' }  // Corrigido para usar a estrutura de LabelProps
  },
  tasks: [],
  selectTask: () => {},
  clearTask: () => {},
  createTask: () => {},
  setTasks: () => {},
});

function TaskProvider({ children }: TaskProviderProps) {
  const [task, setTask] = useState<TaskProps>({
    id: 0,
    title: '',
    description: '',
    status: false,
    data: new Date(),
    label: { id: 0, title: '', color: '' }  // Corrigido para usar um objeto LabelProps válido
  });
  const [tasks, setTasks] = useState<TaskProps[]>([] as TaskProps[]);

  async function storeTasks(tasks: TaskProps[]) {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    } catch (error) {
      console.log(error);
    }
  }

  async function loadTasks() {
    try {
      const tasks = await AsyncStorage.getItem('@tasks');
      if (tasks) {
        setTasks(JSON.parse(tasks));
      }
    } catch (error) {
      console.log(error);
    }
  }

  function createTask(title: string) {
    const newTask = { 
      id: tasks.length + 1, 
      title, 
      status: false,
      description: '',
      data: new Date(),
      label: { id: 0, title: '', color: '' }  // Novo objeto LabelProps para a nova task
    };
    setTasks([...tasks, newTask]);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    storeTasks(tasks);
  }, [tasks]);

  function selectTask(task: TaskProps) {
    setTask(task);
  }

  function clearTask() {
    setTask({ id: 0, title: '', description: '', status: false, data: new Date(), label: { id: 0, title: '', color: '' } });
  }

  return (
    <TaskContext.Provider value={{ task, selectTask, clearTask, tasks, createTask, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
