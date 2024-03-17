const baseUrl = "http://localhost:3004/api"; // Use your backend's URL

export const signUpUser = async (userData) => {
  try {
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
    mobileNumber = mobileNumber
      .replaceAll(" ", "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("-", "");
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
