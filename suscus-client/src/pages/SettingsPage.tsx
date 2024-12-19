import { useContext, useEffect, useState } from "react";
import "../css/ProfilePage.css";
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
    <div className="profile-page">
      <div className="profile-page-block">
        <div className="profile-header">
          <h2>Settings Page </h2>
        </div>
        <div className="profile-page-content">
          <div className="profile-top-block">
            {user.role === "user" ? (
              <button onClick={handlerBeArtistClick}>BeArtist</button>
            ) : (
              ""
            )}
          </div>
          <UpdateProfileForm />
          <div>
            <CategoryForm />
            <div>
              <h4>Существующие категории</h4>
              {categorys
                ? categorys.map((e: any) => {
                    return (
                      <div key={e.id}>
                        <p>{e.name}</p>
                        <p>X</p>
                        <p>Изменить</p>
                        <p>Сохранить</p>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(SettingsPage);
