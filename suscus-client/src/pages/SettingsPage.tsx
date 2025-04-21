import { useContext, useEffect, useState } from "react";
import "../css/Settings/settingsPage.css";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import UpdateProfileForm from "../components/UpdateProfileForm";
import CategoryForm from "../components/categoryForm";
import CategoryService from "../services/category.service";

const SettingsPage = () => {
  const { store } = useContext(Context);
  const [categories, setCategories] = useState<Array<any>>([]);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await CategoryService.getAllCategory();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const startEditing = (category: any) => {
    setEditingCategory(category);
  };

  const saveCategory = async () => {
    try {
      const { data } = await CategoryService.updateCategory(editingCategory);
      setCategories(categories.map((c) => (c.id === data.id ? data : c)));
      setEditingCategory(null);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteCategory = async (id: string) => {
    await CategoryService.deleteCategory(id);
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h2>Настройки</h2>
        </div>

        <div className="settings-content">
          {/* Профиль */}
          <div className="settings-section">
            <h3 className="section-title">Профиль</h3>
            <UpdateProfileForm />
          </div>

          {/* Управление категориями */}
          {store.user.role === "manager" && (
            <div className="settings-section">
              <h3 className="section-title">Категории</h3>
              <CategoryForm />

              <div className="categories-list">
                {categories.map((category) => (
                  <div key={category.id} className="category-item">
                    {editingCategory?.id === category.id ? (
                      <input
                        value={editingCategory.name}
                        onChange={(e) =>
                          setEditingCategory({ ...editingCategory, name: e.target.value })
                        }
                      />
                    ) : (
                      <span>{category.name}</span>
                    )}

                    <div className="category-controls">
                      {editingCategory?.id === category.id ? (
                        <button className="edit" onClick={saveCategory}>Сохранить</button>
                      ) : (
                        <button className="edit" onClick={() => startEditing(category)}>✏</button>
                      )}
                      <button className="delete" onClick={() => deleteCategory(category.id)}>🗑</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(SettingsPage);
