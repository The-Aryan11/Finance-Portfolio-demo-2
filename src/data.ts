export type Step = { date: string; title: string; note: string };
export type Deal = {
  doc: string;
  company: string;
  descriptor: string;
  verb: string;
  counterparty: string;
  valueLabel: string;
  year: number;
  category: "Sell-side" | "Buy-side" | "Merger" | "Defence & Recap";
  advised: string;
  region: string;
  multiple: string;
  duration: string;
  close: string;
  structureTitle: string;
  split: { label: string; pct: number }[];
  terms: string[];
  role: string[];
  team: string;
  timeline: Step[];
};

export const PERSON = {
  name: "Adrian Voss",
  title: "Managing Director, M&A Advisory",
  coverage: "Industrials & Energy Transition",
  firm: "Harcourt Lane & Co.",
  email: "adrian.voss@harcourtlane.example",
};

export const deals: Deal[] = [
  {
    doc: "3.01",
    company: "Verdant Grid Partners",
    descriptor: "Renewable power developer",
    verb: "has been acquired by",
    counterparty: "Northwind Infrastructure Partners",
    valueLabel: "$2.4 billion",
    year: 2025,
    category: "Sell-side",
    advised: "Exclusive financial advisor to Verdant Grid Partners",
    region: "North America",
    multiple: "14.2x EBITDA",
    duration: "7 months to signing",
    close: "Jul 2025",
    structureTitle: "Consideration",
    split: [{ label: "Cash at close", pct: 100 }],
    terms: ["100% cash, no financing condition", "$85m reverse termination fee", "Management rolled 8% into the new holdco"],
    role: [
      "Ran the process end to end as lead banker, from the board's first unsolicited approach to signing.",
      "Built the buyer universe of 38 sponsors, strategics and infrastructure funds, and sequenced outreach so the strategic bidders saw the sponsor interest.",
      "Led price negotiation in the final week: moved the winning bid from $2.25bn to $2.4bn with a tighter regulatory-risk allocation.",
    ],
    team: "1 MD, 1 Director, 2 Associates, 2 Analysts",
    timeline: [
      { date: "Nov 2024", title: "Mandate", note: "Board received an unsolicited approach at a low-ball multiple. Engaged as sole sell-side advisor within ten days." },
      { date: "Dec 2024", title: "Teaser & NDAs", note: "Teaser to 38 parties. 22 NDAs executed, data room opened to the first wave." },
      { date: "Jan 2025", title: "First-round IOIs", note: "9 indications received, ranging $1.9bn to $2.3bn enterprise value. Five carried forward." },
      { date: "Mar 2025", title: "Management presentations", note: "Five bidders met management over two weeks. Confirmatory diligence started on the shortlist." },
      { date: "May 2025", title: "Final bids & signing", note: "Three final bids. Northwind won on price and certainty. SPA signed after a 72-hour negotiation." },
      { date: "Jul 2025", title: "Closing", note: "Regulatory approvals cleared without remedies. Funds flowed on the target date." },
    ],
  },
  {
    doc: "3.02",
    company: "Calder Biologics",
    descriptor: "Specialty biologics manufacturer",
    verb: "has been acquired by",
    counterparty: "Meridian Pharma",
    valueLabel: "$1.8 billion",
    year: 2024,
    category: "Sell-side",
    advised: "Exclusive financial advisor to Calder Biologics",
    region: "Europe",
    multiple: "18.6x EBITDA",
    duration: "5 months to signing",
    close: "Feb 2025",
    structureTitle: "Consideration",
    split: [
      { label: "Cash at close", pct: 83 },
      { label: "Contingent value right", pct: 17 },
    ],
    terms: ["$1.5bn cash at close", "$300m CVR tied to two regulatory milestones", "Retention pool for 40 scientists"],
    role: [
      "Positioned the pipeline asset as the story and kept the manufacturing platform as the price floor.",
      "Designed the CVR so milestone triggers sat inside the target's control, not the buyer's.",
      "Handled the founder's shareholders directly, since two funds wanted cash and one wanted to roll.",
    ],
    team: "1 MD, 1 VP, 1 Associate, 2 Analysts",
    timeline: [
      { date: "Jun 2024", title: "Mandate", note: "Founders ran a failed bilateral with a strategic. Engaged to run a competitive process." },
      { date: "Jul 2024", title: "Soft-sounding", note: "Quiet calls to six strategics before any paper left the building." },
      { date: "Sep 2024", title: "Management presentations", note: "Four strategics and one sponsor in the room. Phase II data disclosed under clean-team terms." },
      { date: "Oct 2024", title: "Final bids", note: "Two bids above $1.6bn. Meridian came back with the CVR structure to bridge a valuation gap." },
      { date: "Nov 2024", title: "Signing", note: "Signed with a $1.5bn upfront and a $300m CVR." },
      { date: "Feb 2025", title: "Closing", note: "Tender offer completed after antitrust clearance." },
    ],
  },
  {
    doc: "3.03",
    company: "Halvorsen Logistics",
    descriptor: "North Atlantic freight and warehousing",
    verb: "has merged with",
    counterparty: "Brightway Freight",
    valueLabel: "$3.1 billion",
    year: 2024,
    category: "Merger",
    advised: "Financial advisor to the Special Committee of Halvorsen Logistics",
    region: "North America & Europe",
    multiple: "9.1x EBITDA",
    duration: "9 months to signing",
    close: "Dec 2024",
    structureTitle: "Pro forma ownership",
    split: [
      { label: "Halvorsen holders", pct: 54 },
      { label: "Brightway holders", pct: 46 },
    ],
    terms: ["All-stock merger of equals", "Board split 6/6 with a rotating chair", "$140m of run-rate synergies, 60% in year two"],
    role: [
      "Advised the independent directors on a merger where the founding family sat on both sides of the table.",
      "Delivered the fairness opinion and the contribution analysis that set a 54/46 exchange ratio.",
      "Pressure-tested the synergy case line by line with the operating team before the committee voted.",
    ],
    team: "1 MD, 1 Director, 1 Associate, 1 Analyst",
    timeline: [
      { date: "Mar 2024", title: "Committee formed", note: "Special Committee of independent directors formed and I was retained as its advisor." },
      { date: "May 2024", title: "Contribution analysis", note: "Relative revenue, EBITDA and free cash flow contribution mapped to a range of exchange ratios." },
      { date: "Jul 2024", title: "Synergy diligence", note: "Network overlap and procurement savings tested against three comparable mergers." },
      { date: "Oct 2024", title: "Fairness opinion", note: "Opinion delivered to the committee. Vote was unanimous." },
      { date: "Dec 2024", title: "Closing", note: "Shareholder votes passed with 91% support." },
    ],
  },
  {
    doc: "3.04",
    company: "Ostrava Specialty Materials",
    descriptor: "Carve-out of a division of Kessler Industrial Group",
    verb: "has been acquired by",
    counterparty: "Apex Holdings",
    valueLabel: "$940 million",
    year: 2023,
    category: "Sell-side",
    advised: "Exclusive financial advisor to Kessler Industrial Group",
    region: "Central Europe",
    multiple: "8.4x EBITDA",
    duration: "8 months to signing",
    close: "Jan 2024",
    structureTitle: "Consideration",
    split: [
      { label: "Cash at close", pct: 90 },
      { label: "Deferred / earn-out", pct: 10 },
    ],
    terms: ["12-month transition services agreement", "Stand-alone carve-out financials audited for the process", "Earn-out on year-one volume"],
    role: [
      "Built stand-alone financials from a division that had never reported separately.",
      "Kept the two bidders honest on stranded costs so the seller kept proceeds, not the buyer.",
      "Negotiated the TSA schedule, which is where most carve-outs quietly leak value.",
    ],
    team: "1 MD, 1 VP, 2 Associates, 1 Analyst",
    timeline: [
      { date: "Apr 2023", title: "Mandate", note: "Kessler decided to exit a non-core division after a strategic review." },
      { date: "Jun 2023", title: "Vendor due diligence", note: "Carve-out financials and stranded-cost schedule prepared and audited." },
      { date: "Aug 2023", title: "Binding offers", note: "Three bids. One sponsor dropped on the TSA scope." },
      { date: "Dec 2023", title: "Signing", note: "Signed with Apex after a three-week exclusivity period." },
      { date: "Jan 2024", title: "Closing", note: "Day-one separation executed on schedule." },
    ],
  },
  {
    doc: "3.05",
    company: "Lumen & Pike Software",
    descriptor: "Vertical software for utilities",
    verb: "has been taken private by",
    counterparty: "Tidewater Capital",
    valueLabel: "$1.2 billion",
    year: 2023,
    category: "Sell-side",
    advised: "Financial advisor to the Independent Committee of Lumen & Pike",
    region: "North America",
    multiple: "5.1x revenue",
    duration: "4 months to signing",
    close: "Sep 2023",
    structureTitle: "Sources of funds",
    split: [
      { label: "Sponsor equity", pct: 52 },
      { label: "Term loan B", pct: 33 },
      { label: "Management rollover", pct: 15 },
    ],
    terms: ["34% premium to the 30-day VWAP", "45-day go-shop with no taker", "Founders rolled 15% of proceeds"],
    role: [
      "Advised the committee through a conflicted situation, since the CEO was also a bidder-side participant.",
      "Ran a market check and a go-shop to defend the price against the inevitable shareholder suit.",
      "Moved the premium from 24% to 34% in two rounds.",
    ],
    team: "1 MD, 1 VP, 1 Associate, 1 Analyst",
    timeline: [
      { date: "May 2023", title: "Approach", note: "Tidewater approached the board at a 24% premium." },
      { date: "Jun 2023", title: "Market check", note: "Seven strategics and sponsors contacted quietly." },
      { date: "Jul 2023", title: "Price improvement", note: "Premium bumped to 34% in two rounds." },
      { date: "Aug 2023", title: "Signing & go-shop", note: "Signed with a 45-day go-shop. No competing bidder emerged." },
      { date: "Sep 2023", title: "Closing", note: "Stockholders approved with 88% in favour." },
    ],
  },
  {
    doc: "3.06",
    company: "Atlas Cold Chain",
    descriptor: "Temperature-controlled logistics",
    verb: "has received a growth investment from",
    counterparty: "Pelham Growth Partners",
    valueLabel: "$620 million",
    year: 2022,
    category: "Defence & Recap",
    advised: "Exclusive financial advisor to Atlas Cold Chain",
    region: "South-East Asia",
    multiple: "11.0x EBITDA",
    duration: "6 months to signing",
    close: "Nov 2022",
    structureTitle: "Use of proceeds",
    split: [
      { label: "Primary (growth)", pct: 60 },
      { label: "Secondary (founder liquidity)", pct: 40 },
    ],
    terms: ["Minority stake of 28%", "Two board seats, with consent rights on M&A", "Staged put right after year five"],
    role: [
      "Advised a founder who wanted growth capital and a partner, not an exit.",
      "Reshaped the ask from a 40% stake to 28% by bringing a second investor into the final round.",
      "Wrote the governance term sheet, which mattered more to the founder than the headline price.",
    ],
    team: "1 MD, 1 VP, 1 Analyst",
    timeline: [
      { date: "Mar 2022", title: "Mandate", note: "Founder asked for a minority partner to fund a new regional hub." },
      { date: "Jun 2022", title: "Investor meetings", note: "Eleven investors met. Four progressed." },
      { date: "Sep 2022", title: "Term sheets", note: "Two competing term sheets, one with a control right the founder rejected." },
      { date: "Nov 2022", title: "Closing", note: "Signed and funded within the same week." },
    ],
  },
  {
    doc: "3.07",
    company: "Brightpath Health Systems",
    descriptor: "Outpatient diagnostics network",
    verb: "has been acquired by",
    counterparty: "Oakmont Health",
    valueLabel: "$1.45 billion",
    year: 2022,
    category: "Buy-side",
    advised: "Exclusive financial advisor to Oakmont Health",
    region: "North America",
    multiple: "12.3x EBITDA",
    duration: "5 months to signing",
    close: "Aug 2022",
    structureTitle: "Funding",
    split: [
      { label: "Cash on hand", pct: 25 },
      { label: "New senior notes", pct: 45 },
      { label: "Revolver", pct: 30 },
    ],
    terms: ["Bridge facility backstopped through signing", "Bolt-on structured as an asset purchase for tax step-up", "Pre-agreed divestiture of 11 overlapping sites"],
    role: [
      "Advised the acquirer on target selection, valuation discipline and a walk-away price.",
      "Went in with a bid 8% below the seller's expectation and closed the gap on certainty of close, not price.",
      "Coordinated the financing package so the buyer could sign without a financing out.",
    ],
    team: "1 MD, 1 Director, 1 Associate, 1 Analyst",
    timeline: [
      { date: "Feb 2022", title: "Target screen", note: "Forty-one candidates screened down to three live targets." },
      { date: "Mar 2022", title: "Approach", note: "Warm approach to the Brightpath chair via a shared director." },
      { date: "May 2022", title: "Exclusivity", note: "Won exclusivity in return for a break fee and a firm timetable." },
      { date: "Jul 2022", title: "Signing", note: "Signed after confirmatory diligence on payor mix." },
      { date: "Aug 2022", title: "Closing", note: "Cleared with eleven site divestitures." },
    ],
  },
  {
    doc: "3.08",
    company: "Sable Rock Minerals",
    descriptor: "Copper and nickel producer",
    verb: "has agreed to be acquired by",
    counterparty: "Ferrous Global Resources",
    valueLabel: "$2.9 billion",
    year: 2021,
    category: "Defence & Recap",
    advised: "Financial advisor to the Board of Sable Rock Minerals",
    region: "Latin America",
    multiple: "7.2x EBITDA",
    duration: "4 months to signing",
    close: "Apr 2022",
    structureTitle: "Consideration",
    split: [
      { label: "Cash", pct: 65 },
      { label: "Acquirer stock", pct: 35 },
    ],
    terms: ["$52.50 per share, up from an initial $41.00 unsolicited offer", "Acquirer shares locked up for six months", "Matching right removed from the agreement"],
    role: [
      "Defended the board against an unsolicited bid that undervalued the asset base.",
      "Ran a defence valuation that showed the bid sat below the net asset value of the undeveloped reserves.",
      "Brought a rival strategic to the table, which lifted the final price 28% above the first approach.",
    ],
    team: "1 MD, 1 Director, 2 Associates, 1 Analyst",
    timeline: [
      { date: "Nov 2021", title: "Unsolicited bid", note: "Ferrous went public with a $41.00 per share offer. Board called me the same afternoon." },
      { date: "Nov 2021", title: "Defence response", note: "Rejected the offer, adopted a rights plan and published a valuation rebuttal." },
      { date: "Dec 2021", title: "Alternative interest", note: "A second strategic confirmed interest after an unprompted call from me." },
      { date: "Feb 2022", title: "Improved bid", note: "Ferrous returned at $52.50 with a larger cash component." },
      { date: "Apr 2022", title: "Closing", note: "Shareholders approved with 94% support." },
    ],
  },
  {
    doc: "3.09",
    company: "Nimbus Payments",
    descriptor: "Merchant acquiring and embedded payments",
    verb: "has been acquired by",
    counterparty: "Corvane Financial",
    valueLabel: "$1.05 billion",
    year: 2021,
    category: "Sell-side",
    advised: "Exclusive financial advisor to Nimbus Payments",
    region: "United Kingdom",
    multiple: "13.8x EBITDA",
    duration: "6 months to signing",
    close: "Oct 2021",
    structureTitle: "Consideration",
    split: [
      { label: "Cash", pct: 70 },
      { label: "Acquirer stock", pct: 30 },
    ],
    terms: ["Dual-track IPO and sale process", "Acquirer stock subject to a 12-month lock-up", "Employee equity plan fully accelerated"],
    role: [
      "Ran a dual-track: prepared the IPO prospectus while running a parallel sale.",
      "Used the IPO as the price anchor, since the credible public route made bidders sharpen their pencils.",
      "Advised the board on the pivot to M&A when public markets wobbled in the third quarter.",
    ],
    team: "1 MD, 1 VP, 2 Associates, 2 Analysts",
    timeline: [
      { date: "Apr 2021", title: "Mandate", note: "Dual-track mandate: IPO on the LSE, or a trade sale." },
      { date: "Jun 2021", title: "Analyst presentation", note: "Equity research analysts briefed. Public valuation range set." },
      { date: "Aug 2021", title: "Sale bids", note: "Four trade bids and one sponsor bid arrived ahead of the IPO launch." },
      { date: "Sep 2021", title: "Switch to M&A", note: "Public markets wobbled. Board chose the sale." },
      { date: "Oct 2021", title: "Signing", note: "Signed with Corvane at a 15% premium to the IPO midpoint." },
    ],
  },
];

