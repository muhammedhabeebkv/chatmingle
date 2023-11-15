import { ChatContainer, ChatInput, Header } from "../components";
import { getStateContext } from "../context/stateProvider";

const chat = () => {
  const [{ user }] = getStateContext();
  return (
    <section className="flex flex-col w-full h-full items-center justify-stretch overflow-hidden">
			<Header />
			<ChatContainer />
      <ChatInput quickAction={user?.quickAction} />
    </section>
  );
};

export default chat;
