import { useContext } from "react";
import { UserContext } from "../context/userContext";
const useUserContext = () => {
    const user = useContext(UserContext)
  
    return user
  }
  
  export default useUserContext;