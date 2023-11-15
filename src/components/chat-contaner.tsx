import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React from "react";
import { COLLECTION } from "../firebase/collections";
import { firestore } from "../firebase/database";
import { getStateContext } from "../context/stateProvider";
import { HiOutlineUserCircle } from "react-icons/hi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const chatContainer = () => {
  const [messages, setMessages] = React.useState<any>([]);
  const [{ user }] = getStateContext();
  const messageDown: React.MutableRefObject<any> = React.useRef(null);
  dayjs.extend(relativeTime);
  React.useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(firestore, COLLECTION.MESSAGES), orderBy("createdAt")), (messageFromFirebase) => {
      setMessages(messageFromFirebase.docs.map((doc) => doc.data()));
    });

    return () => {
      console.log("working");
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (messageDown) {
      messageDown.current?.addEventListener("DOMNodeInserted", (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);
  return (
    <div className="flex flex-col bg-gray-800 w-full flex-grow p-4 overflow-auto pb-60" ref={messageDown}>
      {messages &&
        messages.map(
          (
            dataField: {
              uid: string;
              username: string;
              dataType: "message" | "emoji" | "voice";
              message: string;
              createdAt: any;
            },
            key: number
          ) =>
            user?.uid == dataField.uid ? (
              <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end" key={key}>
                <div>
                  <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    {dataField.dataType === "emoji" ? <img className="w-10 h-10" src={dataField.message} alt="images" /> : <p className="text-sm">{dataField.message}</p>}
                  </div>
                  <span className="text-xs text-gray-500 leading-none">{dayjs(dataField?.createdAt).fromNow()}</span>
                </div>
                <HiOutlineUserCircle className="flex-shrink-0 h-7 w-7 rounded-full text-gray-900 bg-gray-500" />
              </div>
            ) : (
              <div className="flex w-full mt-2 space-x-3 max-w-xs" key={key}>
                <HiOutlineUserCircle className="flex-shrink-0 h-7 w-7 rounded-full text-gray-900 bg-gray-500" />
                <div>
                  <div className="bg-gray-300 text-gray-700 p-3 rounded-r-lg rounded-bl-lg">
                    <p className="text-sm">{dataField.message}</p>
                  </div>
                  <span className="text-xs text-gray-500 leading-none">{dayjs(dataField?.createdAt).fromNow()}</span>
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default chatContainer;
