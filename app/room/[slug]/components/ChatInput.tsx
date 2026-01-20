import TextInput from "@/app/ui/TextInput";
import { SendHorizontal } from "lucide-react";

const ChatInput = () => {
  return (
    <div>
      <TextInput icon={<SendHorizontal size={25} color="white" />} />
    </div>
  );
};

export default ChatInput;
