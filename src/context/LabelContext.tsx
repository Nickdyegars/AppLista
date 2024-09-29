import { createContext, ReactNode, useEffect, useState } from "react";
import { LabelProps } from "../utils/types"; // Certifique-se de que TaskProps está corretamente definido
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface LabelContextProps {
  label: LabelProps;
  labels: LabelProps[];
  selectLabel: (task: LabelProps) => void;
  clearLabel: () => void;
  createLabel: (title: string) => void;
  setLabels: (tasks: LabelProps[]) => void;
}
