import { nanoid } from "nanoid";

export default function Home() {
  const BE_URL = "http://localhost:3001/add-user";
  const newid = nanoid();
  console.log("id", newid);
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      id: newid,
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
    <div className="flex items-center justify-center  ">
      <form className=" flex gap-10" onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input type="username" name="username" />
        </label>
        <input
          className="border border-spacing-5 rounded"
          type="submit"
          value="submit"
        ></input>
      </form>
    </div>
  );
}
