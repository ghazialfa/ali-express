import { Button } from "@/components/ui/button";
import ClientFlashComponent from "@/components/ui/client-flash-component";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Register() {
  const handleRegister = async (formData: FormData) => {
    "use server";

    const name = formData.get("name");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: username,
          email: email,
          password: password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return redirect("/register?error=" + data.message);
    }

    redirect("/login");
  };
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="container py-24 lg:py-32 flex items-center">
        <div className="md:w-1/2 xl:w-5/12 md:pr-8 xl:pr-0">
          <ClientFlashComponent />
          {/* Title */}
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Discover Amazing Deals
          </h1>
          <p className="mt-3 mb-3 text-xl text-muted-foreground">
            Shop from millions of products and get the best deals at AliExpress.
          </p>

          {/* Form */}
          <form action={handleRegister}>
            <div className="mb-4">
              <Label htmlFor="name" className="sr-only">
                Full name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Full name"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="username" className="sr-only">
                Username
              </Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Input type="email" id="email" name="email" placeholder="Email" />
            </div>
            <div className="mb-4">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="grid">
              <Button>Sign up</Button>
            </div>
          </form>
          {/* End Form */}
          {/* Login Button */}
          <div className="mt-4">
            <Link href={"/login"}>
              <Button variant={"outline"}>Login</Button>
            </Link>
            <span className="ml-2 text-sm text-muted-foreground">
              Already have an account?
            </span>
          </div>
          {/* End Login Button */}
        </div>
        <Image
          className="hidden md:block md:w-1/2 xl:w-7/12 md:relative md:top-0 md:left-1/2 md:translate-x-[-50%] h-full"
          src="/banner.png"
          width={500}
          height={700}
          alt="Shop from millions of products"
        />
      </div>
    </div>
  );
}
