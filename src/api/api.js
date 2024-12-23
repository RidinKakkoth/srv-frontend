import axiosInstanceWithInterceptor from "../config/axios";

const axiosInstance = axiosInstanceWithInterceptor();

export const userLogin = async (email, password) => {
  try {
    const { data } = await axiosInstance.post("api/auth/login", {
      email,
      password,
    });

    
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const userSignUp = async (name, email, password) => {
  try {
    const { data } = await axiosInstance.post("api/auth/register", {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};


export const getProduct = async () => {
  try {
    const { data } = await axiosInstance.get("/api/product/all");
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const addProduct = async (product) => {
  try {
    const { data } = await axiosInstance.post("/api/product/add", product);
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const editProduct = async (id, formData) => {
  try {
    const { data } = await axiosInstance.put("/api/product/edit", {id,formData});
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const deleteProduct = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`api/product/delete/${id}`);
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const subscribeProduct = async (userId, productId) => {
  try {
    const { data } = await axiosInstance.patch(`api/product/subscribe/${userId}/${productId}`);
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
