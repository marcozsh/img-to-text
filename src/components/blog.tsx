type BlogComponentType = {
  title: string;
  content: string;
};

export default function BlogComponent({
  title,
  content,
}: BlogComponentType) {
  return (
    <>
      <section className="flex flex-col gap-1 pb-2 w-[700px]">
        <h2 className="text-4xl sm:text-5xl sm:leading-[64px] mt-4 mb-0 break-words">
          {title == undefined ? "" : title}
        </h2>
        <div className="prose-lg sm:prose-2xl sm:leading-[38.4px] break-words">
          <article>
            <p className="text-2xl">{content == undefined ? "" : content}</p>
          </article>
        </div>
      </section>
    </>
  );
}
