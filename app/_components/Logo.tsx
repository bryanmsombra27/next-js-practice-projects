import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import logo from "@/public/logo.png";

interface LogoProps {}
const Logo: FC<LogoProps> = ({}) => {
  return (
    <Link
      href="/"
      className="flex items-center gap-4 z-10"
    >
      {/* traditional way of import images in next.js */}
      {/* <Image
        src="/logo.png"
        height="60"
        width="60"
        alt="The Wild Oasis logo"
      /> */}

      {/* con la importacion de la imagen no es necesario especificar la altura y el ancho de la imagen cosa que en la implementacion anterior si es obligatoria */}
      <Image
        src={logo}
        height="60"
        width="60"
        quality={100}
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
};

export default Logo;
