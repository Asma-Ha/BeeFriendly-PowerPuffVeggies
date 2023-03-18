import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import { useRef } from "react";

const Navbar = () => {
  const navRef = useRef();
  return (
    <div className="header sticky flex flex-col z-50">
      <nav className="Btns px-2  gap-10 ">
        <div className="flex flex-row items-center mr-44">
          <img
            src={logo}
            className="lg:w-[160px] w-[70px] h-[70px] lg:h-[120px] ml-0"
            alt=""
          />
          <h1 className=" text-2xl font-extrabold text-asfar ">BeeFriendly</h1>
        </div>
        <a className=" relative p-[10px] ml-[20px]" href="/#Home">
          {" "}
          Home{" "}
        </a>
        <Link className=" relative p-[10px] ml-[20px] " to="/Research">
          {" "}
          Workshops
        </Link>
        <Link className=" relative p-[10px] ml-[20px] " to="/Research">
          {" "}
          Learn with us{" "}
        </Link>
        <p> | </p>
        <Link className=" relative p-[10px] ml-[20px] " to="/Research">
          {" "}
          Join us{" "}
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
