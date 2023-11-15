import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { MdMenu, MdMenuOpen, MdSend, MdSettings } from "react-icons/md";
import { COLLECTION } from "../firebase/collections";
import { auth, firestore } from "../firebase/database";
import { getStateContext } from "../context/stateProvider";

const chatInput = ({ quickAction }: { quickAction: any }) => {
  const [menuOption, setMenuOption] = React.useState<"emoji" | "settings">("emoji");
  const [message, setMessage] = React.useState<string>("");
  const [emojiUrl, setEmojiUrl] = React.useState<string>("");
  const [menu, setMenu] = React.useState<boolean>(false);
  const [{ user }] = getStateContext();

  const emojiIcon = [
    {
      code: "😀",
      image: "/emojis/smile.gif",
    },
    {
      code: "😆",
      image: "/emojis/laughing.gif",
    },
    {
      code: "😵",
      image: "/emojis/dizzy-face.gif",
    },
    {
      code: "😄",
      image: "/emojis/grin.gif",
    },
    { image: "/emojis/grinning.gif", code: "😁" },
    {
      image: "/emojis/kissing.gif",
      code: "😚",
    },
    { image: "/emojis/partying-face.gif", code: "🥳" },
    { image: "/emojis/pensive.gif", code: "😔" },
    { image: "/emojis/sleep.gif", code: "😴" },
    { image: "/emojis/sparking-heart.gif", code: "💖" },
    { image: "/emojis/squinting-tongue.gif", code: "😝" },
    { image: "/emojis/star-stuck.gif", code: "🤩" },
    { image: "/emojis/wink.gif", code: "😉" },
    { image: "/emojis/yum.gif", code: "😋" },
    { image: "/emojis/heart-face.gif", code: "🥰" },
    { image: "/emojis/heart-eye.gif", code: "😍" },
    { image: "/emojis/halo.gif", code: "😇" },
    { image: "/emojis/rage.gif", code: "😡" },
    { image: "/emojis/cry.gif", code: "😥" },
    { image: "/emojis/yellow-heart.gif", code: "💛" },
    { image: "/emojis/pleading.gif", code: "🥺" },
  ];

  const sendMessage = (type: "message" | "emoji" | "voice" = "message") => {
    try {
      if (message.trim() || emojiUrl) {
        setDoc(doc(firestore, COLLECTION.MESSAGES, `${Date.now().toString()}`), {
          uid: user?.uid,
          username: user?.username,
          dataType: type,
          message: message ? message : emojiUrl,
          createdAt: Date.now(),
        });
        setMessage("");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = () => {
    console.log("not set.");
  };

  return (
    <div className="absolute bg-gray-900 bottom-0 p-2 w-full flex justify-center items-center gap-2">
      {menu && (
        <div className="absolute flex justify-center w-[90%] gap-3 left-2 bottom-16 bg-gray-900 p-1 rounded animate-scale-up-ver-bottom">
          <div className="bg-gray-800 rounded-md p-2 flex flex-col justify-center items-center gap-2">
            <img
              onClick={() => {
                auth.signOut()
                window.location = quickAction;
              }}
              className="w-10 cursor-pointer"
              src="/emojis/rocket.gif"
              alt="rocket"
            />
            <button onClick={() => setMenuOption("settings")}>
              <MdSettings className="w-10 h-10 cursor-pointer" />
            </button>
            <img onClick={() => setMenuOption("emoji")} className="w-10 cursor-pointer" src="/emojis/smile.gif" alt="rocket" />
          </div>
          <div className="w-full bg-gray-800 rounded-md p-2">
            {menuOption === "emoji" && (
              <div className="flex flex-wrap gap-2 overflow-scroll w-full h-32">
                {emojiIcon?.map((dataField: any, key: number) => (
                  <span
                    key={key}
                    className="text-4xl cursor-pointer"
                    onClick={() => {
                      setEmojiUrl(dataField.image);
                      sendMessage("emoji");
                    }}
                  >
                    {dataField.code}
                  </span>
                ))}
              </div>
            )}
            {menuOption === "settings" && (
              <div>
                <button onClick={handleDelete} className="px-5 py-2 bg-red-500 font-bold text-sm border border-red-600 rounded animate-jump active:animate-scale-down-center">
                  Delete All
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <button onClick={() => setMenu(!menu)} className="bg-gray-700 p-2 rounded">
        {menu ? <MdMenuOpen className="w-6 h-6" /> : <MdMenu className="w-6 h-6" />}
      </button>
      <input
        type="text"
        className="w-full p-2 rounded outline-none text-gray-800"
        name="message"
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        spellCheck={true}
        onKeyUp={(e) => {
          if (e.keyCode == 13) {
            sendMessage("message");
          }
        }}
      />
      <button onClick={() => sendMessage("message")} type="submit" className="bg-gray-700 p-2 rounded">
        <MdSend className="w-6 h-6" />
      </button>
    </div>
  );
};

export default chatInput;
