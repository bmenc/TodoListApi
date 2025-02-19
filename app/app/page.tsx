"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const taskSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "El título es requerido"),
  isCompleted: z.boolean().default(false),
});

type Task = z.infer<typeof taskSchema>;

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>({ resolver: zodResolver(taskSchema) });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("https://localhost:7045/api/TaskItems");
        setTasks(res.data);
      } catch (error) {
        console.error("Error al obtener tareas", error);
      }
    };
    fetchTasks();
  }, []);

  const onSubmit = async (data: Task) => {
    try {
      const res = await axios.post(
        "https://localhost:7045/api/TaskItems",
        data
      );
      setTasks((prev) => [...prev, res.data]);
      reset();
    } catch (error) {
      console.error("Error al agregar tarea", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`https://localhost:7045/api/TaskItems/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea", error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const updatedTask = { ...task, id: task.id };
      await axios.put(
        `https://localhost:7045/api/TaskItems/${task.id}`,
        updatedTask
      );
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
      setEditingTaskId(null);
    } catch (error) {
      console.error("Error al actualizar tarea", error);
    }
  };

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) =>
        editingTaskId === row.original.id ? (
          <input
            type="text"
            defaultValue={row.original.title}
            onBlur={(e) =>
              updateTask({ ...row.original, title: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm p-1"
          />
        ) : (
          <span>{row.original.title}</span>
        ),
    },
    {
      accessorKey: "isCompleted",
      header: "Completado",
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.original.isCompleted}
          onChange={(e) =>
            updateTask({ ...row.original, isCompleted: e.target.checked })
          }
        />
      ),
    },
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div>
          {editingTaskId === row.original.id ? (
            <button
              onClick={() => updateTask(row.original)}
              className="bg-blue-700 text-white px-4 py-1"
            >
              Guardar
            </button>
          ) : (
            <button
              onClick={() => setEditingTaskId(row.original.id ?? null)}
              className="bg-yellow-700 text-white px-4 py-1"
            >
              Editar
            </button>
          )}
          <button
            onClick={() => deleteTask(row.original.id!)}
            className="bg-red-700 text-white px-4 py-1 ml-2"
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="p-2">
        <input
          {...register("title")}
          placeholder="Nueva tarea"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm p-1"
        />
        <button type="submit" className="bg-green-700 text-white px-4 py-1">
          Agregar
        </button>
        {errors.title && <p>{errors.title.message}</p>}
      </form>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
