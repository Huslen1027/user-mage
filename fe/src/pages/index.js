import { nanoid } from "nanoid";
import { useState } from "react";
export default function Home({ data }) {
  const BE_URL = "http://localhost:3001/add-user";
  const DELETE_URL = "http://localhost:3001/add-user";
  const [use, setUse] = useState(data.users);
  const [user, setuser] = useState([]);
  const newid = nanoid();

  console.log("id", newid);
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      age: e.target.age.value,
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
    const FETCHED_JSON = await FETCHED_DATA.json();
    setuser(FETCHED_JSON.users);
    setUse(FETCHED_JSON.users);
    console.log(FETCHED_JSON);
  }

  async function handleDelete(e) {
    e.preventDefault();
    console.log("e", e);
    const data = {
      id: e.target.id,
    };
    console.log(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const FETCHED_DATA = await fetch(DELETE_URL, options);
    const FETCHED_JSON = await FETCHED_DATA.text();
    setuser(FETCHED_JSON.users);
    setUse(FETCHED_JSON.users);
    console.log(FETCHED_JSON);
  }
  return (
    <div className="flex items-center justify-center">
      {/* <div>
        {use.map((e, index) => {
          return (
            <div key={index}>
              <h1>{e.username}</h1>
              <p>{e.age}</p>
            </div>
          );
        })}
      </div> */}
      <div className="w-[250px] p-4 bg-gray-300 rounded-lg text-xl">
        <div>
          {user.map((e, index) => {
            return (
              <div key={index} className="p-2 border-2">
                <h1>{e.username}</h1>
                <p>{e.age}</p>
                <button
                  id={e.id}
                  onClick={(e) => {
                    console.log("target.id:", e.target.id);
                    handleDelete(e);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="username">
            Username:
            <input type="username" name="username" />
          </label>
          <label htmlFor="age">
            Age:
            <input type="text" name="age" />
          </label>
          <input
            type="submit"
            value="submit"
            className=" bg-white rounded-md w-[100px] m-auto cursor-pointer "
          />
        </form>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const response = await fetch("http://localhost:3001/users");
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}
