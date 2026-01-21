import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Subject = {
  id: number;
  name: string;
  credit: string;
  category: string;
  instructor: string;
  duration: string;
};

const List = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await fetch("http://localhost:3000/subject");
        const data: Subject[] = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    getAll();
  }, []);

  const handleDelete = async (id: number) => {
    const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (!isConfirm) return;

    try {
      await fetch(`http://localhost:3000/subject/${id}`, {
        method: "DELETE",
      });

      setSubjects(subjects.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Xóa thất bại:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Danh sách</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Credit</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.credit}</td>
              <td className="border p-2">{item.category}</td>
              <td className="border p-2 space-x-3">
                <Link
                  to={`/edit/${item.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Sửa
                </Link>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
