import { Http } from "@/services/http-client";
import { TodoConstants } from "@/todo/constants";
import { AddTodoItem } from "../model/todo.model";

const BASE_URL = "http://localhost:3000";

class TodoService {
  /* 
    Get all Todo List
  */
  async getTodoList() {
    return Http.get(`${BASE_URL}/${TodoConstants.API_URL.TODO}`);
  }

  /**
   * Delete item from Todo list
   * @param id: Id of the Todo Item
  */ 
  deleteTodoItem(id: number) {
    return Http.delete(`${BASE_URL}/${TodoConstants.API_URL.TODO}/${id}`);
  }

  /**
   * Add item in Todo list
   * @param data: data of the Todo Item
  */ 
  addTodoItem(data: AddTodoItem) {
    return Http.post(`${BASE_URL}/${TodoConstants.API_URL.TODO}`, data);
  }
}

export const TodoServices = new TodoService();