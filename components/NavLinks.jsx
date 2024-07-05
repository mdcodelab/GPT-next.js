
import Link from "next/link";
const links = [
  {href: "/chat", label: "Chat"},
  {href: "/tours", label: "Tours"},
  {href: "/tours/new-tour", label: "New Tours"},
  {href: "/profile", label: "Profile"}
];

function NavLinks() {
  return (
    <ul className="menu text-base-content mt-4">
        {links.map((link) => (
          <li key={link.href}><Link href={link.href} className="text-lg">{link.label}</Link></li>
        ))}
    </ul>
  )
}

export default NavLinks;
