const baseUrl = "http://localhost:3004/api"; // Use your backend's URL

const getRawMobileNumber = (mobileNumber) => {
  return (
    mobileNumber
      ?.replaceAll(" ", "")
      ?.replaceAll("(", "")
      ?.replaceAll(")", "")
      ?.replaceAll("-", "") || null
  );
};

export const signUpUser = async (userData) => {
  try {
    userData.mobile = getRawMobileNumber(userData.mobile);
    const response = await fetch(`${baseUrl}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during user sign-up:", error);
  }
};

export const isRegisteredUser = async (mobileNumber) => {
  try {
    mobileNumber = getRawMobileNumber(mobileNumber);
    const response = await fetch(`${baseUrl}/users/${mobileNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during user sign-up:", error);
  }
};
