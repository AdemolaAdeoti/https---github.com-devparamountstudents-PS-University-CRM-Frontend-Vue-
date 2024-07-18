export let termsAndCondition = {
  title: "Terms and conditions",
  textOne: `Applying to Estonian universities requires acceptance of the following
        conditions: I confirm that all statements I make in my application are correct,
        truthful and completeI am aware that in compliance with the General Data
        Protection Regulation, the university has the right to receive and process my
        personal data (e.g. name, date of birth, personal identification code,
        citizenship, previous learning and contact information) in order to perform
        tasks carried out in public interests and comply with legal obligations deriving
        from the Estonian legislation.I understand and agree that the university may
        disclose the data to other bodies outside of the university for the purposes of
        verifying my identity and qualification(s). Such bodies include but are not
        limited to:prior education institution(s) the applicant has attended or
        graduated from;
        `,
  textTwo: `Estonian ENIC/NARIC Centre (http://adm.archimedes.ee/enic/en/); Estonian
        Ministry of Foreign Affairs. I am informed that written materials provided in
        support of the application must be authentic and may be subject to review for
        the purpose of identifying plagiarism.I am aware that the university reserves
        the right to withdraw or amend any offer or revoke my matriculation as a student
        of the university, if it becomes evident that the application contains
        fraudulent information, my qualification does not provide access to the chosen
        study programme or I am found to have omitted key information from the
        application. Should such circumstances occur, the
        `,
};

export let privacyPolicy = {
  title: "Privacy Policy",
  textOne: ` Estonian universities requires acceptance of the following 
  conditions: I confirm that all statements I make in my application are correct, 
  truthful and completeI am aware that in compliance with the General Data Protection 
  Regulation, the university has the right to receive and process my personal data 
  (e.g. name, date of birth, personal identification code, citizenship, previous 
      learning and contact information) in order to perform tasks carried out in 
      public interests and comply with legal obligations deriving from the Estonian 
      legislation.I understand and agree that the university may disclose the data to 
      other bodies outside of the university for the purposes of verifying my identity
       and qualification(s). Such bodies include but are not limited to:prior education 
       institution(s) the applicant has attended or graduated from;
        `,
  textTwo: `Estonian ENIC/NARIC Centre (http://adm.archimedes.ee/enic/en/); Estonian
        Ministry of Foreign Affairs. I am informed that written materials provided in
        support of the application must be authentic and may be subject to review for
        the purpose of identifying plagiarism.I am aware that the university reserves
        the right to withdraw or amend any offer or revoke my matriculation as a student
        of the university, if it becomes evident that the application contains
        fraudulent information, my qualification does not provide access to the chosen
        study programme or I am found to have omitted key information from the
        application. Should such circumstances occur, the
        `,
};

