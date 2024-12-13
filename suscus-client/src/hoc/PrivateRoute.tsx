import React, { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../main";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { store } = useContext(Context);
  //TODO добавить loading что бы проверять авторизацию нормально
  return store.isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
