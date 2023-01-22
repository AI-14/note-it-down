import { api } from "./apiConfig";
import { UpdateUserCredentials, UserCredentials } from "./types";

class UserServiceAPI {

  static signupUser = async (signupFormData: UserCredentials): Promise<any> => {
    const response = await api.post(
      "users/user/signup/",
      JSON.stringify(signupFormData),
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    return response.data;
  };

  static loginUser = async (loginFormData: UserCredentials): Promise<any> => {
    const response = await api.post(
      "users/user/login/token/",
      JSON.stringify(loginFormData),
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  
    return response.data;
  };

  static getUserInfo = async (authToken: string | null): Promise<any> => {
    const response = await api.get("users/user/", {
      headers: {
        "Authorization": `Bearer ${authToken}`,
      },
    });
  
    return response.data;
  };

  static updateUserCredentials = async ( 
    updatedCredentailsData: UpdateUserCredentials
  ): Promise<any> => {
    const response = await api.put(
      "users/user/",
      JSON.stringify(updatedCredentailsData),
      {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${updatedCredentailsData.authToken}`,
        },
      }
    );
  
    return response.data;
  };

  static deleteUser = async (authToken: string | null): Promise<any> => {
    const response = await api.delete("users/user/", {
      headers: {
        "Authorization": `Bearer ${authToken}`,
      },
    });
  
    return response.data;
  };

}

export { UserServiceAPI };