export const Students = [
  {
    id: 1,
    fullName: "Ivar Lothbrok",
    email: "ivar@vikings.com",
    avatar: require("@/assets/images/d-board/avater-1.svg"),
    country: "Scotland",
    nationalID: "318735",
    status: "Got Admissions",
    details: [
      {
        university: "Warton Üniversitesi",
        major: "Battle",
        country: "Scotland",
        submittedDate: "23-12-22",
        staus: "Progress",
        isAccepted: "Progress",
        accUniversity: "Not Available",
      },
      {
        university: "Koc Üniversitesi",
        major: "Martial Arts",
        country: "Scotland",
        submittedDate: "Progress",
        staus: "Got Admissions",
        isAccepted: "admiited",
        accUniversity: "Not Available",
      },
      {
        university: "Vikings College",
        major: "Martial Arts",
        country: "Scotland",
        submittedDate: "23-10-22",
        staus: "progress",
        isAccepted: "Not Available",
        accUniversity: "Not Available",
      },
      {
        university: "Warton Üniversitesi",
        major: "Battle",
        country: "Scotland",
        submittedDate: "23-12-22",
        staus: "Progress",
        isAccepted: "Progress",
        accUniversity: "Not Available",
      },
      {
        university: "Nail Üniversitesi",
        major: "BSc Artificial Intelligence",
        country: "Turkey",
        submittedDate: "23-10-23",
        staus: "",
        isAccepted: "Not Available",
        accUniversity: "Not Available",
      },
    ],
    documents: [
      {
        id: 1,
        text: "High School Certificates",
        size: "0.2mb",
        date: "5/07/2022",
      },
      {
        id: 2,
        text: "High School Grade MarkSheet",
        size: "4.00mb",
        date: "25/05/2022",
      },
      {
        id: 3,
        text: "Id Card",
        size: "1.00mb",
        date: "2/01/2022",
      },
      {
        id: 4,
        text: "Passport",
        size: "4.00mb",
        date: "3/07/2022",
      },
    ],
  },
  {
    id: 2,
    fullName: "Wajahat Samil",
    email: "wahajat@highschool.com",
    avatar: require("@/assets/images/d-board/john-doe.png"),
    country: "Turkey",
    nationalID: "3122735",
    status: "Nill",
    details: [
      {
        university: "Sabanci Üniversitesi",
        major: "BSc Cyber Security",
        country: "Turkey",
        submittedDate: "23-10-23",
        staus: "",
        isAccepted: "Not Available",
        accUniversity: "Not Available",
      },
    ],
    documents: [
      {
        id: 1,
        text: "High School Certificates",
        size: "0.2mb",
        date: "5/07/2022",
      },
      {
        id: 2,
        text: "High School Grade MarkSheet",
        size: "4.00mb",
        date: "25/05/2022",
      },
      {
        id: 3,
        text: "Id Card",
        size: "1.00mb",
        date: "2/01/2022",
      },
      {
        id: 4,
        text: "Passport",
        size: "4.00mb",
        date: "3/07/2022",
      },
    ],
  },
  {
    id: 3,
    fullName: "Michal Malewicz",
    email: "helloMalewicz@outlook.com",
    avatar: require("@/assets/images/d-board/avater.svg"),
    country: "Azherbaijan",
    nationalID: "318735",
    status: "Applyings",
    details: [
      {
        university: "Sabanci Üniversitesi",
        major: "BSc Cyber Security",
        country: "Turkey",
        submittedDate: "23-10-23",
        staus: "",
        isAccepted: "Not Available",
        accUniversity: "Not Available",
      },
      {
        university: "Koc Üniversitesi",
        major: "HCI",
        country: "Turkey",
        submittedDate: "nill",
        staus: "",
        isAccepted: "Not Available",
        accUniversity: "Not Available",
      },
      {
        university: "Vikings College",
        major: "Martial Arts",
        country: "Scotland",
        submittedDate: "23-10-22",
        staus: "progress",
        isAccepted: "Not Available",
        accUniversity: "Not Available",
      },
      {
        university: "Cambridge Üniversity",
        major: "BSc Cyber Security",
        country: "Uk",
        submittedDate: "23-10-23",
        staus: "Progress",
        isAccepted: "Progress",
        accUniversity: "Not Available",
      },
      {
        university: "Nail Üniversitesi",
        major: "BSc Artificial Intelligence",
        country: "Turkey",
        submittedDate: "23-10-23",
        staus: "",
        isAccepted: "Not Available",
        accUniversity: "Not Available",
      },
    ],
    documents: [
      {
        id: 1,
        text: "High School Certificates",
        size: "0.2mb",
        date: "5/07/2022",
      },
      {
        id: 2,
        text: "High School Grade MarkSheet",
        size: "4.00mb",
        date: "25/05/2022",
      },
      {
        id: 3,
        text: "Id Card",
        size: "1.00mb",
        date: "2/01/2022",
      },
      {
        id: 4,
        text: "Passport",
        size: "4.00mb",
        date: "3/07/2022",
      },
    ],
  },

  {
    id: 4,
    fullName: "Usi Anone",
    email: "usi@new.com",
    avatar: require("@/assets/images/d-board/avater-2.svg"),
    country: "Marvel",
    nationalID: "3132735",
    status: "Nill",
    details: [],
    documents: [
      {
        id: 1,
        text: "High School Certificates",
        size: "0.2mb",
        date: "5/07/2022",
      },
      {
        id: 2,
        text: "High School Grade MarkSheet",
        size: "4.00mb",
        date: "25/05/2022",
      },
      {
        id: 3,
        text: "Id Card",
        size: "1.00mb",
        date: "2/01/2022",
      },
      {
        id: 4,
        text: "Passport",
        size: "4.00mb",
        date: "3/07/2022",
      },
    ],
  },

  {
    id: 5,
    fullName: "Azeez AMos",
    email: "azeez@email.com",
    avatar: require("@/assets/images/d-board/katemoris.png"),
    country: "Nigeria",
    nationalID: "213452",
    status: "No Apply",
    details: [
      {
        university: "Nail Üniversitesi",
        major: "BSc Artificial Intelligence",
        country: "Turkey",
        submittedDate: "23-10-23",
        staus: "",
        isAccepted: "Not Available",
        accUniversity: "Not Available",
      },
      {
        university: "Sabanci University",
        major: "BSc Cyber Security",
        country: "Turkey",
        submittedDate: "23-10-23",
        staus: "",
        isAccepted: "Not Available",
        accUniversity: "Not Available",
      },
    ],
    documents: [
      {
        id: 1,
        text: "Passport",
        size: "4.00mb",
        date: "3/07/2022",
      },
      {
        id: 2,
        text: "Id Card",
        size: "1.00mb",
        date: "2/01/2022",
      },
      {
        id: 3,
        text: "High School Grade MarkSheet",
        size: "4.00mb",
        date: "25/05/2022",
      },
      {
        id: 4,
        text: "High School Certificates",
        size: "0.2mb",
        date: "5/07/2022",
      },
    ],
  },
  {
    id: 6,
    avater: "avater.svg",
    fullName: "Ajnur Bakary",
    email: "anjurbekarys@gmail.com",
    avatar: require("@/assets/images/d-board/avater-2.svg"),
    country: "Turkey",
    nationalId: 435256,
    status: "Approved",
    details: [],
    documents: [
      {
        id: 1,
        text: "High School Grade MarkSheet",
        size: "0.20mb",
        date: "25/05/2022",
      },
      {
        id: 2,
        text: "High School Certificates",
        size: "4.00mb",
        date: "8/4/2022",
      },
      {
        id: 3,
        text: "Profile Credentials",
        size: "100kb",
        date: "6/01/2022",
      },
      {
        id: 4,
        text: "Passport",
        size: "1.00mb",
        date: "5/05/2022",
      },
      {
        id: 5,
        text: "National ID Photo",
        size: "4.00mb",
        date: "25/05/2022",
      },
    ],
  },
  {
    id: 7,
    avater: "avater-2.svg",
    fullName: "Thomas kelvin",
    email: "thomass@gmail.com",
    avatar: require("@/assets/images/d-board/kamal.png"),
    country: "London",
    nationalId: 123456,
    status: "Waiting Review",
    details: [],
    documents: [
      {
        id: 1,
        text: "High School Grade MarkSheet",
        size: "1.00mb",
        date: "2/9/2021",
      },
      {
        id: 2,
        text: "High School Certificates",
        size: "0.50mb",
        date: "12/04/2021",
      },
      {
        id: 3,
        text: "Id Card",
        size: "500Kb",
        date: "9/07/2021",
      },
      {
        id: 4,
        text: "Passport",
        size: "1.00mb",
        date: "1/06/2021",
      },
      {
        id: 5,
        text: "Country ID Card",
        size: "1.00mb",
        date: "25/05/2022",
      },
    ],
  },
  {
    id: 8,
    avater: "avater.svg",
    fullName: "Okoli james",
    email: "okolithomas@gmail.com",
    avatar: require("@/assets/images/d-board/esma.png"),
    country: "Nigeria",
    nationalId: 935456,
    status: "Rejected",
    details: [],
    documents: [
      {
        id: 1,
        text: "High School Certificates",
        size: "0.2mb",
        date: "5/07/2022",
      },
      {
        id: 2,
        text: "High School Grade MarkSheet",
        size: "4.00mb",
        date: "25/05/2022",
      },
      {
        id: 3,
        text: "Id Card",
        size: "1.00mb",
        date: "2/01/2022",
      },
      {
        id: 4,
        text: "Passport",
        size: "4.00mb",
        date: "3/07/2022",
      },
    ],
  },
];

