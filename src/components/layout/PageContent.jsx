export default function PageContent({ wide = false, children }) {
  return (
    <main className={`mx-auto w-full flex-1 space-y-12 px-4 py-8 sm:px-8 md:py-10 ${wide ? "max-w-[90rem]" : "max-w-5xl"}`}>
      {children}
    </main>
  );
}
