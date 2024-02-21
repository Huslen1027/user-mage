export default function Home() {
  const BE_URL = "http://localhost:3001/add-user";
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
    };
    console.log("username", data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const FETCHED_DATA = await fetch(BE_URL, options);
    const FETCHED_JSON = await FETCHED_DATA.text();
    console.log(FETCHED_JSON);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input type="username" name="username" />
        </label>
        <input type="submit" value="submit"></input>
      </form>
    </div>
  );
}