export const StudentApplications = [
  {
    id: 1,
    avater: "avater.svg",
    fullName: "Ajnur Bakary",
    email: "anjurbekarys@gmail.com",
    avatar: require("@/assets/images/d-board/avater-2.svg"),
    country: "Turkey",
    nationalId: 435256,
    status: "Approved",
    documents: [
      {
        id: 1,
        text: "High School Grade MarkSheet",
        size: "0.20mb",
        date: "25/05/2022",
      },
      {
        id: 2,
        text: "High School Certificates",
        size: "4.00mb",
        date: "8/4/2022",
      },
      {
        id: 3,
        text: "Profile Credentials",
        size: "100kb",
        date: "6/01/2022",
      },
      {
        id: 4,
        text: "Passport",
        size: "1.00mb",
        date: "5/05/2022",
      },
      {
        id: 5,
        text: "National ID Photo",
        size: "4.00mb",
        date: "25/05/2022",
      },
    ],
  },
  {
    id: 2,
    avater: "avater-2.svg",
    fullName: "Thomas kelvin",
    email: "thomass@gmail.com",
    avatar: require("@/assets/images/d-board/avater-1.svg"),
    country: "London",
    nationalId: 123456,
    status: "Waiting Review",
    documents: [
      {
        id: 1,
        text: "High School Grade MarkSheet",
        size: "1.00mb",
        date: "2/9/2021",
      },
      {
        id: 2,
        text: "High School Certificates",
        size: "0.50mb",
        date: "12/04/2021",
      },
      {
        id: 3,
        text: "Id Card",
        size: "500Kb",
        date: "9/07/2021",
      },
      {
        id: 4,
        text: "Passport",
        size: "1.00mb",
        date: "1/06/2021",
      },
      {
        id: 5,
        text: "Country ID Card",
        size: "1.00mb",
        date: "25/05/2022",
      },
    ],
  },
  {
    id: 3,
    avater: "avater.svg",
    fullName: "Okoli james",
    email: "okolithomas@gmail.com",
    avatar: require("@/assets/images/d-board/avater.svg"),
    country: "Nigeria",
    nationalId: 935456,
    status: "Rejected",
    documents: [
      {
        id: 1,
        text: "High School Certificates",
        size: "0.2mb",
        date: "5/07/2022",
      },
      {
        id: 2,
        text: "High School Grade MarkSheet",
        size: "4.00mb",
        date: "25/05/2022",
      },
      {
        id: 3,
        text: "Id Card",
        size: "1.00mb",
        date: "2/01/2022",
      },
      {
        id: 4,
        text: "Passport",
        size: "4.00mb",
        date: "3/07/2022",
      },
    ],
  },
];

