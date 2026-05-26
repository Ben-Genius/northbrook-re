export interface Project {
  slug: string
  title: string
  partner?: string
  description: string
  services: string[]
  gallery?: string[]
}

export const projects: Project[] = [
  {
    slug: "geophysical-fugro-rina",
    title: "Geophysical Campaign with Fugro & Rina",
    partner: "Fugro · Rina",
    description:
      "Partnering with Fugro and Rina, North-Brook facilitated a large-scale geophysical campaign using the vessel JP 88 Stork. We delivered comprehensive vessel and logistics support, managing clearances, crew rotations, offshore supply delivery, and port coordination for the full duration of the survey. Mobilised on schedule, zero operational downtime.",
    services: ["Vessel provision", "Logistics support services"],
    gallery: [
      "/images/projects/geophysical-fugro-rina/1.jpg",
      "/images/projects/geophysical-fugro-rina/2.jpg",
      "/images/projects/geophysical-fugro-rina/3.jpg",
      "/images/projects/geophysical-fugro-rina/4.jpg",
    ],
  },
  {
    slug: "borr-drilling",
    title: "Borr Drilling Campaign",
    partner: "Borr Drilling",
    description:
      "North-Brook served as Borr Drilling's sole Ghanaian logistics partner for the duration of the offshore drilling campaign, managing supply vessel clearances, onshore warehousing, crew coordination, and regulatory compliance. Full onshore-offshore integration, zero delays.",
    services: ["Local partner support", "Complete logistics services"],
    gallery: [
      "/images/projects/borr-drilling/1.jpg",
      "/images/projects/borr-drilling/2.jpg",
      "/images/projects/borr-drilling/3.jpg",
      "/images/projects/borr-drilling/4.jpg",
    ],
  },
  {
    slug: "safeen-argus-2",
    title: "Vessel Agency: Safeen Argus 2",
    partner: "Safeen",
    description:
      "North-Brook acted as the main vessel agency for Safeen Argus 2, handling all port formalities and ensuring seamless vessel turnaround. We supplied provisions and managed documentation to keep operations running without delays.",
    services: [
      "Main vessel agency services",
      "Inward/outward vessel clearance",
      "Material supply & provision",
      "Port documentation & formalities",
    ],
    gallery: [
      "/images/projects/safeen-argus-2/1.jpg",
      "/images/projects/safeen-argus-2/2.jpg",
      "/images/projects/safeen-argus-2/3.jpg",
    ],
  },
  {
    slug: "luna-nelle",
    title: "Vessel Agency: Luna Nelle",
    description:
      "North-Brook provided vessel agency services to Luna Nelle, covering clearance, supplies, and port documentation. Our involvement ensured smooth harbour operations and compliance with local requirements.",
    services: ["Vessel agency services"],
    gallery: [
      "/images/projects/luna-nelle/1.jpg",
      "/images/projects/luna-nelle/2.jpg",
      "/images/projects/luna-nelle/3.jpg",
      "/images/projects/luna-nelle/4.jpg",
    ],
  },
  {
    slug: "saipem-dvd-santorini",
    title: "Drilling Campaign: SAIPEM DVD & Santorini",
    partner: "Saipem",
    description:
      "North-Brook partnered with Saipem to deliver local logistics support for the DVD and Santorini drilling rigs. Our deep experience with drilling campaigns enabled efficient coordination and seamless execution of all in-country logistics requirements across both rigs simultaneously.",
    services: ["Local partner services", "Full logistics support"],
    gallery: [
      "/images/projects/saipem-dvd-santorini/1.jpg",
      "/images/projects/saipem-dvd-santorini/2.jpg",
      "/images/projects/saipem-dvd-santorini/3.jpg",
    ],
  },
  {
    slug: "geotechnical-rina",
    title: "Geotechnical Campaign with Rina",
    partner: "Rina",
    description:
      "North-Brook supported Rina's offshore geotechnical survey by providing the vessel Dolphins along with full logistics, freight forwarding, and customs clearance. Our role ensured smooth execution and timely mobilisation for the campaign.",
    services: [
      "Vessel Dolphins at sea",
      "Logistics team operations",
      "Freight forwarding",
      "Customs clearance",
    ],
    gallery: [
      "/images/projects/geotechnical-rina/1.jpg",
      "/images/projects/geotechnical-rina/2.jpg",
      "/images/projects/geotechnical-rina/3.jpg",
    ],
  },
  {
    slug: "saipem-risers",
    title: "Riser Operations: SAIPEM",
    partner: "Saipem",
    description:
      "North-Brook was entrusted by Saipem to offload risers from vessel and manage their storage at the port. This project showcased our ability to handle specialised offshore equipment with precision coordinating with port authorities and ensuring every unit was accounted for and securely stowed.",
    services: [
      "Offloading risers from vessel",
      "Storage management at port",
      "Coordination with port authorities",
    ],
    gallery: [
      "/images/projects/saipem-risers/1.jpg",
      "/images/projects/saipem-risers/2.jpg",
      "/images/projects/saipem-risers/3.jpg",
      "/images/projects/saipem-risers/4.jpg",
    ],
  },
  {
    slug: "ametrine-valor",
    title: "Vessel Agency: Ametrine Valor",
    description:
      "Acting as the vessel agent for Ametrine Valor, North-Brook managed all port documentation, clearance, and supplies. Our support during equipment loading ensured smooth operations and compliance with all regulatory requirements.",
    services: [
      "Vessel agency services",
      "Loading support & coordination",
      "Port documentation & clearance",
    ],
    gallery: [
      "/images/projects/ametrine-valor/1.jpg",
      "/images/projects/ametrine-valor/2.jpg",
      "/images/projects/ametrine-valor/3.jpg",
    ],
  },
  {
    slug: "jp88-stork-manpower",
    title: "Manpower Solutions: JP 88 Stork",
    description:
      "For the JP 88 Stork, North-Brook delivered end-to-end manpower solutions, recruiting qualified professionals, managing deployment logistics, and ensuring all onboard safety standards were maintained. Our tailored approach reduced downtime and maximised operational efficiency.",
    services: [
      "Recruitment of qualified professionals",
      "Rigorous training & certification",
      "Deployment tailored to project requirements",
      "Onboard safety & performance assurance",
    ],
    gallery: [
      "/images/projects/jp88-stork-manpower/1.jpg",
      "/images/projects/jp88-stork-manpower/2.jpg",
      "/images/projects/jp88-stork-manpower/3.jpg",
      "/images/projects/jp88-stork-manpower/4.jpg",
    ],
  },
  {
    slug: "eni-borr-drilling",
    title: "ENI / Borr Drilling Campaign",
    partner: "ENI · Borr Drilling",
    description:
      "North-Brook coordinated a complex multi-operator logistics programme supporting the joint ENI and Borr Drilling offshore drilling campaign in Ghanaian waters. Managing supply vessel clearances, rig provisioning, and integrated onshore-offshore supply chain operations across two simultaneous operator schedules required precision coordination and deep local authority relationships, both of which North-Brook delivered without incident.",
    services: [
      "Rig & supply vessel clearance",
      "Offshore supply vessel provision",
      "Warehousing & storage solutions",
      "Trucking & transportation",
      "Freight & logistics management",
      "Regulatory & compliance support",
      "Integrated supply chain coordination",
    ],
    gallery: [
      "/images/projects/eni-borr-drilling/1.jpg",
      "/images/projects/eni-borr-drilling/2.jpg",
      "/images/projects/eni-borr-drilling/3.jpg",
      "/images/projects/eni-borr-drilling/4.jpg",
    ],
  },
  {
    slug: "vessel-langery",
    title: "Agency to Vessel Langery",
    description:
      "North-Brook served as the port agent for vessel Langery during its call at Tema Port, managing all inward and outward clearances, coordinating cargo operations with the port authority, and ensuring crew welfare requirements were met on schedule.",
    services: ["Inward & outward clearance", "Port authority coordination", "Crew welfare support"],
    gallery: [
      "/images/projects/vessel-langery/1.jpg",
      "/images/projects/vessel-langery/2.jpg",
    ],
  },
  {
    slug: "akrake-operations",
    title: "Akrake Operations",
    description:
      "North-Brook provided vessel agency, port coordination, and logistics support services for the Akrake operations in Ghanaian waters. Our team managed all customs formalities, equipment handling, and local authority liaison to ensure the campaign mobilised on schedule and operated without disruption.",
    services: [
      "Vessel agency services",
      "Customs & port formalities",
      "Equipment logistics coordination",
      "Local authority liaison",
    ],
    gallery: [
      "/images/projects/akrake-operations/1.jpg",
      "/images/projects/akrake-operations/2.jpg",
      "/images/projects/akrake-operations/3.jpg",
      "/images/projects/akrake-operations/4.jpg",
    ],
  },
  {
    slug: "geophysical-agency",
    title: "Geophysical Provision of Agency",
    description:
      "Acting as the sole local agent for a dedicated geophysical survey campaign, North-Brook handled all vessel clearances, managed onshore logistics for survey equipment, and coordinated crew rotations to keep the operation running without interruption.",
    services: [
      "Vessel agency services",
      "Survey equipment logistics",
      "Crew rotation coordination",
      "Port clearance management",
    ],
    gallery: [
      "/images/projects/geophysical-agency/1.jpg",
      "/images/projects/geophysical-agency/2.jpg",
      "/images/projects/geophysical-agency/3.jpg",
      "/images/projects/geophysical-agency/4.jpg",
    ],
  },
  {
    slug: "bourbon-liberty-311",
    title: "Lifeboat Services: Bourbon Liberty 311",
    description:
      "Our team of lifeboat engineers delivered expert services for the lifeboat equipment onboard vessel Bourbon Liberty 311, ensuring all systems remained functional, efficient, and compliant. We conducted thorough assessments, provided recommendations, and executed renewal work with precision.",
    services: [
      "Lifeboat equipment assessment",
      "System testing & certification",
      "Renewal & maintenance",
      "Compliance documentation",
    ],
    gallery: [
      "/images/projects/bourbon-liberty-311/1.jpg",
      "/images/projects/bourbon-liberty-311/2.jpg",
    ],
  },
  {
    slug: "bgp-prospector",
    title: "Fire Fighting & Lifeboat Services: BGP Prospector",
    partner: "BGP",
    description:
      "North-Brook delivered specialised fire fighting and lifeboat services aboard the BGP Prospector, ensuring all safety-critical systems were inspected, serviced, and certified to international standards. Our engineers carried out functional testing, renewal works, and compliance documentation to keep the vessel mission-ready without operational interruption.",
    services: [
      "Fire fighting equipment servicing",
      "Lifeboat inspection & certification",
      "System testing & renewal",
      "Compliance documentation",
    ],
  },
  {
    slug: "eastern-tulip",
    title: "Vessel Agency: Eastern Tulip",
    description:
      "North-Brook acted as vessel agent for the Eastern Tulip during its call in Ghanaian waters, handling all inward and outward clearances, port documentation, supplies, and crew coordination. Our local authority relationships and seamless port handling ensured a fast turnaround with zero compliance issues.",
    services: [
      "Vessel agency services",
      "Inward/outward clearance",
      "Port documentation & formalities",
      "Material supply & provisioning",
    ],
  },
  {
    slug: "bourbon-evolution-802",
    title: "Lifting Equipment Inspection: Bourbon Evolution 802",
    partner: "Bourbon",
    description:
      "North-Brook delivered comprehensive lifting equipment inspection services aboard the Bourbon Evolution 802, certifying cranes, slings, shackles, and load-bearing assemblies against offshore standards. Our certified inspectors carried out load testing, NDT verification, and full compliance documentation to keep the vessel safely operational.",
    services: [
      "Lifting gear inspection & certification",
      "Load testing & NDT verification",
      "Crane & rigging assessment",
      "Compliance documentation",
    ],
  },
]
