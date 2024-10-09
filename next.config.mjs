/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qgcxczgrfxjmupeaybgf.supabase.co",
        pathname: "/storage/v1/object/public/cabin-image/**",
      },
    ],
  },
  // USADO PAR HACER SSG (STATIC SITE GENERATION) DEBE CORRERSE CON ESTA OPCION SOLO CUANDO SE HAYA CONFIGURADO LA FUNCION generateStaticParams PARA QUE PUEDA CARGAR DE MANERA ESTATICA LOS ELEMENTOS DINAMICOS Y ASI CAMBIAR DE UN RENDERIZADO DINAMICO Y AUN ESTATICO Y NO GENERER NINGUN EROR
  // output: "export",
};

export default nextConfig;