export const Messages = [
  {
    sender: {
      id: 1,
      username: "Kate Morison",
      email: "katemor@gmail.com",
      imgURL: require("@/assets/images/d-board/katemoris.png"),
    },
    receivedAt: "21/05/2022",
    isRead: true,
    body: "Based on your requirements - the deadline for the final project submition is 7 Feb",
    attachments: ["screen-shot.jpg"],
  },
  {
    sender: {
      id: 2,
      username: "Dowe John",
      email: "dowejohn@example.com",
      imgURL: require("@/assets/images/d-board/john-doe.png"),
    },
    receivedAt: "21/05/2022",
    isRead: false,
    body: "Based on your requirements - the deadline for the final project submition is 7 Feb",
    attachments: ["screen-shot.jpg"],
  },
  {
    sender: {
      id: 3,
      username: "Kamal Surya",
      email: "kamal@gmail.com",
      imgURL: require("@/assets/images/d-board/avater.svg"),
    },
    receivedAt: "21/05/2022",
    isRead: true,
    body: "Based on your requirements - Lorem Ipsum fhrc ckead Jdwijd veroiersdc awdaw e fsvoer sepe",
    attachments: ["screen-shot.jpg"],
  },
];

export const Mail = {
  inbox: [
    {
      id: 1,
      username: "Kate Morison",
      email: "katemor@gmail.com",
      imgURL: require("@/assets/images/d-board/katemoris.png"),
      receivedAt: "21/05/2022",
      isRead: true,
      body: "Based on your requirements - the deadline for the final project submition is 7 Feb",
      attachments: ["screen-shot.jpg"],
    },
    {
      id: 2,
      username: "Dowe John",
      email: "dowejohn@example.com",
      imgURL: require("@/assets/images/d-board/john-doe.png"),
      receivedAt: "21/05/2022",
      isRead: false,
      body: "Based on your requirements - the deadline for the final project submition is 7 Feb",
      attachments: ["screen-shot.jpg"],
    },
    {
      id: 3,
      username: "Kamal Surya",
      email: "kamal@gmail.com",
      imgURL: require("@/assets/images/d-board/avater.svg"),
      receivedAt: "21/05/2022",
      isRead: true,
      body: "Based on your requirements - Lorem Ipsum fhrc ckead Jdwijd veroiersdc awdaw e fsvoer sepe",
      attachments: ["screen-shot.jpg"],
    },
  ],
  draft: [],
  sent: [
    {
      id: 1,
      username: "Kate Morison",
      email: "katemor@gmail.com",
      imgURL: require("@/assets/images/d-board/katemoris.png"),
      sentAt: "21/05/2022",
      subject: "Pending Approval",
      body: "Based on your requirements - the deadline for the final project submition is 7 Feb",
      attachments: ["screen-shot.jpg"],
    },
    {
      id: 2,
      username: "Dowe John",
      email: "dowejohn@example.com",
      imgURL: require("@/assets/images/d-board/john-doe.png"),
      sentAt: "2/12/2022",
      subject: "Application accepted to Univerity of France",
      body: "Based on your requirements - the deadline for the final project submition is 7 Feb",
      attachments: ["screen-shot.jpg"],
    },
    {
      id: 3,
      username: "Laravel Dell",
      email: "dell@example.com",
      imgURL: require("@/assets/images/d-board/avater.svg"),
      sentAt: "3/12/2022",
      subject: "Application accepted to Univerity of France",
      body: "Based on your requirements - the deadline for the final project submition is 7 Feb",
      attachments: ["screen-shot.jpg"],
    },
    {
      id: 4,
      username: "Isaac Newton",
      email: "isaac@nentonnetwork.com",
      imgURL: require("@/assets/images/d-board/avater.svg"),
      receivedAt: "3/12/2022",
      subject: "Electricity Request",
      body: "Based on your requirements - the deadline for the final project submition is 7 Feb",
      attachments: ["screen-shot.jpg"],
    },
  ],
  trash: [],
};

