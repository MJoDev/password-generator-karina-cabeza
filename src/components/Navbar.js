import Image from "next/image";

const NavBar = () => {
    return(
        <nav className="w-full left-0 mb-5 ml-4 text-left align-left mt-5 flex">
            <Image src={"/padlock.png"} alt="logo" width={32} height={32} ></Image>
            <p className="text-2xl font-bold text-left">Password Generator</p>
        </nav>
    );
}

export default NavBar;