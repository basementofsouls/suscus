import { useEffect, useState } from "react";
import "../css/SearchForm.css";
import { observer } from "mobx-react-lite";
import CategoryService from "../services/category.service";

export interface CategoriesListProps {
  setSearchCategories: any;
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  setSearchCategories,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<Array<number>>(
    []
  );

  const HandleOnClickAddCategorie = (id: number) => {
    setSelectedCategories([...selectedCategories, id]);
    setSearchCategories([...selectedCategories, id]);
  };
  const HandleOnClickDeleteCategorie = (id: number) => {
    setSelectedCategories(selectedCategories.filter((e: number) => e != id));
    setSearchCategories(selectedCategories.filter((e: number) => e != id));
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await CategoryService.getAllCategory();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-block">
      <div className="categories-list">
        {categories
          ? categories.map((e: any) => {
              return (
                <p
                  onClick={
                    selectedCategories.indexOf(e.id) == -1
                      ? () => {
                          HandleOnClickAddCategorie(e.id);
                        }
                      : () => {
                          HandleOnClickDeleteCategorie(e.id);
                        }
                  }
                  className={`categorie ${
                    selectedCategories.indexOf(e.id) == -1 ? "" : "selected"
                  }`}
                  key={e.id}
                >
                  {e.name}
                </p>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default observer(CategoriesList);
