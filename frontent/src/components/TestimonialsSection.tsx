import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "./ui/button";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Full Stack Developer",
    avatar: "SC",
    rating: 5,
    feedback: "RepoReanimator helped me find my first open-source contribution. The gamification makes it so addictive!",
  },
  {
    name: "Marcus Johnson",
    role: "DevOps Engineer",
    avatar: "MJ",
    rating: 5,
    feedback: "I've revived 12 repos so far. The XP system keeps me motivated to contribute more every week.",
  },
  {
    name: "Elena Rodriguez",
    role: "Frontend Developer",
    avatar: "ER",
    rating: 5,
    feedback: "The dead repo scoring is incredibly accurate. Found amazing projects that just needed a little love.",
  },
  {
    name: "James Wilson",
    role: "Open Source Maintainer",
    avatar: "JW",
    rating: 5,
    feedback: "As a maintainer, this platform brought new life to my abandoned side projects. Truly grateful!",
  },
  {
    name: "Aisha Patel",
    role: "Software Engineer",
    avatar: "AP",
    rating: 5,
    feedback: "The community here is amazing. Got help from fellow reanimators on my first complex revival.",
  },
  {
    name: "David Kim",
    role: "Backend Developer",
    avatar: "DK",
    rating: 5,
    feedback: "Love the spooky theme! Makes contributing to open source feel like an adventure.",
  },
  {
    name: "Lisa Thompson",
    role: "Data Scientist",
    avatar: "LT",
    rating: 5,
    feedback: "Found an abandoned ML library and revived it. Now it has 500+ stars. RepoReanimator works!",
  },
  {
    name: "Alex Nguyen",
    role: "Junior Developer",
    avatar: "AN",
    rating: 5,
    feedback: "Perfect for beginners! The difficulty ratings helped me find repos I could actually contribute to.",
  },
];

export const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  const visibleTestimonials = testimonials.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="relative py-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gradient">What Reanimators Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who are already reviving the dead
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={`${currentPage}-${index}`}
              className="p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 animate-fade-in"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{testimonial.feedback}"
              </p>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" size="icon" onClick={prevPage}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentPage ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          
          <Button variant="outline" size="icon" onClick={nextPage}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
