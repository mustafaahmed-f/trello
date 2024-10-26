import TypeWriter from "../../components/TypeWriter";

interface MainProps {}

function Main({}: MainProps) {
  const text: string =
    "Welcome to your productivity hub! Easily track, organize, and collaborate on all your projects, all in one place. Get started by creating boards, adding tasks, and setting priorities to bring your projects to life with ease and clarity. Let's turn your ideas into actions!";
  return (
    <div className="flex items-center justify-center w-full h-full overflow-hidden">
      <TypeWriter text={text} />
    </div>
  );
}

export default Main;
