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
      <section className="flex flex-col gap-1 pb-2 text-center w-[70%] lg:text-start lg:w-[700px]">
        <h2 className="text-4xl sm:text-5xl sm:leading-[64px] mt-4 mb-0 break-words">
          {title || ""}
        </h2>
        <div className="prose-lg sm:prose-2xl sm:leading-[38.4px] break-words">
	  <article className="text-xl lg:text-2xl leading-[150%]" dangerouslySetInnerHTML={{__html: `${content}`}}/>
	  {
	  //<p className="text-xl lg:text-2xl leading-[150%]">{content == undefined ? "" : content}</p>
	  }
        </div>
      </section>
    </>
  );
}
