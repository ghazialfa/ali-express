import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "./buttons/logout-button";

export function Navbar() {
  const loggedIn = cookies().get("Authorization");

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black border-b border-gray-200 px-4 py-2 z-50 h-16">
      <div className="flex items-center justify-between max-w-6xl mx-auto h-full">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              alt="Logo"
              className="h-10 rounded-md"
              height="40"
              src="/ali logo.jpg"
              style={{
                aspectRatio: "100/40",
                objectFit: "cover",
              }}
              width="100"
            />
          </Link>
        </div>
        <div className="flex-grow mx-4">
          <div className="relative">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Search for anything"
              type="text"
            />
            <MicroscopeIcon className="absolute right-2 top-2 h-5 w-5 text-gray-500" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex-row w-500 rounded-full" variant="ghost">
                <UserIcon className="h-6 w-6 mr-2 text-white" />
                <span className="sr-only">User menu</span>
                <div className="flex-col">
                  <p className="text-left text-gray-300 text-sm">welcome</p>
                  <p className="text-white font-bold">
                    {loggedIn ? "Log out" : "Sign in / Sign up"}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30">
              {loggedIn ? (
                <>
                  <DropdownMenuItem>
                    <LogoutButton />
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link href="/login">
                      <Button>Sign in</Button>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/register">
                      <Button>Sign up</Button>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={"/wishlist"}>
            <Button className="rounded-full" variant="ghost">
              <ShoppingCartIcon className="h-6 w-6 mr-2 text-white" />
              <span className="sr-only">Cart</span>
              <p className="text-white">Wishlist</p>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function MicroscopeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  );
}

function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
