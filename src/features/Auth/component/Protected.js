import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector"
import { Navigate, useNavigate } from "react-router-dom"
import { selectLoggedInUser } from "../AuthSlice"

const Protected = ({children}) => {
    const user = useSelector(selectLoggedInUser)
    if (!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
  return children;

}

export default Protected;