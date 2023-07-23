import { useNavigate } from 'react-router-dom';
import ApiServerClient from '../ApiServerClient';

export const logoutUser = async (user, setUser, navigate, toast) => {
  console.log(user);
  try {
    await ApiServerClient.auth('logout', {
      id: user._id,
    });
    setUser(null);
    toast.success('Logout successful.');
    navigate('/login');
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.error) {
      toast.error(error.response.data.error);
    }
  }
};