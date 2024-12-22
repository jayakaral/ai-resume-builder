import { ResumeValues } from "./schema.zod";

export const RESUME = {
    firstName: "Nandkishor",
    lastName: "Kumawat",
    jobTitle: "Enthusiastic Software Developer",
    email: "2021uce1590@mnit.ac.in",
    phone: "+91 9784877473",
    summary: "Enthusiastic software developer with a passion for innovation and problem-solving. Seeking opportunities to leverage skills in programming and project management to contribute effectively in a dynamic work environment.",
    workExperiences: [
        {
            description: "Engineered a comprehensive web application enabling administrators to efficiently manage database tables, including features for data addition, deletion, and Excel file upload. Integrated a robust history tracking system with advanced search, filter, and export functionalities.",
            position: "Full Stack Developer",
            company: "PropVIVO",
            startDate: "June 2024",
            endDate: "July 2024"
        },
        {
            description: "Developed a React Native mobile application with a Node.js backend to support app functionality ensuring seamless integration and optimal performance for both frontend and backend components.",
            position: "App Developer",
            company: "GramZo",
            startDate: "August 2023",
            endDate: "May 2023"
        },
        {
            description: "Collaborated with a team to design and develop a responsive website for a client, implementing a user-friendly interface and optimizing site performance. Conducted regular testing to ensure functionality across various devices and browsers.",
            position: "Web Developer",
            company: "Freelance",
            startDate: "March 2023",
            endDate: "June 2023"
        },
        {
            description: "Assisted in the development of a React-based web application, contributing to the implementation of new features and enhancements. Conducted thorough testing to identify and resolve bugs, ensuring optimal performance and user experience.",
            position: "Software Developer Intern",
            company: "TechSolutions",
            startDate: "Jan 2023",
            endDate: "Feb 2023"
        },
        {
            description: "Collaborated with a team to design and develop a responsive website for a client, implementing a user-friendly interface and optimizing site performance. Conducted regular testing to ensure functionality across various devices and browsers.",
            position: "Web Developer Intern",
            company: "WebSolutions",
            startDate: "Oct 2022",
            endDate: "Dec 2022"
        }
    ],
    educations: [
        {
            startDate: "Dec 2021",
            endDate: "June 2025",
            school: "Malaviya National Institute of Technology, Jaipur",
            degree: "BTech in Civil Engineering"
        },
        {
            startDate: "June 2021",
            endDate: "Dec 2021",
            school: "Kendriya Vidyalaya, Jaipur",
            degree: "Senior Secondary"
        },
        {
            startDate: "June 2019",
            endDate: "March 2021",
            school: "Kendriya Vidyalaya, Jaipur",
            degree: "Secondary"
        }
    ],
    skills: [
        "C", "C++", "Python", "PHP", "HTML", "CSS", "JavaScript", "TypeScript",
        "ReactJS", "NextJS", "NodeJS", "Socket.IO", "React Native", "Linux",
        "Windows", "AutoCAD", "Fusion 360", "STAAD Pro", "Word", "PowerPoint",
        "Excel", "Visual Studio Code", "PyCharm", "Atom", "MongoDB", "GitHub",
        "Azure DevOps"
    ],
    projects: [
        {
            title: "Kalyan-Hospital",
            description: "Built a hospital management system using Next.js, TypeScript, NextAuth, Prisma, and PostgreSQL. Role-based access, handling complex queries with SQL. Developed key features like appointment systems, staff management, and a medical store with filters.",
            startDate: "Oct 2024",
            endDate: undefined,
            link: "https://e-hospital.vercel.app/"
        },
        {
            title: "Kisan",
            description: "Developed a comprehensive platform for farmers, featuring services like online mandi, crop rate dashboard, AI bot assistance, transport booking, labor booking, farmer community, and land transactions.",
            startDate: "July 2024",
            endDate: "Present",
            link: "https://kisan-rouge.vercel.app/"
        },
        {
            title: "ChatWave",
            description: "Crafted a Next.js chat website facilitating real-time communication. Seamlessly connect with others through intuitive chat and call functionality.",
            startDate: "Oct 2023",
            endDate: "Dec 2023",
            link: "https://github.com/nandkishor-kumawat/chatwave-next-frontend"
        },
        {
            title: "CadWonder",
            description: "CadWonder is an interactive engineering platform offering problem-solving tools, a vast knowledge base, and a vibrant community, empowering engineers to tackle complex challenges and foster innovation in the field.",
            startDate: "Dec 2023",
            endDate: "Feb 2024",
            link: "https://cadwonder.vercel.app/"
        },
        {
            title: "ChessTune",
            description: "Developed a React Native chess application featuring multiple difficulty levels for playing against the computer, alongside engaging puzzle-solving challenges and daily puzzles.",
            startDate: "July 2023",
            endDate: "Oct 2023",
            link: "https://github.com/nandkishor-kumawat/chesstune"
        },
        {
            title: "Chess",
            description: "Created a JavaScript-based chess website enabling two-player gameplay with an intuitive interface. Implemented a feature to display possible moves for each piece upon selection, enhancing strategic gameplay.",
            startDate: "May 2023",
            endDate: "June 2023",
            link: "https://nandkishor-kumawat.github.io/chess/"
        },
        {
            title: "Portfolio",
            description: "Designed and developed a personal portfolio website using React and Tailwind CSS, showcasing projects, skills, and experience. Implemented responsive design for optimal viewing across various devices.",
            startDate: "April 2023",
            endDate: "May 2023",
            link: "https://nandkishor-kumawat.github.io/"
        },
        {
            title: "EduLearn",
            description: "Developed a comprehensive e-learning platform offering courses in various fields, enabling users to access high-quality educational content, interactive quizzes, and progress tracking features.",
            startDate: "Feb 2023",
            endDate: "March 2023",
            link: "",
        },
        {
            title: "WeatherApp",
            description: "Crafted a weather application using React Native, featuring real-time weather updates, location-based weather information, and a user-friendly interface for easy navigation and data visualization.",
            startDate: "Dec 2022",
            endDate: "Jan 2023",
            link: "",
        },
        {
            title: "Calculator",
            description: "Developed a simple calculator application using React, enabling users to perform basic arithmetic operations with a clean and intuitive user interface.",
            startDate: "Nov 2022",
            endDate: "Dec 2022",
            link: "https://nandkishor-kumawat.github.io/calculator/"
        },
        {
            title: "To-Do App",
            description: "Built a to-do application using React, featuring task management, priority settings, and task completion tracking. Implemented a user-friendly interface with drag-and-drop functionality for easy task organization.",
            startDate: "Oct 2022",
            endDate: "Nov 2022",
            link: "https://nandkishor-kumawat.github.io/todo-app/"
        },
        {
            title: "Blog",
            description: "Developed a personal blog website using Next.js, enabling users to create, edit, and publish blog posts. Implemented user authentication and authorization for secure access to blog features.",
            startDate: "Sep 2022",
            endDate: "Oct 2022",
            link: "https://nandkishor-kumawat.github.io/blog/"
        },
        {
            title: "Quiz App",
            description: "Crafted a quiz application using React, featuring multiple-choice questions, score calculation, and result display. Implemented a timer for each question to enhance user engagement and challenge.",
            startDate: "Aug 2022",
            endDate: "Sep 2022",
            link: "https://nandkishor-kumawat.github.io/quiz-app/"
        },
        {
            title: "Portfolio",
            description: "Designed and developed a personal portfolio website using React and Tailwind CSS, showcasing projects, skills, and experience. Implemented responsive design for optimal viewing across various devices.",
            startDate: "July 2022",
            endDate: "Aug 2022",
            link: "https://nandkishor-kumawat.github.io/"
        },
    ],
    title: "Resume",
    description: undefined,
    city: "Jaipur",
    country: "India",
} satisfies ResumeValues;
