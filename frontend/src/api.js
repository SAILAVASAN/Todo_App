const API_BASE = "http://localhost:5000/api/todos";


export const fetchTodos = async () => {
  try {
    const res = await fetch(`${API_BASE}/getTodo`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch todos failed:", err);
    return { success: false, data: [], message: "Server error" };
  }
};


export const createTodo = async (text) => {
  try {
    const res = await fetch(`${API_BASE}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Create todo failed:", err);
    return { success: false, data: null, message: "Server error" };
  }
};

export const toggleTodo = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/update?id=${id}`, { method: "PUT" });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Toggle todo failed:", err);
    return { success: false, data: null, message: "Server error" };
  }
};


export const deleteTodo = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/delete?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Delete todo failed:", err);
    return { success: false, message: "Server error" };
  }
};
