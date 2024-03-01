"use client";

import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainRoutes = [
  { path: "/", name: "Home" },
  {
    path: "/dashboard",
    name: "Dashboard",
    requiredPermissions: ["ask:question"],
  },
  {
    path: "/admin-area",
    name: "Admin Area",
    requiredPermissions: ["delete:question"],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, getPermissions } =
    useKindeBrowserClient();
  const { permissions } = getPermissions();

  return (
    <aside className="min-h-screen min-w-[300px] bg-zinc-900 text-white/50">
      <ul className="h-full text-center flex flex-col py-5 gap-2">
        {mainRoutes.map(({ path, name, requiredPermissions }) => {
          if (
            !requiredPermissions ||
            requiredPermissions.every((p) => permissions?.includes(p))
          ) {
            return (
              <li key={path}>
                <Link
                  className={`py-3 px-5 text-center ${
                    pathname === path ? "bg-zinc-800" : ""
                  } hover:bg-zinc-800 rounded-md w-[90%] transition inline-block`}
                  href={path}
                >
                  {name}
                </Link>
              </li>
            );
          }
        })}

        <div className="mt-auto">
          {
            // tailwind css loading spinner
            isLoading && !(pathname === "/") && (
              <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white/50 mx-auto my-2"></div>
            )
          }

          {user?.picture && (
            <Image
              src={user?.picture}
              alt="Profile picture"
              width={50}
              height={50}
              className="rounded-full mx-auto my-2"
            />
          )}

          {user && !user.picture && (
            <div className="h-7 w-7 rounded-full mx-auto my-2 bg-zinc-800 text-xs flex justify-center items-center">
              {user?.given_name?.[0]}
            </div>
          )}

          {user?.email && (
            <p className="text-center text-xs mb-3 ">
              Logged in as {user?.email}
            </p>
          )}

          {isAuthenticated && (
            <LogoutLink
              className={`py-3 px-5 text-center  hover:bg-zinc-800 rounded-md w-[90%] transition inline-block`}
            >
              Log out
            </LogoutLink>
          )}
        </div>
      </ul>
    </aside>
  );
}
