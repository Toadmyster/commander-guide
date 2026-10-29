// ---- Publication links + content for the Desk Guide and Essential Publications pages ----
// Every URL lives in ONE place (PUB below). To fix a link, change it here and it updates everywhere.
// In text, write [[CAPR 39-2]] to insert a link, or [[CAPR 39-2|custom label]] for a different label.
// **bold** is supported. Links last checked against gocivilairpatrol.com on 17 Oct 2026.

const NHQ = "https://www.gocivilairpatrol.com/members/publications/";
const M = "https://www.gocivilairpatrol.com/media/cms/";
const CAWG = "https://cawg.cap.gov/";

window.PUB = {
  // Regulations
  "CAPR 20-1":  M + "CAPR_201_e25a0861bee1f.pdf",
  "CAPR 20-2":  M + "CAPR_202_defc4cbc11ab8.pdf",
  "CAPR 20-3":  M + "CAPR_203_f91c7eab85ca3.pdf",
  "CAPR 30-1":  M + "ICl_2407_and_CAPR_301_93b4dc7aa3257.pdf",
  "CAPR 35-1":  M + "R035_001_88C55F858019C.pdf",
  "CAPR 39-1":  M + "CAPR_391_90e08bf91538b.pdf",
  "CAPR 39-2":  M + "R039_002_A74FDA9552C2D.pdf",
  "CAPR 39-3":  M + "R039_003_83459660D4F44.pdf",
  "CAPR 40-1":  M + "R_401_2DBE51D881DDE.pdf",
  "CAPR 60-1":  M + "R_601_D19B3E261AA1D.pdf",
  "CAPR 60-2":  M + "R_602_7BA77F9A739A6.pdf",
  "CAPR 70-1":  M + "R_701_with_ICL_2008_Incorporated_1AE7DBFB50E71.pdf",
  "CAPR 160-1": M + "R160_001_AA05CF4BF3FC5.pdf",
  "CAPR 160-2": M + "R_1602_DA0D9F3C8B677.pdf",
  "CAPR 173-1": M + "R173_001_F17766C8102F6.pdf",
  "CAPR 174-1": M + "ICL_2302_incorporated_to_CAPR_1741_2c70a4188e78f.pdf",
  "CAPR 190-1": M + "R190_001_70FAF7B447A02.pdf",
  "CAPR 60-3":  M + "R060_003_075A4369FBA8E.pdf",   // Emergency Services Training and Operational Missions (26 Dec 12) - please verify current version
  // Pamphlets
  "CAPP 10-3":  M + "P010_003__18_Nov_2019_693CDB6E1DAC2.pdf",
  "CAPP 30-1":  M + "P_301_482AFDA40CDF8.pdf",
  "CAPP 40-2":  M + "CAPP_402_Transition_Guide_for_Squad_298E251EA67C8.pdf",
  "CAPP 60-14": M + "CAP_First_Talk_Guide_A91186D3B2664.pdf",
  "CAPP 60-18": M + "PYD_Glossary_0544367b8a0f0.pdf",
  "CAPP 60-20": M + "P_6020_A0A6B98761299.pdf",
  "CAPP 60-21": M + "CAPP_6021_Oct_23_e90da12ac26d1.pdf",
  "CAPP 60-31": M + "Cadet_Staff_Handbook__Nov_16__Web_47474DD79B032.pdf",
  "CAPP 60-32": M + "CAPP_6032_SDA_2018_F36F151B306A5.pdf",
  "CAPP 60-33": M + "P_6033_2217FEEE8C89F.pdf",
  "CAPP 60-35": M + "CAPP_6035_Cadet_Advisory_Council_Guide_d79f92e516fed.pdf",
  "CAPP 60-36": M + "Pocket_Guide_2023_Web_a568b59538246.pdf",
  "CAPP 60-40": M + "CAPP_6040__Combined_25335CF1C1F18.pdf",
  // California Wing
  "CAWGP 39-2-1": CAWG + "moduledocuments/embed/4115/CAWGP_3921__Recruiting_at_Schools_AAA7CA58B8DFA.pdf",
  "CAWGP 60-1-1": CAWG + "moduledocuments/embed/4426/CAWGP_6011__Guide_to_Cadet_Leadersh_56AC32C85AD6A.pdf",
  "CAWGP 60-1-3": CAWG + "moduledocuments/embed/4467/CAWGP_6013__Encampment_Addendum_9D929294AC92F.pdf",
  // Index / landing pages
  "eServices": "https://www.capnhq.gov/",
  "SUI information": "https://www.gocivilairpatrol.com/members/cap-national-hq/inspector-general/sui",
  "Pacific Region supplements": NHQ + "approved-supplements-and-ois-by-region/pacific-regions-supplements-and-ois",
  "CAP forms": NHQ + "forms/",
  "CAPR 160-series": NHQ + "indexes-regulations-and-manuals-1700/",
  "CAPR 20-series":  NHQ + "indexes-regulations-and-manuals-1700/",
  "CAPF 160-series": NHQ + "forms/",
  "NHQ regulations index": NHQ + "indexes-regulations-and-manuals-1700/",
  "NHQ pamphlets": NHQ + "pamphlets-1702/",
  "NHQ interim change letters": NHQ + "interim-change-letters-1708/",
  "NHQ supplements and OIs": NHQ + "approved-supplements-and-ois-by-region",
  "CAWG pamphlets": CAWG + "about/members/wing-pamphlets/",
  "CAWG supplements": CAWG + "about/members/wing-supplements-ois-and-forms/",
  "CAWG cadet forms": CAWG + "programs/cawg-cadet-programs/forms--publications/"
};

