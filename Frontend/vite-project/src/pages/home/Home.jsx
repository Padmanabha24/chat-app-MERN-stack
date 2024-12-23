import MessageContainer from "../../components/messages/MessageContainer.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";

const Home = () => {
  return (
    <div className="flex sm:h-[550px] md:h-[550px] rounded-lg overflow-hidden  bg-clip-padding backdrop-filter backdrop-blur-3xl  bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;


