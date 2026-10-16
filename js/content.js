// ---- Editable content ----
// STARTER CONTENT: verify regulation numbers and checklist items against the current
// CAP publications and your wing's requirements before relying on them.

window.CONTENT = {

  welcome: `
    <h3>Congratulations on taking command</h3>
    <p>As squadron commander you are responsible for the mission, people, and resources of your unit.
    You do not have to know everything on day one. Use this guide to work through the essentials in a sensible order.</p>
    <h3>Your first 30 days</h3>
    <ul>
      <li><strong>Listen first.</strong> Meet your staff, cadets, and senior members one on one.</li>
      <li><strong>Get access.</strong> Make sure you can use eServices and your unit's records.</li>
      <li><strong>Learn the rules.</strong> Review the regulations that govern your unit.</li>
      <li><strong>Build your team.</strong> Confirm staff assignments and fill key gaps.</li>
      <li><strong>Stay connected.</strong> Meet your group or wing leadership and a mentor.</li>
    </ul>
    <h3>How to use this app</h3>
    <p>Work through the checklist at your own pace. Your progress is saved under your CAP ID.
    When ready, use the Report tab to email an update. Swipe left or right to move between pages.</p>`,

  groups: [
    { name: "Get Started", items: [
      { id: "g1", t: "Complete the change-of-command paperwork", d: "Confirm your appointment is recorded and the transfer of unit responsibility is documented." },
      { id: "g2", t: "Confirm eServices access and permissions", d: "Make sure your commander privileges work in eServices." },
      { id: "g3", t: "Meet with your outgoing commander", d: "Get a turnover briefing on open issues, finances, and people." },
      { id: "g4", t: "Introduce yourself to the squadron", d: "Hold a first meeting and share your priorities." }
    ]},
    { name: "Learn the Rules", items: [
      { id: "l1", t: "Review key regulations for unit commanders", d: "Start with CAPR 35-5 (Officer and NCO Appointments and Promotions), CAPR 39-2 (Membership), CAPR 20-3 (Inspections and Compliance Analyses) and CAPR 35-1 (Assignment and Duty Status).", link: "https://www.gocivilairpatrol.com/members/publications/indexes-regulations-and-manuals-1700" },
      { id: "l2", t: "Review your wing's supplements and OIs", d: "Local rules can add to national ones.", link: "https://www.gocivilairpatrol.com/members/publications/approved-supplements-and-ois-by-region" },
      { id: "l3", t: "Review cadet program and protection requirements", d: "CAPR 60-1 (Cadet Program Management) and CAPR 60-2 (Cadet Protection Program).", link: "https://www.gocivilairpatrol.com/members/publications/indexes-regulations-and-manuals-1700" },
      { id: "l4", t: "Complete required commander training", d: "Check the Learning Management System and your wing for what applies to you." }
    ]},
    { name: "People & Staff", items: [
      { id: "p1", t: "Review the unit roster", d: "Check member status, renewals, and qualifications." },
      { id: "p2", t: "Confirm key staff assignments", d: "Deputy commander, cadet programs, safety, finance, and others." },
      { id: "p3", t: "Hold one-on-ones with key staff", d: "Learn strengths, goals, and concerns." },
      { id: "p4", t: "Identify a mentor", d: "A fellow commander or group/wing staff officer you can call." }
    ]},
    { name: "Operations & Resources", items: [
      { id: "o1", t: "Inventory unit property and vehicles", d: "Verify what the unit is responsible for." },
      { id: "o2", t: "Review unit finances and bank accounts", d: "Confirm access, balances, and reporting status." },
      { id: "o3", t: "Check required reports and due dates", d: "Calendar recurring reports and inspections." },
      { id: "o4", t: "Review facility, insurance, and safety items", d: "Meeting space, agreements, and emergency plans." }
    ]},
    { name: "Plan Ahead", items: [
      { id: "a1", t: "Set 3 priorities for your first 90 days", d: "Keep them few and measurable." },
      { id: "a2", t: "Schedule a meeting with group/wing leadership", d: "Share your plan and ask for support." },
      { id: "a3", t: "Send your first progress report", d: "Use the Report tab to email your status." }
    ]}
  ],

  links: [
    { t: "CAP National Website", d: "News, programs, and member info", u: "https://www.gocivilairpatrol.com/" },
    { t: "eServices", d: "Member records, reports, and unit tools (login required)", u: "https://www.capnhq.gov/" },
    { t: "Regulations, Manuals & Indexes", d: "Official CAP publications index", u: "https://www.gocivilairpatrol.com/members/publications/indexes-regulations-and-manuals-1700" },
    { t: "Forms", d: "Official CAP forms", u: "https://www.gocivilairpatrol.com/members/publications/forms" },
    { t: "Approved Supplements & OIs by Region", d: "Local supplements to national regulations", u: "https://www.gocivilairpatrol.com/members/publications/approved-supplements-and-ois-by-region" },
    { t: "CAPipedia", d: "Member-built wiki for CAP procedures and how-tos", u: "https://capipedia.cap.gov/" }
  ]
};
