import HomeBody from "@/components/homepage/body";
import Header from "@/components/homepage/header/header";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <Image
        src="/aliexpress_tagline.webp"
        alt="AliExpress Tagline"
        width={1000}
        height={500}
      />
      <Header />
      <HomeBody />
    </main>
  );
}
