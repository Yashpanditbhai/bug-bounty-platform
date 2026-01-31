const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#EDEFF1] text-xs text-[#7C7C7C]">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Bug Bounty Platform</p>

        <div className="flex flex-wrap gap-4">
          <a className="hover:text-[#FF4500] cursor-pointer">About</a>
          <a className="hover:text-[#FF4500] cursor-pointer">Programs</a>
          <a className="hover:text-[#FF4500] cursor-pointer">Guidelines</a>
          <a className="hover:text-[#FF4500] cursor-pointer">Report a Bug</a>
          <a className="hover:text-[#FF4500] cursor-pointer">Privacy</a>
        </div>

        <p className="text-[#7C7C7C]">
          Built for hackers <span className="text-[#FF4500]">🐞</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
