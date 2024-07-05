import Link from "next/link";

function HomePage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl text-primary font-bold">GPTGenius</h1>
          <p className="py-6 leading-loose text-lg">
            GPTGenius: Your AI language companion. Powered by OpenAI, it
            enhances your conversations, content creation, and more!
          </p>
          <Link href="/chat" className="btn btn-secondary">
            <button>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage
