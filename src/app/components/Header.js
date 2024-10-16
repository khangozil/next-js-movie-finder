import Link from "next/link";

export default function Header(){
    return(
        <header className="header">
            
            <h1> Movie Finder App </h1>

            <nav>
                <a href="/movies">Home</a>
                <a href="/about">About</a>
                <Link href='/favorites'>Favorited</Link>
            </nav>

        </header>
    )
}