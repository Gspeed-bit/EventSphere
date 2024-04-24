import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="wrapper space-y-4 md:space-y-0 flex md:flex-row flex-sm md:flex-between w-full ">
      <Link href="/" className="">
        <Image
          src="/assets/images/loogo.svg" // Logo image source
          width={130} // Logo image width
          height={35} // Logo image height
          alt="logo" // Alt text for logo
        />
      </Link>
      <p>&copy; {currentYear} EventSphere. All Rights reserved.</p>
    </div>
  );
}
export default Footer