export const FAQ = [
  {
    question: "I'm having problems logging in",
    active: false,
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores perspiciatis, quibusdam enim, optio quis at ex provident minus a sapiente placeat autem esse accusantium .Quisquam sequi totam recusandae maiores amet",
  },
  {
    question: "I forget my password",
    active: false,
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores perspiciatis, quibusdam enim, optio quis at ex provident minus a sapiente placeat autem esse accusantium .Quisquam sequi totam recusandae maiores amet",
  },
  {
    question: "How can I contact paramount student support team",
    active: false,
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores perspiciatis, quibusdam enim, optio quis at ex provident minus a sapiente placeat autem esse accusantium .Quisquam sequi totam recusandae maiores amet",
  },
  {
    question: "How can I evaluate the student Document",
    active: false,
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores perspiciatis, quibusdam enim, optio quis at ex provident minus a sapiente placeat autem esse accusantium .Quisquam sequi totam recusandae maiores amet",
  },
  {
    question: "How can I track students' activity",
    active: false,
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores perspiciatis, quibusdam enim, optio quis at ex provident minus a sapiente placeat autem esse accusantium .Quisquam sequi totam recusandae maiores amet",
  },
  {
    question: "I'm having problems in Sign Up",
    active: false,
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores perspiciatis, quibusdam enim, optio quis at ex provident minus a sapiente placeat autem esse accusantium .Quisquam sequi totam recusandae maiores amet",
  },
  {
    question: "What is paramount students contact support toll free number",
    active: false,
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores perspiciatis, quibusdam enim, optio quis at ex provident minus a sapiente placeat autem esse accusantium .Quisquam sequi totam recusandae maiores amet",
  },
];