// ================= NEW SQUADRON COMMANDERS DESK GUIDE =================
window.DESK = {
  title: "New Squadron Commanders Desk Guide",
  subtitle: "Quick-reference guide for new Civil Air Patrol squadron commanders",
  updated: "Updated 21 September 2026 • Verify current ICLs and applicable wing supplements before use",
  intro: "**Mission of this guide.** Keep the commander focused on the publications, recurring controls, and questions that matter most in day-to-day command. This is a desk reference, not a substitute for the governing publication.",
  sections: [
    { title: "Commander’s Top 12 — Know These First", open: true, type: "top12", rows: [
      ["[[CAPR 30-1]]", "Unit organization and command responsibilities", "Who has authority? How is the unit organized? What are commander/staff responsibilities?"],
      ["[[CAPR 39-2]]", "Membership and transfers", "Can this person join/transfer? What membership process applies? What must the membership board do?"],
      ["[[CAPP 60-14]] — First Talk Guide", "Prospective member interviews", "How do we interview an adult prospective member? Use the prescribed First Talk questions and membership-board process."],
      ["[[CAPR 60-1]]", "Cadet Program administration", "Are we operating the Cadet Program correctly — promotions, meetings, activities, leadership, fitness, AE, and program administration?"],
      ["[[CAPR 60-2]]", "Cadet protection", "Are cadets protected? Are supervision, boundaries, reporting, and adult leadership requirements being followed?"],
      ["[[CAPP 60-21]] — Cadet Great Start", "Cadet Great Start - New cadet onboarding", "How do we consistently receive and train new cadets? Use Great Start as the repeatable onboarding pipeline."],
      ["[[CAPP 40-2]]", "Transition into command", "What should I do during transition into command?"],
      ["[[CAPR 40-1]]", "Senior member education and training", "Are senior members developing and progressing through Education & Training?"],
      ["[[CAPR 173-1]]", "Financial management", "Are squadron funds being budgeted, approved, spent, deposited, and documented correctly?"],
      ["[[CAPR 174-1]]", "Property management", "Do we know what property we are responsible for, where it is, and who has it?"],
      ["[[CAPR 20-1]] / [[CAPR 20-2]] / [[CAPR 20-3]]", "Inspections and compliance", "Are we inspection-ready, and do we know how to handle complaints and compliance issues?"],
      ["Applicable wing publications", "Wing and region requirements", "Are current wing and region supplements, operating instructions, forms, and approval requirements being followed?"]
    ]},
    { title: "Membership: Before Saying “Welcome Aboard”", type: "bullets", items: [
      "Use [[CAPR 39-2]] as the governing membership reference and check current ICLs.",
      "For prospective adult members who will enter a cadet environment, use [[CAPP 60-14]], First Talk Guide. NHQ describes it as the framework for the Unit Membership Board interview; only the listed questions are to be used.",
      "Treat the interview as both a suitability conversation and a cadet-protection safeguard — not merely an administrative formality.",
      "After approval, establish a repeatable onboarding path: eServices/access, Level I requirements, Cadet Protection training, duty assignment, mentor, and a first meaningful job."
    ]},
    { title: "Cadet Intake: Make Great Start the Squadron Standard", type: "bullets", items: [
      "Use [[CAPP 60-21]] Cadet Great Start as the core new-cadet onboarding program.",
      "Run intake in cohorts where practical so new cadets receive consistent instruction and existing flights are not repeatedly disrupted.",
      "Pair Great Start with [[CAPP 60-20]] New Cadet Guide and the Cadet Wingman Course requirements.",
      "Track the pipeline: visitor → applicant → member → Great Start → Achievement 1/Curry → integrated into an operational flight.",
      "Assign a senior-member owner and a cadet NCO/officer team for each cohort; review results after each cycle."
    ]},
    { title: "Cadet Program: Monthly Command Check", type: "bullets", items: [
      "[[CAPR 60-1]] — verify the squadron is delivering the required program elements and promotions are being processed properly.",
      "[[CAPR 60-2]] — verify two-deep/supervision and other current cadet-protection requirements at meetings and activities.",
      "[[CAPP 60-31]] and [[CAPP 60-32]] — ensure cadet staff have real jobs, clear expectations, feedback, and progressively greater responsibility.",
      "[[CAPP 60-35]] — maintain active squadron and Group CAC representation and alternates.",
      "Review QCUA progress throughout the year rather than waiting for the closing period."
    ]},
    { title: "Activities and Wing Requirements", type: "bullets", items: [
      "Start with [[CAPR 60-1]] and [[CAPR 60-2]] for cadet-program and protection requirements.",
      "If serving in California Wing, consult [[CAWGP 60-1-1]] early for cadet leadership training events — before dates, facilities, staff, or registration are treated as final.",
      "For California Wing encampment matters, also consult [[CAWGP 60-1-3]].",
      "Use current risk-management/safety publications and the appropriate [[CAPF 160-series]] documentation.",
      "Confirm the approval chain, project officer, finance, transportation, medical/emergency planning, supervision, Registration Zone requirements, and after-action responsibilities."
    ]},
    { title: "Senior-Member Development", type: "bullets", items: [
      "[[CAPR 40-1]] governs Education & Training. Give each senior member a useful duty position and development path.",
      "Use [[CAPP 30-1]] to clarify staff responsibilities; avoid having capable members hold titles without meaningful work.",
      "Use mentoring deliberately. Develop deputies and staff officers who can operate without the commander becoming the bottleneck.",
      "Review vacancies, specialty-track progress, required training, and succession depth at least quarterly."
    ]},
    { title: "Finance, Property, Safety & Inspection Readiness", type: "bullets", items: [
      "Finance — [[CAPR 173-1]]: budget, approvals, expenditures, deposits, reimbursements, and internal controls.",
      "Property — [[CAPR 174-1]]: maintain accountability, inventories, custody, and documentation for assigned assets.",
      "Safety — use the current [[CAPR 160-series]] requirements and applicable risk-management tools; [[CAPR 160-2]] has a 2026 ICL.",
      "IG/SUI — [[CAPR 20-1]], [[CAPR 20-2]], and [[CAPR 20-3]]. Keep evidence continuously; do not build the inspection file the week before the inspection.",
      "Aircraft/vehicles/communications — maintain the additional functional publications required for any assets or missions assigned to the squadron."
    ]},
    { title: "Suggested Squadron Command Rhythm", type: "rhythm", rows: [
      ["Weekly", "Immediate priorities and activity planning", "Cadet/senior leadership touchpoint; upcoming activity risks; personnel issues; approvals requiring commander action."],
      ["Monthly", "Squadron operations review", "Staff meeting; membership/onboarding review; cadet promotion/program health; finance; safety; property; upcoming activities."],
      ["Quarterly", "Staffing, goals, and program progress", "Staffing and succession review; E&T/specialty tracks; QCUA progress; recruiting/retention; inspection evidence; strategic goals."],
      ["Before every major activity", "Activity approval and readiness", "Approval status; project officer; supervision/CPP; risk management; transportation; finance; registration/permissions; emergency plan."],
      ["Annually / transition", "Annual review and command continuity", "Inventory/property; finance/budget; staff appointments; goals; SUI readiness; continuity files; publication currency review."]
    ]},
    { title: "Squadron Commander’s Binder — 8 Tabs", type: "bullets", items: [
      "**1 — COMMAND:** [[CAPR 30-1]]; [[CAPP 40-2]]; [[CAPP 30-1]]; [[CAPP 10-3]]; command goals and continuity.",
      "**2 — MEMBERSHIP:** [[CAPR 39-2]]; [[CAPP 60-14]] First Talk; recruiting/onboarding checklists.",
      "**3 — CADET PROGRAMS:** [[CAPR 60-1]]; [[CAPR 60-2]]; [[CAPP 60-20]]; [[CAPP 60-21]] Great Start; staff/CAC/drill references.",
      "**4 — WING & REGION:** current wing and region supplements, OIs, forms, and chain-of-command guidance. California Wing commanders should include [[CAWGP 60-1-1]] and [[CAWGP 60-1-3]].",
      "**5 — SAFETY:** current [[CAPR 160-series]] references; risk assessments; safety records.",
      "**6 — FINANCE & PROPERTY:** [[CAPR 173-1]]; [[CAPR 174-1]]; budget, finance records, inventory/custody.",
      "**7 — IG / SUI:** [[CAPR 20-series]]; inspection worksheets; continuously maintained evidence.",
      "**8 — OPERATIONS:** [[CAPR 70-1]] and applicable ES, communications, aircraft, and vehicle references."
    ]},
    { title: "The Commander’s Rule of Thumb", type: "callout",
      lead: "Know where the answer is; you do not have to memorize every answer.",
      text: "For recurring squadron functions, build simple local checklists that point back to the governing regulation. When a question involves membership, cadet protection, safety, finance, property, discipline, or a significant activity, check the current publication and any ICL/supplement before acting." },
    { title: "Publication Currency — 21 September 2026", type: "para",
      text: "NHQ currently lists 2026 Interim Change Letters affecting [[CAPR 30-1]], [[CAPR 39-1]], [[CAPR 39-2]], [[CAPR 40-1]], [[CAPR 160-2]], [[CAPR 174-1]] and other publications. Maintain links to the official [[NHQ regulations index|NHQ and applicable wing publication indexes]] instead of relying only on downloaded PDFs." }
  ]
};

