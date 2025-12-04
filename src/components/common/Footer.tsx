export default function Footer() {
  return (
    <footer className="relative mt-20 bg-surface/50 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-poppins font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              SkillSwap
            </h3>
            <p className="text-muted-foreground max-w-sm">
              Connect, learn, and grow with peers on your campus. The ultimate platform for student skill exchange.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Browse Skills</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Find Tutors</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">How it Works</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Guidelines</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Join Discord</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-center text-sm text-muted-foreground">
          <p>© 2025 SkillSwap. Built with 💻 & 🎨 by TechQuartet.</p>
        </div>
      </div>
    </footer>
  );
}
