import { useRef, useState } from "react";
import "../css/SearchForm.css";
import { observer } from "mobx-react-lite";

export interface SearchFormProps {
  setSearch: any;
}

const SearchForm: React.FC<SearchFormProps> = ({ setSearch }) => {
  const searchRef = useRef(null);
  const handleOnChangeSearch = async (e: any) => {
    try {
      setSearch({ title: searchRef.current.value });
    } catch (error) {
      console.error(error);
      alert("Error during login.");
    }
  };

  return (
    <form className="search-form">
      <input
        ref={searchRef}
        type="search"
        placeholder="search"
        onChange={handleOnChangeSearch}
        className="search-form-input"
      />
    </form>
  );
};

export default observer(SearchForm);
