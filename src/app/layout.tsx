import { MenuProvider } from "@/lib/context/MenuContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MenuProvider>
      {children}
    </MenuProvider>
  );
}
