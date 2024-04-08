'use client'
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { useState } from "react";

export const MainNav: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const menuItems = [
    "Profile",
    "Categories",
    "Shopping Cart",
    "Login",
    "Sign Up",
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-gray-700 text-white"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold">Ecommerce</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold">Ecommerce</p>
        </NavbarBrand>
        <NavbarItem>
          <Link className="text-slate-200" href="#">
            Categories
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-slate-200" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-slate-200" href="#">
            About us
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/login" className="text-white">Login</Link>
        </NavbarItem>
{/*         <NavbarItem>
          <Button as={Link} color="secondary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
