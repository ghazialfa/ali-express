import { Button } from "@/components/ui/button";
import ClientFlashComponent from "@/components/ui/client-flash-component";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Login() {
  const handleLogin = async (formData: FormData) => {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");
    // console.log("🚀 ~ handleLogin ~ email:", email);
    // console.log("🚀 ~ handleLogin ~ password:", password);

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return redirect("/login?error=" + data.message);
    }

    cookies().set("Authorization", "Bearer " + data.data.access_token);

    return redirect("/");
  };
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="container py-24 lg:py-32 flex items-center">
        <div className="md:w-1/2 xl:w-5/12 md:pr-8 xl:pr-0">
          <ClientFlashComponent />
          {/* Title */}
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome Back
          </h1>
          <p className="mt-3 mb-3 text-xl text-muted-foreground">
            Login to your account to continue shopping.
          </p>

          {/* Form */}
          <form action={handleLogin}>
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
              <Button>Login</Button>
            </div>
          </form>
          {/* End Form */}
          {/* Sign Up Button */}
          <div className="mt-4">
            <Link href={"/register"}>
              <Button variant={"outline"}>Sign up</Button>
            </Link>
            <span className="ml-2 text-sm text-muted-foreground">
              Don`t have an account yet?
            </span>
          </div>
          {/* End Sign Up Button */}
        </div>
        <Image
          className="md:block md:w-1/2 xl:w-7/12 md:relative md:top-0 md:left-1/2 md:translate-x-[-50%] h-full"
          src="/banner.png"
          width={500}
          height={700}
          alt="Shop from millions of products"
        />
      </div>
    </div>
  );
}
