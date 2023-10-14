// Auther : Mansi Kapadia
// 8-10-2023

// Function to fetch the list of employees from the API
export const fetchEmployees = async () => {
  const apiUrl =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const employeeData = await response.json();
    return employeeData;
  } catch (error) {
    throw error;
  }
};