export const OurProgrammes = [
  {
    programme: "Bachelor Degree",
    active: false,
    course: "Bachelor in computer science",
  },
  {
    programme: "Master Degree",
    active: false,
    course: "Master in computer science",
  },
  {
    programme: "PHD Degree",
    active: false,
    course: "Phd IN Computer Science",
  },
  {
    programme: "Diploma",
    active: false,
    course: "Diploma in Computer Science",
  },
];
export const Chats = [
  {
    sender: {
      id: 1,
      body: "hello how are u",
      username: "Seth Hallam",
      receivedDate: "21-05-2022",
      receivedTime: "12:23pm",
      imgURL: require("@/assets/images/d-board/katemoris.png"),
    },
  },
];

export const ChatMessages = [
  {
    sender: {
      id: 1,
      body: "please i wil like to know the status of my apllication this is my apllication number",
      username: "Kate Morison",
      email: "katemor@gmail.com",
      imgURL: require("@/assets/images/d-board/avater-2.svg"),
      receivedtime: "2min ago",
    },
    isArchived: true,
    isFav: false,
    isRead: true,

    attachments: ["screen-shot.jpg"],
  },
  {
    sender: {
      id: 2,
      body: "please i wil like to know the status of my apllication this is my apllication number",
      username: "Dowe John",
      email: "dowejohn@example.com",
      imgURL: require("@/assets/images/d-board/kamal.png"),
      receivedtime: "2min ago",
    },
    isArchived: false,
    isFav: true,
    isRead: false,
    attachments: ["screen-shot.jpg"],
  },
  {
    sender: {
      id: 3,
      body: "please i wil like to know the status of my apllication this is my apllication number",
      username: "Kamal Surya",
      email: "kamal@gmail.com",
      imgURL: require("@/assets/images/d-board/avater.svg"),
      receivedtime: "2min ago",
    },
    isArchived: true,
    isFav: false,
    isRead: true,

    attachments: ["screen-shot.jpg"],
  },
  {
    sender: {
      id: 4,
      body: "please i wil like to know the status of my apllication this is my apllication number",
      username: "Kamal Surya",
      email: "kamal@gmail.com",
      imgURL: require("@/assets/images/d-board/avater-1.svg"),
      receivedtime: "2min ago",
    },
    isArchived: true,
    isFav: true,
    isRead: true,
    attachments: ["screen-shot.jpg"],
  },
  {
    sender: {
      id: 5,
      body: "please i wil like to know the status of my apllication this is my apllication number",
      username: "Kamal Surya",
      email: "kamal@gmail.com",
      imgURL: require("@/assets/images/d-board/avater.svg"),
      receivedtime: "2min ago",
    },
    isArchived: false,
    isFav: true,
    isRead: true,
    attachments: ["screen-shot.jpg"],
  },
  {
    sender: {
      id: 6,
      body: "please i wil like to know the status of my apllication this is my apllication number",
      username: "Kamal Surya",
      email: "kamal@gmail.com",
      imgURL: require("@/assets/images/d-board/esma.png"),
      receivedtime: "2min ago",
    },
    isArchived: true,
    isFav: false,
    isRead: true,
    attachments: ["screen-shot.jpg"],
  },
];

