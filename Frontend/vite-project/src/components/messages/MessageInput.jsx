import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { generateReply } from "../../utils/aiassistant.js"; // A utility function for AI-generated replies

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const [aiReply, setAiReply] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  const handleGenerateReply = async () => {
    if (!message) return;
    try {
      const reply = await generateReply(message);
      setAiReply(reply);
      console.log(message);
    } catch (error) {
      console.error("AI reply generation error:", error);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-[70pc] p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 end-10 flex items-center pe-3"
          onClick={handleGenerateReply}
          disabled={loading}
        >
          AI Reply
        </button>

        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>

      {aiReply && (
        <div className="mt-2 p-2 border rounded bg-gray-800 text-white">
          <p className="text-sm">AI Suggestion:</p>
          <p>{aiReply}</p>
        </div>
      )}
    </form>
  );
};

export default MessageInput;

// STARTER CODE SNIPPET
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute bottom-[24px] right-[13px] end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;
