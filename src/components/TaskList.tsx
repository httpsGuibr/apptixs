import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import { Task } from "../types";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];
      setTasks(tasksData);
    });
    return () => unsubscribe();
  }, []);

  const toggleComplete = async (task: Task) => {
    if (task.id)
      await updateDoc(doc(db, "tasks", task.id), {
        completed: !task.completed
      });
  };

  const deleteTask = async (id?: string) => {
    if (id) await deleteDoc(doc(db, "tasks", id));
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id || null);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditDueDate(task.dueDate || "");
  };

  const saveEdit = async (id?: string) => {
    if (!id) return;
    await updateDoc(doc(db, "tasks", id), {
      title: editTitle,
      description: editDescription,
      dueDate: editDueDate
    });
    setEditingId(null);
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task)}
          />
          {editingId === task.id ? (
            <div className="edit-form">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
              />
              <button onClick={() => saveEdit(task.id)}>💾</button>
              <button onClick={() => setEditingId(null)}>✖️</button>
            </div>
          ) : (
            <>
              <span className={`task-title ${task.completed ? "completed" : ""}`}>
                {task.title} {task.description && `— ${task.description}`}
                {task.dueDate && (
                  <span className="task-date">
                    📅 {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                  </span>
                )}
              </span>
              <div className="task-actions">
                <button onClick={() => startEdit(task)}>✏️</button>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑️</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
