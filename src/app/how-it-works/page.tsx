import BlogComponent from "@/components/blog";
import { blogContent } from "@/data/blog-content";

export default function HowItWorks() {
  return (
    <>
      <main className="flex flex-col items-center justify-between h-full pb-14">
        {blogContent.map((item, index) => (
          <BlogComponent
            key={index}
            title={`${item.title}`}
            content={`${item.content}`}
          />
        ))}
      </main>
    </>
  );
}
