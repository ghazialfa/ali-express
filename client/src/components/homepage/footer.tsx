export function Footer() {
  return (
    <>
      <img src="/footer.jpg" />
      <footer className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <p>© 2023 Your Company Name. All rights reserved.</p>
          <div className="flex items-center">
            <a
              href="https://github.com/your-github-username"
              target="_blank"
              rel="noopener noreferrer">
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"></svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
