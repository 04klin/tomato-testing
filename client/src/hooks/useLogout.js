import { useSoftUIController } from "context/index"

export const useLogout = () => {
  const { dispatch } = useSoftUIController()

  const logout = () => {
    //remove user from storage
    localStorage.removeItem('user')

    //dispatch logout action
    dispatch({type: 'LOGOUT'})
  }

  return {logout}
}