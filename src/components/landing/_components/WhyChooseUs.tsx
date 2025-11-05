"use client";

export default function WhyChooseUs() {
  const features = [
    {
      icon: "🔄",
      title: "Exchange Skills",
      desc: "Teach what you know, learn what you don’t — simple, fun, and rewarding.",
    },
    {
      icon: "💬",
      title: "Connect & Collaborate",
      desc: "Meet like-minded students, share ideas, and grow together in your campus community.",
    },
    {
      icon: "🎯",
      title: "Grow Together",
      desc: "Real skill learning through interaction — not boring tutorials or lectures.",
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-surface text-center">
      <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-foreground mb-12">
        Why Choose <span className="text-primary">SkillSwap?</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-background rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all"
          >
            <div className="text-5xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-poppins font-semibold text-foreground mb-2">
              {f.title}
            </h3>
            <p className="text-textSecondary font-inter">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
