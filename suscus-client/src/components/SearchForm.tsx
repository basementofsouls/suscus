import { useEffect, useRef, useState } from "react";
import "../css/SearchForm.css";
import { observer } from "mobx-react-lite";
import CategoriesList from "./categoriesList";

export interface SearchFormProps {
  setSearch: any;
}

const SearchForm: React.FC<SearchFormProps> = ({ setSearch }) => {
  const searchRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState<Array<number>>(
    []
  );
  const [title, setTitle] = useState("");

  const handleOnChangeSearch = async (e: any) => {
    setTitle(searchRef?.current?.value);
  };

  useEffect(() => {
    setSearch({
      title: title,
      categories: selectedCategories,
    });
  }, [title, selectedCategories]);

  return (
    <div className="search-block">
      <form className="search-form">
        <input
          ref={searchRef}
          type="search"
          placeholder="search"
          onChange={handleOnChangeSearch}
          className="search-form-input"
        />
      </form>

      <CategoriesList setSearchCategories={setSelectedCategories} />
    </div>
  );
};

export default observer(SearchForm);
