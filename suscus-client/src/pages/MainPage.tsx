import { useEffect, useState } from "react";
import GalleryList from "../components/GalleryList";
import "../css/MainPage.css";
import PublicationService from "../services/publication.service";
import SearchForm from "../components/SearchForm";
import { Publication } from "../types/types";


const MainPage = () => {
  const [publications, setPublications] = useState<Publication[]>(
    [] as Publication[]
  );
  const [search, setSearch] = useState<any>({});

  useEffect(() => {
    const getPublications = async () => {
      const resp = await PublicationService.searchPublications(1, search);
      setPublications(resp.data);
    };
    getPublications();
  }, [search]);

  return (
    <div className="main-page">
      <div className="main-page-block">
        <div className="main-page-gallery">
          <GalleryList publications={publications} />
        </div>
        <div className="main-page-search">
          <SearchForm setSearch={setSearch} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
