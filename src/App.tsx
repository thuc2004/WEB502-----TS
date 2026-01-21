import { Toaster } from "react-hot-toast";
import { Link, Route, Routes } from "react-router-dom";
import ListPage from "./pages/List";
import EditPage from "./pages/Edit";
import AddPage from "./pages/Add";
import Button from "./components/Button";
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(1000000); // state: count = 0, setState : value => state = value

  useEffect(() => {
    console.log("App component da duoc render");
    // fetch("https://jsonplaceholder.typicode.com/posts");
    document.title = `Count is ${count}`;
  }, []);
  return (
    <>
      <h1>bien count co gia tri : {count}</h1>
      <Button
        label="tang count leen 1"
        color="red"
        onClick={() => setCount(count + 1)}
      />
      <Button label="Blue Button" onClick={() => alert("Blue clicked!")} />
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            <strong>WEB502 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="add" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="#" className="hover:text-gray-200">
              Đăng nhập
            </Link>
            <Link to="#" className="hover:text-gray-200">
              Đăng ký
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB502</h1>
      </div>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/add" element={<AddPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