export type Codename = {
  doc: string;
  name: string;
  sector: string;
  mandate: string;
  size: string;
  status: string;
  live?: boolean;
};

export const codenames: Codename[] = [
  { doc: "5.01", name: "Project Halcyon", sector: "Pan-European specialty chemicals producer", mandate: "Sell-side, PE-backed", size: "$1.1bn EV", status: "Closed 2025" },
  { doc: "5.02", name: "Project Ironbark", sector: "US timber and wood products group", mandate: "Buy-side, strategic", size: "$780m EV", status: "Closed 2024" },
  { doc: "5.03", name: "Project Kestrel", sector: "Offshore wind installation vessels", mandate: "Joint venture formation", size: "$1.6bn EV", status: "Signed" },
  { doc: "5.04", name: "Project Lodestar", sector: "Rare-earth magnet manufacturer", mandate: "Sell-side, founder-owned", size: "$520m EV", status: "In market", live: true },
  { doc: "5.05", name: "Project Marlin", sector: "Shipping container lessor", mandate: "Fairness opinion", size: "$2.2bn EV", status: "Closed 2023" },
  { doc: "5.06", name: "Project Nightjar", sector: "Grid-scale battery integrator", mandate: "Take-private, buy-side", size: "$900m EV", status: "Mandate won", live: true },
  { doc: "5.07", name: "Project Obsidian", sector: "Industrial gases distributor", mandate: "Defence advisory", size: "$3.4bn EV", status: "Closed 2022" },
  { doc: "5.08", name: "Project Paragon", sector: "Water treatment technology group", mandate: "Dual-track, sale or IPO", size: "$1.3bn EV", status: "Preparing", live: true },
];

