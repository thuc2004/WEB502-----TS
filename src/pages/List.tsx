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

  const [search, setSearch] = useState("");
  const [teacher, setTeacher] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

    await fetch(`http://localhost:3000/subject/${id}`, {
      method: "DELETE",
    });

    setSubjects(subjects.filter((item) => item.id !== id));
  };

  const filteredSubjects = subjects.filter((item) => {
    const matchName = item.name.toLowerCase().includes(search.toLowerCase());

    const matchTeacher = teacher === "" || item.instructor === teacher;

    return matchName && matchTeacher;
  });

  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubjects = filteredSubjects.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const teachers = [...new Set(subjects.map((s) => s.category))];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Danh sách</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm theo tên..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2"
        />

        <select
          value={teacher}
          onChange={(e) => {
            setTeacher(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2"
        >
          <option value="">-- Tất cả giảng viên --</option>
          {teachers.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

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
          {paginatedSubjects.map((item) => (
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

          {paginatedSubjects.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 border ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default List;
