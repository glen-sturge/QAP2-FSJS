window.addEventListener("load", async function () {
  const url = "http://localHost:3000/users.json";

  try {
    const response = await this.fetch(url);
    if (!response.ok) {
      throw new Error("Request failed. Status: " + response.status);
    }
    const users = await response.json();
    const output = this.document.querySelector(".output");
    output.textContent = JSON.stringify(users, null, 2);
  } catch (error) {
    console.log("An error has occured: " + error);
  }
});
