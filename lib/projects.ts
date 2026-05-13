export interface Project {
  slug: string
  title: string
  partner?: string
  description: string
  services: string[]
}

export const projects: Project[] = [
  {
    slug: "geophysical-fugro-rina",
    title: "Geophysical Campaign with Fugro & Rina",
    partner: "Fugro · Rina",
    description:
      "Vessel JP 88 Stork. Campaign partners Fugro and Rina. North-Brook managed vessel clearances, crew rotations, offshore supply delivery, and port coordination for the full duration of the geophysical survey. Mobilised on schedule, zero operational downtime.",
    services: ["Vessel provision", "Logistics support services"],
  },
  {
    slug: "borr-drilling",
    title: "Borr Drilling Campaign",
    partner: "Borr Drilling",
    description:
      "North-Brook served as Borr Drilling's sole Ghanaian logistics partner for the duration of the offshore drilling campaign — managing supply vessel clearances, onshore warehousing, crew coordination, and regulatory compliance. Full onshore-offshore integration, zero delays.",
    services: ["Local partner support", "Complete logistics services"],
  },
  {
    slug: "safeen-argus-2",
    title: "Vessel Agency: Safeen Argus 2",
    partner: "Safeen",
    description:
      "North-Brook acted as the main vessel agency for Safeen Argus 2, handling all port formalities and ensuring seamless vessel turnaround. We also supplied provisions and managed documentation to keep operations running without delays.",
    services: [
      "Main vessel agency services",
      "Inward/outward vessel clearance",
      "Material supply & provision",
      "Port documentation & formalities",
    ],
  },
  {
    slug: "luna-nelle",
    title: "Vessel Agency: Luna Nelle",
    description:
      "North-Brook provided vessel agency services to Luna Nelle, covering clearance, supplies, and port documentation. Our involvement ensured smooth harbour operations and compliance with local requirements.",
    services: ["Vessel agency services"],
  },
  {
    slug: "saipem-dvd-santorini",
    title: "Drilling Campaign: SAIPEM DVD & Santorini",
    partner: "Saipem",
    description:
      "North-Brook partnered with Saipem to deliver logistics support for the DVD and Santorini rigs. Our experience with drilling campaigns enabled efficient coordination and execution of all local logistics requirements.",
    services: ["Local partner services", "Full logistics support"],
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
  },
  {
    slug: "saipem-risers",
    title: "Riser Operations: SAIPEM",
    partner: "Saipem",
    description:
      "North-Brook was entrusted by Saipem to offload risers and manage their storage at the port. This project showcased our ability to handle specialised offshore equipment with efficiency and precision.",
    services: [
      "Offloading risers from vessel",
      "Storage management at port",
      "Coordination with port authorities",
    ],
  },
  {
    slug: "ametrine-valor",
    title: "Vessel Agency: Ametrine Valor",
    description:
      "Acting as the vessel agent for Ametrine Valor, North-Brook managed all port documentation, clearance, and supplies. Our support during equipment loading ensured smooth operations and compliance with regulatory processes.",
    services: [
      "Vessel agency services",
      "Loading support & coordination",
      "Port documentation & clearance",
    ],
  },
  {
    slug: "jp88-stork-manpower",
    title: "Manpower Solutions: JP 88 Stork",
    description:
      "Skilled personnel shortages pose one of the biggest risks to vessel performance. For the JP 88 Stork, North-Brook delivered end-to-end manpower solutions, ensuring seamless operations and high safety standards. Our tailored approach reduced downtime and maximised efficiency onboard.",
    services: [
      "Recruitment of qualified professionals",
      "Rigorous training & certification",
      "Deployment tailored to project requirements",
      "Onboard safety & performance assurance",
    ],
  },
  {
    slug: "eni-borr-drilling",
    title: "ENI / Borr Drilling Campaign",
    partner: "ENI · Borr Drilling",
    description:
      "North-Brook coordinated a complex multi-operator logistics programme supporting the joint ENI and Borr Drilling offshore drilling campaign in Ghanaian waters. Managing supply vessel clearances, rig provisioning, and integrated onshore-offshore supply chain operations across two simultaneous operator schedules required precision coordination and deep local authority relationships — both of which North-Brook delivered without incident.",
    services: [
      "Rig & supply vessel clearance",
      "Offshore supply vessel provision",
      "Warehousing & storage solutions",
      "Trucking & transportation",
      "Freight & logistics management",
      "Regulatory & compliance support",
      "Integrated supply chain coordination",
    ],
  },
  {
    slug: "vessel-langery",
    title: "Agency to Vessel Langery",
    description:
      "North-Brook served as the port agent for vessel Langery during its call at Tema Port, managing all inward and outward clearances, coordinating cargo operations with the port authority, and ensuring crew welfare requirements were met on schedule.",
    services: ["Inward & outward clearance", "Port authority coordination", "Crew welfare support"],
  },
  {
    slug: "geotechnical-agency",
    title: "Geotechnical Provision of Agency",
    description:
      "North-Brook provided full vessel agency and port coordination services for an offshore geotechnical survey campaign. Our team managed customs formalities, equipment logistics, and local authority liaison to ensure the campaign mobilised on schedule.",
    services: [
      "Vessel agency services",
      "Customs & port formalities",
      "Equipment logistics coordination",
      "Local authority liaison",
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
  },
  {
    slug: "bourbon-liberty-311",
    title: "Fire-fighting Services: Bourbon Liberty 311",
    description:
      "Our team of fire-fighting engineers delivered expert services for the firefighting equipment onboard vessel Bourbon Liberty 311, ensuring all systems remained functional, efficient, and reliable. We conducted thorough assessments, provided recommendations, and executed renewal work with precision and care.",
    services: [
      "Firefighting equipment assessment",
      "System testing & certification",
      "Renewal & maintenance",
      "Compliance documentation",
    ],
  },
]
