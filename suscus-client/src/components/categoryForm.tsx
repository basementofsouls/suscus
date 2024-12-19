import { useState } from "react";
import "../css/loginForm.css";
import CategoryService from "../services/category.service";

const CategoryForm: React.FC = () => {
  const [form, setForm] = useState({ name: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await CategoryService.createCategory(form);
    } catch (error) {
      console.error(error);
      alert("Error during login.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <input
        type="category"
        placeholder="category"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="category-form-input"
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CategoryForm;
