import BlogComponent from "@/components/blog";
import CustomNavBar from "@/components/custom-nav-bar";
import Footer from "@/components/footer";
import Separator from "@/components/separator";
import { blogContent } from "@/data/blog-content";

export default function HowItWorks() {
  return (
    <>
      <header className="flex justify-center w-screen">
        <CustomNavBar />
      </header>
      <main className="flex flex-col items-center justify-between h-full">
        {blogContent.map((item, index) => (
          <BlogComponent
            key={index}
            title={`${item.title}`}
            content={`${item.content}`}
          />
        ))}
        <Separator />
        <Footer />
      </main>
    </>
  );
}
