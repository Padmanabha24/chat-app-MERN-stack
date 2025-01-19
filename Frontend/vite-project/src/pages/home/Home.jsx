import MessageContainer from "../../components/messages/MessageContainer.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
// import GroupChat from '../../components/GroupChat.jsx'; // Import the GroupChat component


const Home = () => {
  return (
    <div className="flex sm:h-[550px] md:h-[750px] md:w-[1550px] rounded-lg overflow-hidden  bg-clip-padding backdrop-filter backdrop-blur-3xl  bg-opacity-0">
      <Sidebar />
      <MessageContainer />

    </div>
  );
};
export default Home;


// import MessageContainer from "../../components/messages/MessageContainer.jsx";
// import Sidebar from "../../components/sidebar/Sidebar.jsx";
// import GroupChat from '../../components/GroupChat.jsx'; // Import the GroupChat component
// import { useState } from 'react';

// const Home = () => {
//   const [isGroupChatVisible, setIsGroupChatVisible] = useState(false);

//   // Toggle visibility of GroupChat component
//   const toggleGroupChat = () => {
//     setIsGroupChatVisible(!isGroupChatVisible);
//   };

//   return (
//     <div className="flex sm:h-[550px] md:h-[750px] md:w-[1550px] rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-0">
//       <Sidebar />
//       <div className="flex-1 flex flex-col p-4">
//         <MessageContainer />
        
//         {/* Add button to toggle visibility of the group chat */}
//         <button
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
//           onClick={toggleGroupChat}
//         >
//           {isGroupChatVisible ? 'Hide Group Chat' : 'Show Group Chat'}
//         </button>

//         {/* Conditionally render the GroupChat component */}
//         {isGroupChatVisible && <GroupChat />}
//       </div>
//     </div>
//   );
// };

// export default Home;
