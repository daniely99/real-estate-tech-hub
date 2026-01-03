const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30 py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="text-lg font-bold text-foreground">
              The Real Estate Directory
            </span>
            <p className="text-sm text-muted-foreground">
              Curating the best tools for real estate professionals.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              About
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Contact
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} The Real Estate Directory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
