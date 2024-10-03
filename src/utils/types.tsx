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
  Details: TaskProps;
}

export type taskContent = {
  id: string;
  title: String,
  descricao: String,
  date: Date
}