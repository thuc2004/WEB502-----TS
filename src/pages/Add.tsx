import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import z from "zod";

type FormValue = {
  name: string;
};

const validate = z.object({
  name: z.string().min(3, "Name 3 ky tu").max(10),
  credit: z.number().min(1).max(100),
  category: z.string().nonempty("Vui lòng chọn danh mục"),

  teacher: z
    .string()
    .min(3, "Tên giảng viên phải ít nhất 3 ký tự")
    .nonempty("Tên giảng viên không được để trống"),
});
function AddPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validate),
  });
  console.log(errors);

  const onSubmit = async (values: FormValue) => {
    console.log(values);
    try {
      await axios.post("http://localhost:3000/subject", values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Text input */}
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Text
          </label>
          <input
            type="text"
            {...register("name")}
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span>{errors?.name?.message}</span>
        </div>

        {/* Select */}
        <div>
          <label className="block font-medium mb-1">credit</label>
          <input
            type="number"
            {...register("credit", { valueAsNumber: true })}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.credit && (
            <p className="text-red-500 text-sm">{errors.credit.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Danh mục</label>
          <select
            {...register("category")}
            className="w-full border rounded-lg px-3 py-2 bg-white"
          >
            <option value="">-- Chọn danh mục --</option>
            <option value="Chuyên ngành">Chuyên ngành</option>
            <option value="Cơ sở ngành">Cơ sở ngành</option>
            <option value="Đại cương">Đại cương</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Giảng viên</label>
          <input
            type="text"
            {...register("teacher")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.teacher && (
            <p className="text-red-500 text-sm">{errors.teacher.message}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPage;
