import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="bg-blue-300 min-h-screen flex flex-col items-center">
      {children}
    </main>
  );
};

export default Layout;
