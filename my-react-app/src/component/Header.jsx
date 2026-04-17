import { Link } from 'react-router-dom'; // อย่าลืม Import Link ด้วยครับ

export default function Header() {
  return (
    <nav className="p-4 bg-gray-800 text-white border-b border-gray-700">
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/Mystock" className="hover:underline">My Stock</Link>
          </li>
        </ul>
      </nav>
  );
}
