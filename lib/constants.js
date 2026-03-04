// MITILENCE 2K26 Event Data
export const EVENT_DATE = "2026-03-14T09:00:00+05:30";
export const EVENT_NAME = "MITILENCE 2K26";
export const DEPARTMENT = "Department of Robotics & Automation";
export const REGISTRATION_FEE = 200;

export const CONTACT_INFO = {
    staff: {
        name: "Dr. V. Govindan",
        role: "Associate Professor & Head of the Department (HOD)",
        phone: "+91 79047 88969",
        email: "hodra@vmit.edu.in",
    },
    student: {
        name: "G. V. V. Satyanarayana",
        role: "Department of Robotics & Automation",
        phone: "+91 63039 87443",
    },
    webManager: {
        name: "G. V. V. Satyanarayana",
        role: "Website Administrator",
        phone: "+91 63039 87443",
        email: "ganisettisatish34@gmail.com",
    }
};

export const EVENTS = [
    {
        id: "robo-race",
        slug: "robo-race",
        name: "Robo Race",
        category: "Technical",
        description:
            "Build your own robot (wired or wireless) and compete to achieve the fastest time on the obstacle track. The robot must navigate through multiple challenges and reach the finish line in the shortest possible time.",
        teamSizeMin: 1,
        teamSizeMax: 2,
        fee: REGISTRATION_FEE,
        staffCoordinator: "Mr. A. Baskaran",
        staffPhone: "+91 87546 03801",
        studentCoordinator: "Saravanapandiyan S",
        studentPhone: "+91 80726 07919",
        location: "Robotics Arena - Block A",
        date: "2026-03-14",
        status: "Open",
        icon: "🏎️",
        sections: [
            {
                title: "📋 RULES & GUIDELINES",
                items: [
                    "Robot weight must not exceed 2.5 kg.",
                    "Wired robots must have sufficient cable length to cover the track.",
                    "Participants must bring their own batteries or adapters.",
                    "Robot voltage must not exceed 12V DC.",
                    "LEGO parts or ready-made kits are not allowed.",
                ],
            },
            {
                title: "🚧 TRACK OBSTACLES",
                items: [
                    "Switch bridge",
                    "Speed breakers",
                    "Marble pit",
                    "Slippery path",
                    "Rotating disc",
                    "Curve ramp down",
                ],
            },
            {
                title: "🏁 COMPETITION FORMAT",
                items: [
                    "Robots must complete the track as fast as possible.",
                    "The robot finishing in the least time wins.",
                    "If the track is not completed, the robot covering the maximum distance in minimum time wins.",
                ],
            },
            {
                title: "🏆 PRIZES",
                items: [
                    "Exciting prizes will be awarded to the winners.",
                ],
            },
            {
                title: "💳 REGISTRATION FEE",
                items: [
                    "₹200 per participant",
                    "Payment Mode: Offline Payment at the Event Venue",
                ],
            },
        ],
    },
    {
        id: "tug-of-bot",
        slug: "tug-of-bot",
        name: "Tug of Bot",
        category: "Technical",
        description:
            "Build a powerful robot that can outpull its opponent in a head-to-head tug of war. Torque, grip, and strategy matter. The ultimate test of your robot's brute strength and mechanical design.",
        teamSizeMin: 1,
        teamSizeMax: 4,
        fee: REGISTRATION_FEE,
        staffCoordinator: "Mrs. T. Sudha",
        staffPhone: "+91 97907 47395",
        studentCoordinator: "Monishwaran J",
        studentPhone: "+91 80726 07919",
        location: "Main Ground - Block B",
        date: "2026-03-14",
        status: "Open",
        icon: "🤖",
        sections: [
            {
                title: "🤖 ROBOT RULES",
                items: [
                    "Ready-made robots or LEGO kits not allowed.",
                    "Robot dimensions must be within 35 cm × 35 cm × 20 cm.",
                    "Maximum robot weight: 3 kg.",
                    "Robots must run only on 12V DC power.",
                    "220V AC power is prohibited.",
                    "Battery weight counts as part of the robot.",
                    "Robots can be wired or wireless.",
                    "Wired control length must not exceed 2 meters.",
                ],
            },
            {
                title: "⚔️ MATCH RULES",
                items: [
                    "A 1 meter nylon rope with S-hooks will be provided.",
                    "Rope must be attached to one fixed pulling point on the robot.",
                    "Matches will be conducted one-on-one.",
                    "The robot pulling the opponent across the win line wins.",
                    "Each match is best of three rounds.",
                    "Time limit per round: 2 minutes.",
                    "No human intervention allowed during the match.",
                    "Referee’s decision will be final.",
                ],
            },
            {
                title: "🏆 PRIZES",
                items: [
                    "Exciting prizes will be awarded to the winners.",
                ],
            },
            {
                title: "💳 REGISTRATION FEE",
                items: [
                    "₹200 per participant",
                    "Payment Mode: Offline Payment at the Event Venue",
                ],
            },
        ],
    },
    {
        id: "robo-soccer",
        slug: "robo-soccer",
        name: "Robo Soccer",
        category: "Technical",
        description:
            "Robo Soccer is a robotic football competition where teams control their robots to score goals against opponents. The robot must push the ball and navigate the field strategically to score maximum goals within the match time.",
        teamSizeMin: 2,
        teamSizeMax: 4,
        fee: REGISTRATION_FEE,
        staffCoordinator: "Mrs. D. Dharani",
        staffPhone: "+91 97589 42681",
        studentCoordinator: "Leshal",
        studentPhone: "+91 93455 34938",
        location: "Indoor Stadium",
        date: "2026-03-14",
        status: "Open",
        icon: "⚽",
        sections: [
            {
                title: "📋 RULES & GUIDELINES",
                items: [
                    "Only one participant is allowed to control the robot during the match.",
                    "No substitutions are allowed once the match starts.",
                    "Match duration: 3 minutes.",
                    "Robots can push or hit the ball, but grabbing or holding the ball is not allowed.",
                    "No human interference (touching the robot) is allowed during the game.",
                    "No AC or external DC power supply will be provided at the venue.",
                    "Robots must fit within 30 cm × 30 cm × 30 cm dimensions.",
                    "Maximum robot weight must not exceed 5 kg.",
                    "Participants must bring their own batteries and control systems.",
                    "Any damage to the arena equipment may result in disqualification.",
                ],
            },
            {
                title: "🏆 PRIZES",
                items: [
                    "Exciting prizes will be awarded to the winners.",
                ],
            },
            {
                title: "💳 REGISTRATION FEE",
                items: [
                    "₹200 per participant",
                    "Payment Mode: Offline Payment at the Event Venue",
                ],
            },
        ],
    },
    {
        id: "paper-presentation",
        slug: "paper-presentation",
        name: "Paper Presentation",
        category: "Technical",
        description:
            "Present your research paper on emerging technologies in robotics, AI, and automation. Showcase your innovative ideas and research findings to a panel of expert judges.",
        teamSizeMin: 1,
        teamSizeMax: 3,
        fee: REGISTRATION_FEE,
        staffCoordinator: "Dr. T. Manochandar",
        staffPhone: "+91 73732 27652",
        studentCoordinator: "Gokulavasan V",
        studentPhone: "+91 95852 28165",
        location: "Seminar Hall - Block D",
        date: "2026-03-14",
        status: "Open",
        icon: "📄",
        sections: [
            {
                title: "📋 RULES & GUIDELINES",
                items: [
                    "Participants must bring a valid college ID card.",
                    "Each team must submit an abstract before the event.",
                    "Presentation must contain 10 – 15 slides.",
                    "Presentation time: 8 minutes + 2 minutes Q&A.",
                    "Paper must be submitted in Word format.",
                    "IEEE format is preferred.",
                    "Participants should bring their presentation in a pen drive.",
                    "Plagiarism will lead to disqualification.",
                    "Judges’ decision will be final.",
                ],
            },
            {
                title: "🏆 PRIZES",
                items: [
                    "Exciting prizes will be awarded to the winners.",
                ],
            },
            {
                title: "💳 REGISTRATION FEE",
                items: [
                    "₹200 per participant",
                    "Payment Mode: Offline Payment at the Event Venue",
                ],
            },
        ],
    },
    {
        id: "ipl-auction",
        slug: "ipl-auction",
        name: "IPL Auction",
        category: "Non-Technical",
        description:
            "The IPL Auction event allows participants to act as franchise owners and build their cricket team through a live auction process. A pool of players will be available, and teams must strategically bid and assemble a balanced squad within the given constraints.",
        teamSizeMin: 2,
        teamSizeMax: 4,
        fee: 0,
        staffCoordinator: "Mr. A. Baskaran",
        staffPhone: "+91 87546 03801",
        studentCoordinator: "Madavaa K",
        studentPhone: "+91 93449 52654",
        location: "Conference Hall - Block A",
        date: "2026-03-14",
        status: "Open",
        icon: "🏏",
        sections: [
            {
                title: "📋 EVENT RULES",
                items: [
                    "A total of 250 players will be available in the auction pool.",
                    "15 teams will participate in the auction.",
                    "Each team can select a maximum of 15 players for their squad.",
                    "Teams must build a balanced Playing 11 (4 Batsmen, 4 Bowlers, 2 All-rounders, 1 Wicket Keeper).",
                    "Teams must manage their budget carefully during bidding.",
                    "Once a player is purchased, the decision cannot be reversed.",
                    "The auctioneer’s decision will be final and binding.",
                ],
            },
            {
                title: "🏆 PRIZES",
                items: [
                    "Exciting prizes will be awarded to the winners.",
                ],
            },
            {
                title: "💳 REGISTRATION FEE",
                items: [
                    "Free Registration",
                ],
            },
        ],
    },
    {
        id: "stumble-guys",
        slug: "stumble-guys",
        name: "Stumble Guys",
        category: "Non-Technical",
        description:
            "Stumble Guys is a fast-paced multiplayer knockout game where players compete in fun and chaotic obstacle courses. Participants must run, jump, dodge obstacles, and survive each round while competing against other players. The goal is to advance through each round and become the last player standing.",
        teamSizeMin: 4,
        teamSizeMax: 4,
        fee: 0,
        staffCoordinator: "Mrs. S. Ramya",
        staffPhone: "+91 90471 40019",
        studentCoordinator: "Hariharan S",
        studentPhone: "+91 80726 07919",
        location: "Gaming Zone - Block B",
        date: "2026-03-14",
        status: "Open",
        icon: "🎮",
        sections: [
            {
                title: "📋 RULES & GUIDELINES",
                items: [
                    "Each team must consist of 4 members (compulsory).",
                    "Participants must bring their own mobile phone to play the game.",
                    "The Stumble Guys game must be installed and updated before the event begins.",
                    "Players must join the custom room created by the organizers.",
                    "Stable internet connection is required to participate.",
                    "The use of hacks, mods, or unfair gameplay methods is strictly prohibited.",
                    "If a player disconnects due to network issues, the round result will stand (no replay).",
                    "Misconduct or indiscipline during the event may lead to disqualification.",
                    "The coordinator’s decision will be final in all cases.",
                ],
            },
            {
                title: "🏆 PRIZES",
                items: [
                    "Exciting prizes will be awarded to the winners.",
                ],
            },
            {
                title: "💳 REGISTRATION FEE",
                items: [
                    "Free Registration",
                ],
            },
        ],
    },
];

export const APPROVAL_STATUSES = {
    PENDING: "Pending Approval",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    CHECKED_IN: "Checked-In",
    DISQUALIFIED: "Disqualified",
};

export const STATUS_COLORS = {
    "Pending Approval": { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
    Approved: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
    Rejected: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
    "Checked-In": { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
    Disqualified: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30" },
};
