const Page = ({
  page,
  index,
  renderingPage,
}: {
  page: string;
  index: number;
  renderingPage: number;
}) => {
  return (
    <p
      key={"p" + index}
      id={"page-" + (index + 1)}
      className={
        index + 1 >= renderingPage
          ? "break-words bg-light px-4 py-10 bg-white shadow-md max-w-4xl md:px-8 md:py-12"
          : "hide-page"
      }
      lang="tr"
    >
      {page}
      <span
        aria-hidden="true"
        className="float-right mt-6 mr-2 text-sm italic"
        key={"pageNum-" + index}
      >
        {index + 1}
      </span>
    </p>
  );
};

export default Page;
