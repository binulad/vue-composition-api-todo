import { Http } from "@/services/http-client";
import { TodoConstants } from "@/todo/constants";

const BASE_URL = "http://localhost:3000";

class TodoService {
  /* 
    Get all Todo List
  */
  getTodoList() {
    return Http.get(`${BASE_URL}/${TodoConstants.API_URL.TODO}`);
  }
}

export const TodoServices = new TodoService();