import { ArrowLeft, Ellipsis } from "lucide-react";

export default function ChatRoomHeader() {
  return (
    <header className="border-b border-border-default bg-bg-header flex justify-between w-full py-6.5 px-4">
      <div className="flex gap-2">
        <ArrowLeft className="cursor-pointer" color="white" size={30} />
        <h1 className="text-xl font-medium text-white"># Genrral</h1>
      </div>
      <Ellipsis className="cursor-pointer" color="white" size={30} />
    </header>
  );
}
