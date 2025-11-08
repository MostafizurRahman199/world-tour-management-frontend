interface TeamMemberProps {
  image?: string;
  initial: string;
  name: string;
  role: string;
  expertise: string[];
  experience: string;
  description: string;
}

const TeamMember = ({ image, initial, name, role, expertise, experience, description }: TeamMemberProps) => (
  <div className="text-center group">
    <div className="relative mb-6">
      {/* Simple Image Container */}
      <div className="w-32 h-32 mx-auto relative">
        <div className="w-full h-full bg-gradient-to-br from-[#8F87F1] to-[#C68EFD] rounded-full flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            initial
          )}
        </div>

        {/* Experience Badge */}
        <div className="z-10 absolute -top-2 -right-2 bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] text-white text-xs px-3 py-1 rounded-full font-medium">
          {experience}
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-[#8F87F1] transition-all duration-300"></div>
      </div>
    </div>

    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
    <p className="text-[#8F87F1] font-medium mb-3">{role}</p>

    {/* Expertise Tags */}
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {expertise.map((skill, index) => (
        <span
          key={index}
          className="!bg-[#8F87F1] text-white text-xs px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700"
        >
          {skill}
        </span>
      ))}
    </div>

    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default TeamMember;
