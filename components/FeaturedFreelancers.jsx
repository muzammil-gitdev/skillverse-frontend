import FreelancerCard from "./FreelancerCard";

export default function FeaturedFreelancers() {
    const freelancers = [
        {
            name: "Ayesha Khan",
            title: "Full-Stack Developer",
            location: "San Francisco, CA",
            rating: 4.9,
            reviews: 127,
            skills: ["React", "Node.js", "Python"],
            description: "Experienced developer with 6+ years building scalable web applications.",
            projects: 89,
            responseTime: "1 hour",
            rate: "$85",
        },
        {
            name: "Yasin Jatoi",
            title: "UI/UX Designer",
            location: "New York, NY",
            rating: 4.8,
            reviews: 203,
            skills: ["Figma", "Adobe XD", "Prototyping"],
            description: "Creative designer specializing in user-centered design and brand identity.",
            projects: 156,
            responseTime: "2 hours",
            rate: "$75",
        },
        {
            name: "Ali Raza",
            title: "Content Writer",
            location: "London, UK",
            rating: 5.0,
            reviews: 94,
            skills: ["SEO Writing", "Copywriting", "Research"],
            description: "Professional writer creating engaging content that drives results.",
            projects: 78,
            responseTime: "30 min",
            rate: "$45",
        },
        {
            name: "M.Javaid",
            title: "Digital Marketer",
            location: "Toronto, CA",
            rating: 4.7,
            reviews: 156,
            skills: ["Google Ads", "Facebook Ads", "Analytics"],
            description: "Growth-focused marketer with proven track record of increasing ROI.",
            projects: 112,
            responseTime: "1 hour",
            rate: "$65",
        },
    ];

    return (
        <section id="featured" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Featured Freelancers
                    </h2>
                    <p className="text-lg text-gray-600">
                        Work with top-rated professionals
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {freelancers.map((freelancer, index) => (
                        <FreelancerCard key={index} freelancer={freelancer} />
                    ))}
                </div>
            </div>
        </section>
    );
}
