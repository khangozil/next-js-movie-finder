import Footer from "../components/Footer";
import Header from "../components/Header";

export default function About() {
    return (
      <div className="about-container">
        <Header/>
        <h2>About Movie Finder</h2>
        <p>
          Movie Finder is a simple and powerful app designed to help movie enthusiasts find information about their favorite films. 
          With an easy-to-use search interface, users can search for movies and get details like title, poster, and a brief overview.
        </p>
  
        <h3>Features</h3>
        <ul>
          <li>🔍 Search for movies by title</li>
          <li>🎥 View movie posters and descriptions</li>
          <li>📰 Powered by The Movie Database (TMDb) API</li>
        </ul>
  
        <h3>Technology</h3>
        <p>
          This app is built using the latest version of <strong>Next.js 14</strong>, a React framework that enables server-side rendering, 
          API routes, and static generation. It utilizes the TMDb API to fetch movie data and is styled with global CSS for consistency.
        </p>
  
        <h3>How to Use</h3>
        <p>
          Simply enter a movie title into the search bar on the homepage, and the app will fetch and display information about the movie, 
          including the poster, title, and description.
        </p>
  
        <h3>Disclaimer</h3>
        <p>
          Movie Finder is an educational project. All movie data is sourced from TMDb, and Movie Finder is not affiliated with or endorsed by TMDb.
        </p>
        <Footer/>
      </div>
    );
  }
  