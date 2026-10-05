import type { Dictionary } from "./ka"

/** Typed as `Dictionary`, so a missing key fails the build. */
export const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    clients: "Clients",
    methodology: "Methodology",
    contact: "Contact",
    mainNavLabel: "Main navigation",
    mobileNavLabel: "Mobile navigation",
    openMenu: "Open menu",
    menu: "Menu",
    skipToContent: "Skip to main content",
    homePageLabel: "home page",
  },
  language: { switchLabel: "Change language", ka: "ქართული", en: "English" },
  cta: {
    consult: "Get a consultation",
    freeConsult: "Free consultation",
    allServices: "All services",
    allClients: "All clients",
    learnMore: "Learn more",
    contactUs: "Contact us",
    writeWhatsApp: "Message us on WhatsApp",
    whatsappContact: "Message us on WhatsApp",
    requestConsultation: "Request a consultation",
    requestQuote: "Request a quote",
    fullProcess: "Full process",
    detailPage: "Detail page",
    viewDetails: "View details",
  },
  form: {
    name: "Name",
    fullName: "Full name *",
    company: "Company",
    phone: "Phone",
    phoneRequired: "Phone *",
    email: "Email",
    projectType: "Project type",
    projectTypeRequired: "Project type *",
    projectTypePlaceholder: "Choose a category",
    projectTypeOther: "Other / not sure yet",
    message: "Message",
    messageRequired: "Message *",
    namePlaceholder: "Nino Kapanadze",
    companyPlaceholder: "Example LLC",
    messagePlaceholder: "Briefly describe the site, area, location and preferred timeline.",
    submit: "Send",
    sending: "Opening…",
    sent: "Opened",
    sendViaWhatsApp: "Send via WhatsApp",
    required: "This field is required",
    invalidEmail: "Invalid email address",
    invalidPhone: "Invalid phone number",
    successTitle: "Enquiry sent",
    successBody: "We will get back to you shortly.",
    nameTooShort: "Enter a name (at least 2 characters)",
    nameTooLong: "Name is too long",
    companyTooLong: "Company name is too long",
    phoneTooShort: "Enter a valid phone number",
    phoneTooLong: "Number is too long",
    phoneInvalidChars: "Number may contain only digits and the symbols + ( ) -",
    emailInvalid: "Enter a valid email address",
    projectTypeRequiredMessage: "Choose a project type",
    messageTooShort: "Describe the project (at least 10 characters)",
    messageTooLong: "Text is too long",
    popupBlocked: "Your browser blocked the new window. Try the link below instead.",
    whatsappOpening: "Opening WhatsApp — the message is already filled in.",
    liveStatusSending: "Opening WhatsApp",
    liveStatusSent: "WhatsApp opened, message filled in",
    disclaimer:
      "Clicking the button opens WhatsApp with the message already filled in — you can edit it before sending. We do not store your data on our server.",
  },
  whatsapp: {
    enquiryHeading: "New enquiry — greenwise.ge",
    name: "Name",
    company: "Company",
    phone: "Phone",
    email: "Email",
    projectType: "Project type",
    messageLabel: "Message",
    quickMessage:
      "Hello! I would like a consultation on environmental services.",
  },
  sections: {
    servicesHeading: "Services",
    whatItCovers: "What it covers",
    whyNeeded: "Why you need it",
    audience: "Who it is for",
    deliverable: "Deliverable",
    duration: "Duration",
    description: "Description",
    howItWorks: "How it works",
    otherServices: "Other services",
  },
  footer: {
    rights: "All rights reserved",
    workingHours: "Working hours",
    address: "Address",
    description:
      "Environmental studies and documentation that regulators approve on first submission.",
    servicesHeading: "Services",
    companyHeading: "Company",
    contactHeading: "Contact",
    taxId: "Reg. no. 4•••••••••",
  },
  home: {
    heroTitle: "Environmental documentation that speeds up your permit",
    heroAccent: "speeds up your permit",
    heroBody:
      "Biodiversity assessment, tree inventory, dendrological expertise and forest restoration — studies grounded in field data.",
    whyEyebrow: "Why GREENWISE",
    whyTitle: "Studies that speed up your permit",
    whyAccent: "speed up your permit",
    whyDescription:
      "An environmental document stalls on two things: incomplete data and the wrong format. Preventing both is our job.",
    reasonRegulatorTitle: "In the regulator's format",
    reasonRegulatorBody:
      "We prepare the document in the structure the authority expects — which is why the study passes on first submission.",
    reasonRegulatorLink: "How we work",
    reasonDataTitle: "Verifiable field data",
    reasonDataBody:
      "Behind every finding stands a GPS coordinate, photographic record and GIS database, which you receive too.",
    reasonDataLink: "Tree inventory",
    reasonPriceTitle: "Fixed timeline and price",
    reasonPriceBody:
      "Once the scope of work is agreed, the timeline and the cost no longer change.",
    reasonPriceLink: "Get a proposal",
    aboutEyebrow: "About us",
    aboutCta: "About the company",
    aboutExperienceHeading: "13 years of field experience",
    aboutTeamPhotoAlt: "The GREENWISE team at work in the field",
    servicesTitle: "Four disciplines, one accountable team",
    servicesAccent: "one accountable team",
    servicesDescription:
      "Each service works on its own or as part of a wider package — depending on what your project's permit requires.",
    methodologyEyebrow: "Methodology",
    methodologyTitle: "A transparent process — from the first call to the document",
    methodologyAccent: "from the first call to the document",
    clientsEyebrow: "Clients",
    clientsTitle: "Trusted by developers, municipalities and ",
    clientsAccent: "international organisations",
    missionNumberOneTitle: "Our mission",
    missionNumberOneBody:
      "To give the client an environmental study that both satisfies the regulator's requirements and is genuinely useful for planning the project — not merely something for the file.",
    missionNumberTwoTitle: "Our vision",
    missionNumberTwoBody:
      "That the environmental document in Georgia becomes an instrument of decision-making — data-driven, verifiable and trusted enough that a project is changed on the strength of it.",
  },
  ctaBand: {
    defaultTitle: "Plan your project",
    defaultAccent: "without delays",
    defaultDescription:
      "Send us a brief description of the project — we will tell you which study is mandatory, in what timeframe and at what cost.",
  },
  about: {
    eyebrow: "About us",
    title: "A team that translates environmental risk into numbers",
    description:
      "Since 2012 we have prepared studies that regulators accept and clients use to plan their projects.",
    missionLabel: "Mission",
    historyEyebrow: "Experience",
    historyTitle: "How we grew",
    historyDescription:
      "The company's history in brief — from founding to multi-year restoration programmes.",
    teamEyebrow: "Team",
    teamTitle: "The specialists who work on your project",
    teamDescription:
      "Every project has a responsible expert whom you deal with directly.",
    certificationsEyebrow: "Licences and certifications",
    certificationsTitle: "Official recognition",
    certificationsDescription:
      "Our findings rest on accredited methodology and certified expertise.",
    metaTitle: "About us",
    metaDescription:
      "GREENWISE — an environmental consulting company with 13+ years of experience. Meet our mission, team, track record and certifications.",
  },
  services: {
    eyebrow: "Services",
    title: "Environmental studies and expertise",
    description:
      "Four core disciplines covering your project's environmental requirements, from planning through to post-permit monitoring.",
    detailEyebrow: "Service",
    metaTitle: "Services",
    metaDescription:
      "Biodiversity assessment, tree inventory and cadastre, dendrological expertise and forest restoration — GREENWISE environmental services.",
  },
  methodology: {
    eyebrow: "Methodology",
    title: "How the process works",
    description:
      "Four stages, each with a fixed timeline and a concrete deliverable. No ambiguity about where the project stands.",
    deliverableLabel: "Deliverable: ",
    gisPhotoAlt: "Recording field data into a GIS database",
    gisTitle: "Data that outlasts the project",
    gisBody:
      "You receive the data collected in the field stage in GIS format — it stays with you after the document is delivered and is useful for planning the stages that follow.",
    ctaTitle: "Start with the first stage",
    ctaDescription:
      "The initial consultation is free and tells you exactly which study is mandatory for your permit.",
    metaTitle: "Methodology",
    metaDescription:
      "The GREENWISE working process: initial consultation, site assessment, field work and documentation — with timelines and deliverables.",
  },
  clients: {
    eyebrow: "Clients",
    title: "Who we work with",
    description:
      "More than 240 completed projects with private developers, municipalities, donor organisations and architectural practices.",
    noteDevelopers:
      "Environmental documentation and tree cadastre for residential and commercial projects.",
    noteMunicipalities:
      "Dendrological audits, inventory and planting plans for public spaces.",
    noteNgos:
      "Biodiversity studies and monitoring of restoration programmes.",
    noteArchitects:
      "Early involvement, so the design can be fitted around valuable trees.",
    confidentialityNote:
      "Some projects are covered by confidentiality agreements, so not every client appears in this list. On request we will provide references for relevant experience.",
    ctaTitle: "Would you like to discuss a similar project?",
    ctaDescription:
      "Tell us what kind of site you are working on — we will share relevant experience and likely timelines.",
    metaTitle: "Clients",
    metaDescription:
      "Developers, municipalities, non-governmental organisations and architectural practices that GREENWISE works with.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Request a consultation",
    description:
      "Describe your project — within one working day we will tell you which study is mandatory, in what timeframe and at what cost.",
    formHeading: "Fill in the form",
    formNote:
      "Once the fields are filled in, the message is composed automatically in WhatsApp.",
    directHeading: "Direct contact",
    whatsappDirect: "Message us directly on WhatsApp",
    mapHeading: "Office location on the map",
    mapTitle: "office location",
    metaTitle: "Contact",
    metaDescription:
      "Get in touch with GREENWISE — request a free consultation on environmental studies. Phone, email, address and WhatsApp.",
  },
  meta: {
    homeTitle:
      "Environmental consulting — biodiversity, dendrology, forest restoration",
    homeDescription:
      "GREENWISE prepares biodiversity assessments, tree inventories and cadastres, dendrological expertise and forest restoration projects. Documentation grounded in field data, for EIA and permitting.",
    keywords: [
      "biodiversity assessment",
      "tree inventory",
      "tree cadastre",
      "dendrology",
      "forest restoration",
      "environmental impact assessment",
      "environmental consulting",
      "ecological expertise",
    ],
    addressLocality: "Tbilisi",
    ogImageHeadline: "Environmental consulting, biodiversity & tree cadastre",
  },
  error: {
    notFoundTitle: "Page not found",
    notFoundBody: "The link may have changed or the page may have been removed. Return home or browse our services.",
    genericTitle: "Something went wrong",
    genericBody: "Something went wrong while loading the page. Try again or contact us directly.",
    backHome: "Back to home",
    viewServices: "View services",
    retry: "Try again",
  },
}
