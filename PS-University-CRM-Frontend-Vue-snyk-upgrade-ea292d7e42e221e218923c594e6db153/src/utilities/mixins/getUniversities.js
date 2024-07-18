export default async (callback) => {
  const token = localStorage.getItem("user");
  //   let result = null;
  try {
    const data = await fetch(
      "https://crm.paramountstudents.com/admin/get_university",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      }
    );
    const jsonData = await data.json();
    console.log(jsonData);
    callback(jsonData);
    return jsonData;
  } catch (err) {
    console.log(err);
    callback(false);
    return false;
    // return false
  }
};
