const Footer = () => {
  return (
    <footer className="bg-gray-50 border border-gray-200 text-xs text-gray-600">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Bug Bounty Platform</p>

        <div className="flex flex-wrap gap-4">
          <a className="hover:text-gray-900">About</a>
          <a className="hover:text-gray-900">Programs</a>
          <a className="hover:text-gray-900">Guidelines</a>
          <a className="hover:text-gray-900">Report a Bug</a>
          <a className="hover:text-gray-900">Privacy</a>
        </div>

        <p className="text-gray-500">Built for hackers 🐞</p>
      </div>
    </footer>
  );
};

export default Footer;
