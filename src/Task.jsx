import React, { useEffect, useState } from "react";
import { Trash2, Check, Edit2, X, Save } from "lucide-react";
import { DeleteTaskApi, editTaskApi } from "./Services/allApi";
function Task({ data, setdeleteStatus, setEditstatus }) {
  const [deleteTask, setDeleteTask] = useState();
  const [edit, setEdit] = useState(true);

  const [input, setInput] = useState({
    Task: data.Task,
  });
  const handleeditView = () => {
    setEdit(!edit);
  };
  const handleDelete = async (id) => {
    const result = await DeleteTaskApi(id);
    if (result.status >= 200 && result.status < 300) {
      setdeleteStatus(result);
    }
    console.log(result);
  };

  const handleEdit = async (id) => {
    handleeditView();
    const reqBody = {
      Task: input.Task,
    };
    const result = await editTaskApi(id, reqBody);
    setEditstatus(result);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        {edit ? (
          <span className="text-gray-800">{data.Task}</span>
        ) : (
          <input
            type="text"
            onChange={(e) => {
              setInput({ ...input, Task: e.target.value });
            }}
            value={input.Task}
            className="text-gray-800  w-100 p-0 border-b border-gray-500 focus:outline-none focus:border-blue-500"
          />
        )}
        <div className="flex items-center gap-2">
          <button className="text-blue-500 hover:text-blue-700 transition-colors p-1">
            <Edit2 size={20} onClick={() => handleeditView()} />
          </button>

          {edit ? (
            <button className="text-red-500 hover:text-red-700 transition-colors p-1">
              <Trash2 size={20} onClick={() => handleDelete(data.id)} />
            </button>
          ) : (
            <button className="text-red-500 hover:text-red-700 transition-colors p-1">
              <Save size={20} onClick={() => handleEdit(data.id)} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Task;
