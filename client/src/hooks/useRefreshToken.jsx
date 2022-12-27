import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", { withCredentials: true });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data?.accessToken);
      return { ...prev, accessToken: response.data.accessToken }; //Mantenemos los datos del usuario pero modificamos el accessToken
    });
    return response.data.accessToken;
  };

  // Llamamos a la funcion cuando el token expira, para obtener uno nuevo y asi rehacer la petición

  return refresh;
};

export default useRefreshToken;
