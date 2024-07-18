export default async (callback) => {
  const token = localStorage.getItem("user");
  try {
    const data = await fetch(
      "https://crm.paramountstudents.com/admin/get_highschools",
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
  }
};
