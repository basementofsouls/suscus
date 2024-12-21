import { useContext, useEffect, useState } from "react";
import "../css/settingsPage.css";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import UpdateProfileForm from "../components/UpdateProfileForm";
import CategoryForm from "../components/categoryForm";
import CategoryService from "../services/category.service";

const SettingsPage = () => {
  const { store } = useContext(Context);

  const [user, setUser] = useState(store.user);

  useEffect(() => {
    setUser(store.user);
  }, [store.user]);

  const handlerBeArtistClick = async () => {
    await store.update({ role: "artist" });
  };

  const [categorys, setCategorys] = useState([]);
  const handlerDeleteCategoryClick = async () => {
    await store.update({ role: "artist" });
  };
  useEffect(() => {
    const fetchCategory = async () => {
      const { data } = await CategoryService.getAllCategory();

      setCategorys(data);
    };

    fetchCategory();
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="settings-page">
      <div className="settings-page-block">
        <div className="settings-header">
          <h2>Settings Page </h2>
        </div>
        <div className="settings-page-content">
          <div className="settings-block">
            {user.role === "user" ? (
              <button onClick={handlerBeArtistClick}>BeArtist</button>
            ) : (
              ""
            )}
          </div>
          <UpdateProfileForm />
          <div className="settings-block">
            {store.user.role == "moderator" ? (
              <div>
                <CategoryForm />
                <div className="categories-list">
                  <h4>Существующие категории</h4>
                  {categorys
                    ? categorys.map((e: any) => {
                        return (
                          <div key={e.id} className="categorie-item">
                            <div className="categorie-item-buttons">
                              <p>X</p>
                              <p>Изменить</p>
                              <p>Сохранить</p>
                            </div>
                            <p>{e.name}</p>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(SettingsPage);
