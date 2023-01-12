import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getNoteListItems } from "~/models/note.server";




const data:any = [];
fetch("http://127.0.0.1:8090/user").then((resp) => {

  resp.json().then((x) => data.push(x))

});

export default function NotesPage() {

  console.log(data);

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Notes</Link>
        </h1>

        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Note
          </Link>

          <hr />

          {data.length === 0 ? (
            <p className="p-4">No notes yet</p>
          ) : (
            <ol>
                {data.map((pessoa:any, idx:number) => (
                  <li key={idx}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={pessoa.id}
                  >
                    📝 {pessoa.username}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* <div className="flex-1 p-6">
          <Outlet />
        </div> */}
      </main>
    </div>
  );
}
