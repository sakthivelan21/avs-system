import axios from "axios";
const baseUrl = "http://192.168.43.227:5000";
//const baseUrl = "http://localhost:5000";

//admin 

export const loginRequest = async (logindetails) => {
  let response = await axios.post(baseUrl + "/admin/login", logindetails);
  return response.data;
};

export const signupRequest = async (registerdetails) => {
  let response = await axios.post(baseUrl + "/admin/signup", registerdetails);
  return response.data;
};

export const getProfileDetails = async () => {
  let response = await axios.get(baseUrl + "/admin/getAdminDetails", {
    headers: {
      Authorization: sessionStorage.getItem("authToken")},
    });
  return response.data;
};

export const updateProfileDetails = async (profileDetails) => {
  let response = await axios.put(baseUrl + "/admin/updateAdminDetails",profileDetails, {
    headers: {
      Authorization: sessionStorage.getItem("authToken")},
    });
  return response.data;
};

//camera 

export const cameraLoginRequest = async (logindetails) => {
  let response = await axios.post(baseUrl + "/camera/login", logindetails);
  return response.data;
};

export const addCamera = async (cameraDetails) => {
  let response = await axios.post(baseUrl + "/camera/addCamera", cameraDetails,{
    headers: {
      Authorization: sessionStorage.getItem("authToken")},
    });
  return response.data;
};

export const getAllCameras = async () => {
  let response = await axios.get(baseUrl + "/camera/getAllCamerasByAdminId", {
    headers: {
      Authorization: sessionStorage.getItem("authToken")},
    });
  return response.data;
};

export const getCameraById = async (cameraId) => {
  let response = await axios.get(baseUrl + "/camera/getCameraById/"+cameraId, {
    headers: {
      Authorization: sessionStorage.getItem("authToken")},
    });
  return response.data;
};

export const updateCameraDetails = async (cameraDetails) => {
  let response = await axios.put(baseUrl + "/camera/updateCameraDetails",cameraDetails, {
    headers: {
      Authorization: sessionStorage.getItem("authToken")},
    });
  return response.data;
};


export const deleteCameraById = async (cameraId) => {
  let response = await axios.delete(baseUrl + "/camera/deleteCameraById/"+cameraId, {
    headers: {
      Authorization: sessionStorage.getItem("authToken")},
    });
  return response.data;
};

// users
export const getAllUsers = async () => {
  let response = await axios.get(baseUrl + "/user/getAllUsersByAdminId", {
    headers: {
      Authorization: sessionStorage.getItem("authToken")},
    });
  return response.data;
};

export const getUserById = async (userId) => {
  let response = await axios.get(baseUrl + "/user/getUserById/"+userId, {
    headers: {
      Authorization: sessionStorage.getItem("authToken")},
    });
  return response.data;
};

export const updateUserDetailsRequest = async (userDetails) => {
  let response = await axios.put(baseUrl + "/user/updateUserDetails",userDetails, {
    headers: {
      Authorization: sessionStorage.getItem("authToken")},
    });
  return response.data;
};

export const addUserDetails = async (userDetails) => {
  let response = await axios.post(baseUrl + "/user/addUser", userDetails,{
    headers: {
      Authorization: sessionStorage.getItem("authToken")},
    });
  return response.data;
};


export const deleteUserById = async (userId) => {
  let response = await axios.delete(baseUrl + "/user/deleteUserById/"+userId, {
    headers: {
      Authorization: sessionStorage.getItem("authToken")},
    });
  return response.data;
};

export const getAllUserNameAndUrl = async () => {
  let response = await axios.get(baseUrl + "/user/getAllUserNameAndUrl", {
    headers: {
      Authorization: sessionStorage.getItem("authToken")},
    });
  return response.data;
};