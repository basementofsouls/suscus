import { useContext, useEffect, useState } from "react";
import "../css/settingsPage.css";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import UpdateProfileForm from "../components/UpdateProfileForm";
import CategoryForm from "../components/categoryForm";
import CategoryService from "../services/category.service";

const SettingsPage = () => {
  const { store } = useContext(Context);
  const [categorys, setCategorys] = useState<Array<any>>([]);
  const [changeCategory, setChangeCategory] = useState({} as any);
  const [changeCategoryId, setChangeCategoryId] = useState(-1);

  useEffect(() => {
    const fetchCategory = async () => {
      const { data } = await CategoryService.getAllCategory();

      setCategorys(data);
    };

    fetchCategory();
  }, []);

  const handleChangeCategory = (id) => {
    setChangeCategory(categorys.filter((e) => e.id == id)[0]);
    setChangeCategoryId(id);
  };

  const handlerUpdateCategory = async () => {
    try {
      console.log(changeCategory);
      const { data } = await CategoryService.updateCategory(changeCategory);
      const newCategorys = categorys;
      newCategorys[categorys.findIndex((e) => e.id == changeCategoryId)] = data;
      setCategorys(newCategorys);
    } catch (e: any) {
      console.log(e);
    }
    setChangeCategoryId(-1);
  };

  const handleDeleteCategory = async (id: string) => {
    const { data } = await CategoryService.deleteCategory(id);
    setCategorys(categorys.filter((e) => e.id != data.id));
  };

  return (
    <div className="settings-page">
      <div className="settings-page-block">
        <div className="settings-header">
          <h2>Settings Page </h2>
        </div>
        <div className="settings-page-content">
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
                          <div key={e.id} className="comments-block-comment">
                            <div className="comments-block-comment-row">
                              <p>id:{e.id}</p>
                              <div className="buttons-row">
                                {changeCategoryId != e.id ? (
                                  <div
                                    onClick={() => {
                                      handleChangeCategory(e.id);
                                    }}
                                  >
                                    change
                                  </div>
                                ) : (
                                  ""
                                )}
                                <p
                                  onClick={() => {
                                    handleDeleteCategory(e.id);
                                  }}
                                >
                                  X
                                </p>
                              </div>
                            </div>

                            {changeCategoryId == e.id ? (
                              <div>
                                <input
                                  onChange={(e) => {
                                    setChangeCategory({
                                      ...changeCategory,
                                      name: e.target.value,
                                    });
                                  }}
                                  value={`${changeCategory?.name}`}
                                ></input>
                                <div onClick={handlerUpdateCategory}>Save</div>
                              </div>
                            ) : (
                              <p className="comment-text">{e.name}</p>
                            )}
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
