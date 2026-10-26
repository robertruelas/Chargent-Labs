// The packages featured on the site. Add a new Labs package by appending to this list.
// Leave installUrl empty until a package's install link is ready; the card then shows "Install link coming soon".

export type Illustration = "ledger" | "invoice" | "updater";

export interface LabPackage {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  highlights: string[];
  worksWith: string[];
  goodFor: string;
  illustration: Illustration;
  installUrl: string;
  docsUrl: string;
}

export const packages: LabPackage[] = [
  {
    id: "LAB-001",
    name: "Accounting Seed Integration",
    tagline: "Get payments collected in Chargent into your Accounting Seed ledger.",
    summary:
      "Connects Chargent transactions to Accounting Seed so the payments you take in Salesforce show up where finance closes the books, without re-keying them.",
    highlights: [
      "Maps successful Chargent transactions to Accounting Seed records",
      "Keeps billing and payment status in step across both apps",
      "Cuts the manual reconciliation between collections and accounting",
    ],
    worksWith: ["Chargent", "Accounting Seed"],
    goodFor: "Finance teams that collect with Chargent and close the books in Accounting Seed.",
    illustration: "ledger",
    installUrl: "",
    docsUrl: "",
  },
  {
    id: "LAB-002",
    name: "PDF Invoices for Opportunities",
    tagline: "Turn an Opportunity into a clean PDF invoice in one click.",
    summary:
      "Generates a PDF invoice from an Opportunity and its products, so sales and billing teams can send a professional invoice straight from Salesforce.",
    highlights: [
      "Builds the invoice from the Opportunity and its line items",
      "Saves the PDF back to the record for a clear audit trail",
      "Unmanaged, so you can restyle the template to match your brand",
    ],
    worksWith: ["Chargent", "Opportunities"],
    goodFor: "Teams that sell on Opportunities and need an invoice before the payment is collected.",
    illustration: "invoice",
    installUrl: "",
    docsUrl: "",
  },
  {
    id: "LAB-003",
    name: "Vantiv Account Updater",
    tagline: "Keep cards on file current so recurring payments don't fail.",
    summary:
      "Uses the Vantiv (Worldpay) Account Updater service to refresh stored card details when a customer's card is reissued or expires, before the next scheduled charge runs.",
    highlights: [
      "Updates expired and reissued card numbers and expiration dates",
      "Reduces declines on recurring and scheduled Chargent payments",
      "Leaves a record of each update for your payments team",
    ],
    worksWith: ["Chargent", "Vantiv / Worldpay"],
    goodFor: "Subscription and installment businesses processing through Vantiv.",
    illustration: "updater",
    installUrl: "",
    docsUrl: "",
  },
];