// ================= SQUADRON COMMANDERS ESSENTIAL PUBLICATIONS =================
window.LIBRARY = {
  title: "Squadron Commanders Essential Publications",
  subtitle: "National and California Wing references for a composite squadron",
  updated: "Prepared 18 September 2026 • Verify current ICLs and CAWG supplements before use",
  purpose: "**Purpose.** A practical library for a California Wing composite squadron commander. It emphasizes the publications most likely to be used in command, membership, cadet programs, safety, finance/property, inspections, and operations.",

  regs: [
    ["[[CAPR 30-1]]", "Organization of Civil Air Patrol", "Command structure, organizational authority, staff relationships, and unit responsibilities. Check the 15 Sep 2026 ICL."],
    ["[[CAPR 35-1]]", "Assignment and Duty Status", "Assignments, duty positions, transfers, and member status."],
    ["[[CAPR 39-1]]", "Civil Air Patrol Uniform Regulation", "Uniform standards and commander enforcement; current ICLs apply."],
    ["[[CAPR 39-2]]", "Civil Air Patrol Membership", "Membership eligibility, applications, transfers, membership boards, and onboarding; current ICLs apply."],
    ["[[CAPR 39-3]]", "Award of CAP Medals, Ribbons and Certificates", "Awards and recognition."],
    ["[[CAPR 40-1]]", "Civil Air Patrol Education and Training Program", "Senior-member education, training, progression, and professional development; current ICL applies."],
    ["[[CAPR 60-1]]", "Cadet Program Management", "Primary governing regulation for operating the Cadet Program."],
    ["[[CAPR 60-2]]", "Cadet Protection Program", "Cadet protection, supervision, boundaries, reporting, and adult leadership requirements."],
    ["[[CAPR 160-1]] / [[CAPR 160-2]]", "Health Services / Safety Reporting, Reviewing and Action Planning", "Health-services framework and current safety reporting/action-planning requirements; CAPR 160-2 has a 2026 ICL."],
    ["[[CAPR 70-1]]", "CAP Flight Management", "Flight operations, pilot/aircraft management, and orientation-flight related operational requirements."],
    ["[[CAPR 173-1]]", "Financial Procedures and Accounting", "Unit budgeting, expenditures, approvals, reimbursements, deposits, and financial controls."],
    ["[[CAPR 174-1]]", "Property Management and Accountability", "Accountability for CAP property assigned to the unit; current 2026 ICL applies."],
    ["[[CAPR 20-1]] / [[CAPR 20-2|20-2]] / [[CAPR 20-3|20-3]]", "Inspector General / Complaint Resolution / Inspections", "Complaints, compliance, inspection responsibilities, and SUI preparation."],
    ["[[CAPR 190-1]]", "Civil Air Patrol Public Affairs Program", "Public affairs, media relations, releases, websites/social media, and unit PA responsibilities."]
  ],

  pamphlets: [
    ["[[CAPP 40-2]]", "Transition Guide for Squadron Commanders", "Purpose-built guide for assuming and organizing squadron command."],
    ["[[CAPP 30-1]]", "CAP Sample Position Descriptions", "Useful for assigning duties and clarifying staff responsibilities."],
    ["[[CAPP 10-3]]", "Legal Resources for Command", "Practical legal reference for commanders."],
    ["[[CAPP 60-14]]", "First Talk Guide", "Framework and prescribed questions for the Unit Membership Board interview of adults seeking senior or cadet sponsor membership. Particularly important in a composite squadron."],
    ["[[CAPR 60-2]]", "Cadet Protection Program", "Current governing regulation for cadet protection, supervision, boundaries, reporting, and adult leadership requirements."],
    ["[[CAPP 60-18]]", "Positive Youth Development", "Useful philosophy and terminology for running a healthy youth-development program."],
    ["[[CAPP 60-20]]", "New Cadet Guide", "New-cadet onboarding reference."],
    ["[[CAPP 60-21]]", "Cadet Great Start", "Structured program designed to transform prospective/new cadets into C/Amn in approximately five weeks."],
    ["[[CAPP 60-31]]", "Cadet Staff Handbook", "Cadet staff organization, leadership, and staff development."],
    ["[[CAPP 60-32]]", "Cadet Staff Duty Analysis Guide", "Defines and develops cadet staff duties."],
    ["[[CAPP 60-33]] / [[CAPP 60-36|60-36]]", "Drill & Ceremonies / Cadet Drill Guide", "Drill standards and cadet drill instruction/reference."],
    ["[[CAPP 60-35]]", "Cadet Advisory Council Guide", "CAC organization, representation, and responsibilities."],
    ["[[CAPP 60-40]]", "Orientation Flight Syllabus", "Reference for cadet orientation flying."]
  ],

  calwing: [
    ["[[CAWGP 60-1-1]]", "Guide to Cadet Leadership Training Events", "Essential for planning California Wing cadet leadership activities and weekend/overnight training events."],
    ["[[CAWGP 60-1-3]]", "Encampment Addendum to CAWGP 60-1-1", ""],
    ["[[CAWGP 39-2-1]]", "Recruiting at Schools", "Where applicable."]
  ],
  calwingNote: "Applicable CAWG supplements, operating instructions, forms, and Group directives. Always check the current CAWG and NHQ approved-publications pages rather than relying on an old local copy.",

  binder: [
    "**COMMAND** — [[CAPR 30-1]]; [[CAPP 40-2]]; [[CAPP 30-1]]; [[CAPP 10-3]].",
    "**MEMBERSHIP & PERSONNEL** — [[CAPR 35-1]]; [[CAPR 39-2]]; [[CAPR 39-3]]; [[CAPR 40-1]]; [[CAPP 60-14]] First Talk Guide.",
    "**CADET PROGRAMS** — [[CAPR 60-1]]; [[CAPR 60-2]]; [[CAPP 60-18]]; [[CAPP 60-20]]; [[CAPP 60-21]] Great Start; staff/CAC/drill guides.",
    "**CALIFORNIA WING** — [[CAWGP 60-1-1]]; [[CAWGP 60-1-3]]; [[NHQ supplements and OIs|applicable CAWG supplements/OIs/forms]].",
    "**SAFETY & HEALTH** — current [[CAPR 160-series]] publications, risk-management tools, and [[CAPF 160-series]] forms used for activities.",
    "**FINANCE & PROPERTY** — [[CAPR 173-1]]; [[CAPR 174-1]]; local finance/property records.",
    "**IG / SUI** — [[CAPR 20-1]]; [[CAPR 20-2|20-2]]; [[CAPR 20-3|20-3]]; current inspection worksheets and evidence files.",
    "**OPERATIONS** — [[CAPR 70-1]] plus current ES, communications, vehicle, and aircraft publications applicable to the unit."
  ],

  highlights: [
    { key: "CAPP 60-14", title: "First Talk Guide",
      text: "NHQ describes this as an in-person interview framework for the Unit Membership Board and adults requesting senior-member or cadet-sponsor membership. CAP's current cadet-protection training page states that interviews use only the questions in the guide. For a composite squadron, this belongs in the commander's membership/onboarding toolkit." },
    { key: "CAPP 60-21", title: "Cadet Great Start",
      text: "A comprehensive onboarding program for prospective/new cadets. NHQ describes its objective as moving a new cadet toward C/Amn in roughly five weeks. It should be the backbone of a repeatable Squadron 68 new-cadet intake process." }
  ],

  currency: "CAP publications change frequently. As of 18 September 2026, NHQ lists 2026 Interim Change Letters affecting, among others, CAPR 30-1, 39-1, 39-2, 40-1, 160-2, and 174-1. Before making a command decision, verify the current parent regulation, all incorporated or attached ICLs, and applicable California Wing supplements/OIs.",

  official: [
    ["National Headquarters: Regulations & Manuals", "NHQ regulations index"],
    ["National Headquarters: Pamphlets", "NHQ pamphlets"],
    ["National Headquarters: Interim Change Letters", "NHQ interim change letters"],
    ["California Wing: Wing Pamphlets & Visual Aids", "CAWG pamphlets"],
    ["California Wing: Wing Supplements, OIs & Forms", "CAWG supplements"],
    ["California Wing: Cadet Programs Forms & Publications", "CAWG cadet forms"]
  ]
};