export const sections = [
  { id: "cover", num: "1.0", label: "Cover" },
  { id: "summary", num: "2.0", label: "Executive Summary" },
  { id: "transactions", num: "3.0", label: "Transactions" },
  { id: "valuation", num: "4.0", label: "Valuation Workbench" },
  { id: "codenames", num: "5.0", label: "Project Codenames" },
  { id: "process", num: "6.0", label: "Process Letter" },
  { id: "access", num: "7.0", label: "Request Access" },
];

export const stages = [
  { week: "Week 0", title: "Teaser and NDA", body: "A one-pager that sells the story without naming the company. I decide who gets the name, and in what order." },
  { week: "Week 3", title: "CIM and model", body: "The book. Every number is tied back to the model, and the model is tied back to the audited accounts. Buyers find the holes, so I do first." },
  { week: "Week 6", title: "First-round IOIs", body: "Indications of interest land. I read them for what is missing, not just the headline number." },
  { week: "Week 9", title: "Management presentations", body: "Four or five bidders get two hours with the team. I coach management on what not to say." },
  { week: "Week 12", title: "Data room opens", body: "Confirmatory diligence begins on the shortlist. The Q&A log is where deals are quietly won or lost." },
  { week: "Week 15", title: "Final bids and SPA mark-up", body: "Price is only half of it. I compare the SPA mark-ups for certainty of close, conditions and the indemnity package." },
  { week: "Week 17", title: "Signing", body: "A weekend, a conference room and a lot of coffee. Everyone signs, then everyone sleeps." },
  { week: "Week 22", title: "Closing", body: "Funds flow. The tombstone gets drawn up the same afternoon." },
];
