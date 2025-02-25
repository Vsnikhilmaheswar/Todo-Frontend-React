import React, { use, useEffect } from "react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { AddTaskApi, GetTaskApi } from "./Services/allApi";
import Task from "./Task";
function Todo() {
  const [AddStatus, setaddStatus] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState([]);
  const [editStatus, setEditstatus] = useState([]);
  const [input, setInput] = useState({
    Task: "",
  });
  const handleEmpty = () => {
    setInput({ Task: "" });
  };

  const handleAddTask = async () => {
    const { Task } = input;
    if (!Task) {
      alert("enter task");
    } else {
      const reqBody = {
        Task,
      };
      const result = await AddTaskApi(reqBody);

      if (result.status >= 200 && result.status < 300) {
        setaddStatus(result);
        handleEmpty();
      }
    }
  };
  const [task, setTask] = useState([]);

  const getAllTask = async () => {
    const result = await GetTaskApi();
    setTask(result.data);
    if (result.status >= 200 && result.status < 300) {
    } else {
    }
    console.log(result.data);
  };
  console.log(input);

  useEffect(() => {
    getAllTask();
  }, [AddStatus, deleteStatus, editStatus]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Todo List
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => {
              setInput({ ...input, Task: e.target.value });
            }}
            value={input.Task}
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add
          </button>
        </div>

        <div className="space-y-3">
          {task?.length > 0 &&
            task.map((item) => (
              <Task
                data={item}
                setdeleteStatus={setDeleteStatus}
                setEditstatus={setEditstatus}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;
