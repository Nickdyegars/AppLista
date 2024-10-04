export type TaskProps = {
  id: number;
  title: string;
  description: string;
  status: boolean;
  data: Date;
  label: LabelProps;
  onCheck?: () => void;
  onRemove?: () => void;
};

export type LabelProps = {
  id: number;
  title: string;
  color: string;
  onSelect?: () => void;
  onRemove?: () => void;
  onEdit?: () => void;
};

export type RootStackParamList = {
  Home: undefined;
  NewTask: undefined
  EditTask: {
    id:string
  }
  Details: TaskProps;
}

export type taskContent = {
  id: string;
  title: string,
  descricao: string,
  date: Date
  status: boolean
}


import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp} from '@react-navigation/stack';

export type NewTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NewTask'>;
export type EditTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditTask'>;
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type EditTaskScreenRouteProp = RouteProp<RootStackParamList, 'EditTask'>;