export const Programs = [
  {
    id: 1,
    courseCode: "80164",
    studyLocation: "Instabul, Turkey",
    programType: "Bachelor Degree",
    programAward: "B.Sc",
    studyLanguage: "English",
    learningMode: "On Campus",
    status: "Published",
  },
  {
    id: 2,
    courseCode: "80164",
    studyLocation: "Ankara, Turkey",
    programType: "Master Degree",
    programAward: "M.Tech",
    studyLanguage: "English",
    learningMode: "On Campus",
    status: "Not Published",
  },
  {
    id: 3,
    courseCode: "80164",
    studyLocation: "Izmir, Turkey",
    programType: "PHD Degree",
    programAward: "PHD",
    studyLanguage: "English",
    learningMode: "On Campus",
    status: "Draft",
  },
  {
    id: 4,
    courseCode: "80164",
    studyLocation: "Ankara, Turkey",
    programType: "Diploma",
    programAward: "None",
    studyLanguage: "English",
    learningMode: "Online",
    status: "Published",
  },
  {
    id: 5,
    courseCode: "80164",
    studyLocation: "Antalya, Turkey",
    programType: "Bachelor Degree",
    programAward: "B.E",
    studyLanguage: "English",
    learningMode: "On Campus",
    status: "Published",
  },
];
export const highSchools = [
  {
    id: 80164,
    name: "Turkish Grammar High School",
    registeredFirstName: "John",
    registeredLastName: "Doe",
    type: "Public High School",
    country: "Canada",
    city: "Toronto",
    address: "123 Main St",
    postalCode: "123040",
    phoneNumber: "5389281230",
    status: "Active",
    lastLogin: {
      date: "2020-01-01",
      time: "03:36 pm",
    },
    registeredDate: "2020-01-01",
    registeredEmail: "efpyi@example.com",
  },
  {
    id: 80165,
    name: "Home science secondary school",
    registeredFirstName: "John",
    registeredLastName: "Doe",
    type: "Private High School",
    country: "Canada",
    city: "Toronto",
    address: "123 Main St",
    postalCode: "123040",
    phoneNumber: "5389281230",
    status: "Active",
    lastLogin: {
      date: "2020-01-01",
      time: "03:36 pm",
    },
    registeredDate: "2020-01-01",
    registeredEmail: "efpyi@example.com",
  },
  {
    id: 80166,
    name: "Sachel Secondary High school",
    registeredFirstName: "John",
    registeredLastName: "Doe",
    type: "Private High School",
    country: "Canada",
    city: "Toronto",
    address: "123 Main St",
    postalCode: "123040",
    phoneNumber: "5389281230",
    status: "Pending",
    lastLogin: {
      date: "2020-01-01",
      time: "03:36 pm",
    },
    registeredDate: "2020-01-01",
    registeredEmail: "efpyi@example.com",
  },
  {
    id: 80167,
    name: "Waterman junior High School",
    registeredFirstName: "John",
    registeredLastName: "Doe",
    type: "Private High School",
    country: "Canada",
    city: "Toronto",
    address: "123 Main St",
    postalCode: "123040",
    phoneNumber: "5389281230",
    status: "Inactive",
    lastLogin: {
      date: "2020-01-01",
      time: "03:36 pm",
    },
    registeredDate: "2020-01-01",
    registeredEmail: "efpyi@example.com",
  },
  {
    id: 80168,
    name: "Goju senior/junior High School",
    registeredFirstName: "John",
    registeredLastName: "Doe",
    type: "Public High School",
    country: "Canada",
    city: "Toronto",
    address: "123 Main St",
    postalCode: "123040",
    phoneNumber: "5389281230",
    status: "Inactive",
    lastLogin: {
      date: "2020-01-01",
      time: "03:36 pm",
    },
    registeredDate: "2020-01-01",
    registeredEmail: "efpyi@example.com",
  },
  {
    id: 80169,
    name: "Craig High School",
    registeredFirstName: "John",
    registeredLastName: "Doe",
    type: "Private High School",
    country: "Canada",
    city: "Toronto",
    address: "123 Main St",
    postalCode: "123040",
    phoneNumber: "5389281230",
    status: "Pending",
    lastLogin: {
      date: "2020-01-01",
      time: "03:36 pm",
    },
    registeredDate: "2020-01-01",
    registeredEmail: "efpyi@example.com",
  },
  {
    id: 80170,
    name: "High School Of Waterloo",
    registeredFirstName: "John",
    registeredLastName: "Doe",
    type: "Public High School",
    country: "Canada",
    city: "Toronto",
    address: "123 Main St",
    postalCode: "123040",
    phoneNumber: "5389281230",
    status: "Pending",
    lastLogin: {
      date: "2020-01-01",
      time: "03:36 pm",
    },
    registeredDate: "2020-01-01",
    registeredEmail: "efpyi@example.com",
  },
  {
    id: 80171,
    name: "High School Of Crandall",
    registeredFirstName: "John",
    registeredLastName: "Doe",
    type: "Private High School",
    country: "Canada",
    city: "Toronto",
    address: "123 Main St",
    postalCode: "123040",
    phoneNumber: "5389281230",
    status: "Active",
    lastLogin: {
      date: "2020-01-01",
      time: "03:36 pm",
    },
    registeredDate: "2020-01-01",
    registeredEmail: "efpyi@example.com",
  },
];