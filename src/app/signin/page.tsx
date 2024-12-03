import CustomNavBar from "@/components/custom-nav-bar";
import Footer from "@/components/footer";
import Separator from "@/components/separator";
import LoginPage from "@/components/signin-signup";

export default function HowItWorks() {
  return (
    <>
      <header className="flex justify-center w-screen">
        <CustomNavBar />
      </header>
      <main className="flex flex-col items-center justify-between h-full">
      	<LoginPage/>
        <Separator />
        <Footer />
      </main>
    </>
  );
}
