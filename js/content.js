// ---- Editable content ----
// Checklist based on "First 30 Days (Expanded)". Timing is SUGGESTED unless an item has `req`,
// which marks a requirement specifically identified in CAP publications (text shown on the badge).
// Always confirm current CAP regulations, interim changes (ICLs), and wing supplements.
//
// Item fields:  id (keep stable: saved progress is keyed by it) · t title · d short description
//   req   (optional) requirement/deadline text -> shows a red "Required" badge
//   refs  (optional) list of reference links; use [[Key]] tokens from js/publications.js
//   help  (optional) who can help         wing (optional) wing-specific considerations

window.CONTENT = {

  welcome: `
    <h3>Congratulations on taking command</h3>
    <p>As squadron commander you are responsible for the mission, people, and resources of your unit.
    You do not have to know everything on day one. Use this guide to work through the essentials in a sensible order.</p>
    <h3>Your first 90 days</h3>
    <p>The checklist follows a simple timeline: before taking command, your first week, your first 30 days, and your first 90 days.</p>
    <ul>
      <li><strong>Listen first.</strong> Meet your staff, cadets, and senior members one on one.</li>
      <li><strong>Get access.</strong> Make sure you can use eServices and your unit's records.</li>
      <li><strong>Learn the rules.</strong> Review the regulations that govern your unit.</li>
      <li><strong>Build your team.</strong> Confirm staff assignments and fill key gaps.</li>
      <li><strong>Find support.</strong> Identify an experienced commander or staff member you can call for advice.</li>
    </ul>
    <h3>How to use this app</h3>
    <p>Work through the checklist at your own pace and mark each item <strong>Complete</strong> or <strong>Not applicable</strong>.
    Items marked <strong>Required</strong> are specifically identified in CAP publications; everything else is a suggested target.
    Tap an item for details. Your progress is saved under your CAP ID. The Report tab is optional: use it only if your group or wing expects updates.
    Swipe left or right to move between pages.</p>`,

  legend: `<strong>Required</strong> items are specifically identified in CAP publications. <strong>Suggested</strong> items are recommended timing only; adjust for your squadron. Tap an item for details. Not every item applies to every squadron.`,

  groups: [
    { name: "Before taking command", items: [
      { id: "b1", t: "Meet with the outgoing commander",
        d: "Discuss strengths, concerns, commitments, finances, property, and unfinished business.",
        refs: ["[[CAPP 40-2]] — Transition Guide for Squadron Commanders"],
        help: "The outgoing commander; your group or wing commander.",
        wing: "Ask which wing-specific procedures, forms, and contacts the squadron relies on." },
      { id: "b2", t: "Meet with your group or wing commander",
        d: "Clarify expectations, priorities, reporting requirements, and available support.",
        refs: ["[[NHQ supplements and OIs|Approved supplements and OIs by region]]", "[[Pacific Region supplements|Pacific Region wing supplements and OIs]]"],
        help: "Your group or wing commander and wing staff.",
        wing: "Ask what reporting your group or wing expects, and review your wing's supplements and OIs." },
      { id: "b3", t: "Review the squadron’s current picture",
        d: "Request the roster, staff assignments, calendar, recent inspection results, budget, and open issues.",
        refs: ["[[SUI information|Subordinate Unit Inspection (SUI) information]]"],
        help: "The outgoing commander, the deputy commander, and wing staff." },
      { id: "b4", t: "Identify key people to meet",
        d: "Include deputy commanders, senior staff, cadet leadership, and other members important to the transition.",
        help: "The outgoing commander and the deputy commander can suggest who to meet first." },
      { id: "b5", t: "Review the basics of command",
        d: "Start with CAPP 40-2, CAPR 60-2, and relevant wing supplements. Identify any commander training still needed.",
        refs: ["[[CAPP 40-2]]", "[[CAPR 60-2]] — Cadet Protection Program", "[[NHQ supplements and OIs|Wing supplements and OIs]]"],
        help: "An experienced commander or your wing staff can point you to the training that applies.",
        wing: "Check your wing for any additional commander training or requirements." },
      { id: "b6", t: "Plan the transition",
        d: "Confirm the effective date, appointment process, and any change-of-command event with the chain of command.",
        refs: ["[[CAPP 40-2]]"],
        help: "Your group or wing commander." }
    ]},

    { name: "First week in command", items: [
      { id: "w1", t: "Confirm appointment and eServices access",
        d: "Check that the command assignment is recorded and that required systems are accessible.",
        refs: ["[[eServices]] (login required)"],
        help: "Your group or wing commander or wing headquarters staff." },
      { id: "w2", t: "Introduce yourself to the squadron",
        d: "Share your initial priorities, preferred communication, and commitment to listening." },
      { id: "w3", t: "Meet with senior and cadet leadership",
        d: "Learn what is working, what needs attention, and what support they need.",
        help: "Your deputy commander and cadet leadership." },
      { id: "w4", t: "Check cadet protection and safety",
        d: "Review member protection status, supervision arrangements, reporting procedures, and immediate concerns.",
        refs: ["[[CAPR 60-2]] — Cadet Protection Program", "[[CAPR 160-2]] — Safety Reporting, Reviewing and Action Planning"],
        help: "Your safety officer, your cadet programs officer, and wing staff.",
        wing: "Check your wing supplements for additional cadet protection or safety requirements." },
      { id: "w5", t: "Identify urgent deadlines and unresolved matters",
        d: "Check upcoming activities, agreements, reports, member actions, and inspection findings.",
        help: "The outgoing commander and the deputy commander." },
      { id: "w6", t: "Confirm continuity of operations",
        d: "Make sure responsibilities for meetings, activities, communications, and time-sensitive approvals are covered.",
        help: "Your deputy commander and staff." },
      { id: "w7", t: "Identify an experienced commander or staff member you can call for advice",
        d: "Choose someone you can reach with questions: another squadron commander, a group or wing staff officer, or a former commander. Support can be informal.",
        help: "Your group or wing commander can suggest experienced people." }
    ]},

    { name: "Within the first 30 days", items: [
      { id: "d1", t: "Establish the finance committee in writing",
        d: "Confirm its membership and responsibilities and record appointments as required. CAPP 40-2 identifies a 30-day requirement after a change of command.",
        req: "Within 30 days of a change of command (CAPP 40-2)",
        refs: ["[[CAPP 40-2]]", "[[CAPR 173-1]] — Financial Procedures and Accounting"],
        help: "Wing finance staff and the outgoing commander. CAPP 40-2 notes the committee can be recorded in eServices (Committee Assignment module).",
        wing: "Follow your wing's finance procedures." },
      { id: "d2", t: "Complete the new CAPF 172",
        d: "Work with the finance committee and wing finance staff to update authorizations and submit or upload the form as required. CAPR 173-1 calls for reissue at each change of command.",
        req: "Reissued at each change of command (CAPR 173-1)",
        refs: ["[[CAPR 173-1]]", "[[CAPF 172]] (form, PDF)"],
        help: "Your finance committee and wing finance staff.",
        wing: "Ask wing finance staff how and where the form is submitted or uploaded." },
      { id: "d3", t: "Review squadron finances",
        d: "Examine the budget, available funds, outstanding obligations, approval procedures, and recent committee minutes.",
        refs: ["[[CAPR 173-1]]"],
        help: "The finance committee and the outgoing commander." },
      { id: "d4", t: "Conduct the changeover property inventory",
        d: "Work with the property officer using the ORMS changeover process, reconcile discrepancies, and confirm responsibility for applicable property.",
        refs: ["[[CAPR 174-1]] — Property Management and Accountability", "[[CAPP 40-2]] (recommends a changeover inventory within the first 30 days)"],
        help: "Your property/logistics officer and wing logistics staff." },
      { id: "d5", t: "Review staff assignments and coverage",
        d: "Confirm key roles, identify vacancies, and update duty assignments as appropriate.",
        refs: ["[[CAPP 30-1]] — Sample Position Descriptions", "[[CAPR 35-1]] — Assignment and Duty Status"],
        help: "Your deputy commander and group or wing staff." },
      { id: "d6", t: "Review membership and promotion board procedures",
        d: "Confirm which boards are needed, their membership, and how they operate under applicable regulations.",
        refs: ["[[CAPR 39-2]] — Membership", "[[CAPR 60-1]] — Cadet Program Management", "[[CAPP 60-14]] — First Talk Guide"],
        help: "Your personnel and cadet programs officers.",
        wing: "Check your wing supplements for any board procedures." },
      { id: "d7", t: "Review emergency services alerting",
        d: "With the ES officer, review the unit alert roster and resources and ensure qualified unit alert officers are designated as applicable.",
        refs: ["[[CAPR 60-3|CAPR 60-3(I)]] — Emergency Services Training and Operational Missions (para 1-5c(6): unit alert roster, resource lists, and unit alert officers)",
               "[[GES training|General Emergency Services (GES) training materials]] (unit alert officers must be GES-qualified senior members)",
               "[[SQTR overview|Training and Qualification Overview (SQTRs)]]",
               "[[ES training|Emergency Services Education and Training (task guides and training pages)]]",
               "[[NHQ interim change letters|Interim change letters (ICLs)]]"],
        help: "Whoever manages emergency services for your squadron (the regulation does not define a unit ES officer position), and your wing ES staff.",
        wing: "Check your wing's emergency services supplements and procedures. The regulation asks units to keep the alert roster and resource lists current, at least annually." },
      { id: "d8", t: "Review the facility and equipment",
        d: "Check access, keys, meeting arrangements, vehicles, communications equipment, agreements, and maintenance or safety issues.",
        help: "Your logistics and communications officers; the wing transportation officer if you have a vehicle.",
        wing: "Confirm any agreements with your meeting facility and any wing requirements." },
      { id: "d9", t: "Put recurring requirements on a calendar",
        d: "Include finance meetings, reports, inspections, training, vehicle requirements, and group or wing deadlines.",
        refs: ["[[CAPR 173-1]] (finance committee meets at least quarterly)", "[[SUI information|SUI information]]"],
        help: "The outgoing commander and your deputy commander.",
        wing: "Ask your group or wing for its reporting calendar." }
    ]},

    { name: "By the end of the first 90 days", items: [
      { id: "n1", t: "Meet individually with key staff and cadet leaders",
        d: "Discuss goals, workload, training needs, and ideas for the squadron." },
      { id: "n2", t: "Review the squadron’s programs",
        d: "Look at cadet programs, aerospace education, emergency services, and senior-member development as applicable.",
        refs: ["[[CAPR 60-1]] — Cadet Program Management", "[[CAPR 40-1]] — Education and Training"],
        help: "Your program officers." },
      { id: "n3", t: "Review inspections and quality measures",
        d: "Use current Subordinate Unit Inspection materials and unit goals to identify practical improvements.",
        refs: ["[[SUI information|Subordinate Unit Inspection (SUI) information]]", "[[CAPR 20-3]] — Inspections and Compliance Analyses"],
        help: "Wing inspector general staff." },
      { id: "n4", t: "Agree on two or three achievable priorities",
        d: "Develop them with staff and cadet leadership as appropriate; give each an owner and a way to measure progress." },
      { id: "n5", t: "Review the calendar and staffing",
        d: "Look ahead to activities, training, recruiting, member development, and succession needs." },
      { id: "n6", t: "Check in with your group or wing commander",
        d: "Share what you have learned, your priorities, and any help the squadron needs.",
        help: "Your group or wing commander." },
      { id: "n7", t: "Recognize your people",
        d: "Thank members and consider whether accomplishments deserve formal recognition.",
        refs: ["[[CAPR 39-3]] — Award of CAP Medals, Ribbons and Certificates"] }
    ]}
  ],

  ongoing: [
    "**Finance:** Meet and document finance committee activity at least quarterly; maintain the budget and follow wing procedures. ([[CAPR 173-1]])",
    "**Vehicles:** If assigned a vehicle, confirm inspection, usage reporting, maintenance requirements, and deadlines with the wing transportation officer.",
    "**Safety and cadet protection:** Review regularly and act promptly on concerns.",
    "**Property and emergency services:** Keep inventories, records, alert rosters, and qualifications current as applicable. The unit alert roster and resource lists should be updated at least annually ([[CAPR 60-3|CAPR 60-3(I)]]).",
    "**People and programs:** Follow up on member development, promotions, renewals, recruiting, and recognition."
  ],

  links: [
    { t: "CAP National Website", d: "News, programs, and member info", u: "https://www.gocivilairpatrol.com/" },
    { t: "eServices", d: "Member records, reports, and unit tools (login required)", u: "https://www.capnhq.gov/" },
    { t: "Regulations, Manuals & Indexes", d: "Official CAP publications index", u: "https://www.gocivilairpatrol.com/members/publications/indexes-regulations-and-manuals-1700" },
    { t: "Pamphlets", d: "Official CAP pamphlets and guides index", u: "https://www.gocivilairpatrol.com/members/publications/pamphlets-1702/" },
    { t: "Interim Change Letters (ICLs)", d: "Current changes to regulations", u: "https://www.gocivilairpatrol.com/members/publications/interim-change-letters-1708/" },
    { t: "Forms", d: "Official CAP forms", u: "https://www.gocivilairpatrol.com/members/publications/forms" },
    { t: "Approved Supplements & OIs by Region", d: "Local supplements to national regulations", u: "https://www.gocivilairpatrol.com/members/publications/approved-supplements-and-ois-by-region" },
    { t: "Subordinate Unit Inspection (SUI) Information", d: "Inspection worksheets and process", u: "https://www.gocivilairpatrol.com/members/cap-national-hq/inspector-general/sui" },
    { t: "CAPipedia", d: "Member-built wiki for CAP procedures and how-tos", u: "https://capipedia.cap.gov/" }
  ]
};
