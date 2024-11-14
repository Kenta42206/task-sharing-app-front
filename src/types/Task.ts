import { User } from "./User";
import { Category } from "./Category";
import { Status } from "./Status";
import { Room } from "./Room";

export interface Task {
  id: number;
  user: User;
  title: string;
  description?: string;
  status: Status;
  category: Category;
  room: Room;
  importance?: number;
  progress: number;
  priority?: number;
  dueDate?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
  importance?: number;
  progress?: number;
  priority?: number;
  dueDate?: string;
  category: Category;
  status: Status;
  room: Room;
}

export interface TaskEdit {
  id: number;
  title: string;
  description?: string;
  importance?: number;
  progress?: number;
  priority?: number;
  dueDate?: string;
  category: Category;
  status: Status;
}
