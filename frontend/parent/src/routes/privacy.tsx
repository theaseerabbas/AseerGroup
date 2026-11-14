import { createFileRoute } from "@tanstack/react-router";
import { Legal } from "@/components/site/Legal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — The Aseer Group" },
      {
        name: "description",
        content: "How The Aseer Group handles information submitted through this website.",
      },
      { property: "og:title", content: "Privacy Policy — The Aseer Group" },
      { property: "og:description", content: "Our general privacy practices for this website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <Legal
      title="Privacy Policy"
      sections={[
        [
          "Introduction",
          'This Privacy Policy explains how The Aseer Group ("we", "us") handles information collected through this website. By using the website, you acknowledge the practices described here.',
        ],
        [
          "Information you provide",
          "When you submit an enquiry through our contact form, we may receive your name, email address, phone number, organization and message. We use this information only to respond to your enquiry and to manage our relationship with you.",
        ],
        [
          "Website usage information",
          "Like most websites, our hosting providers may automatically record technical information such as your browser type, device, pages visited and approximate location. This information is used to keep the website secure and to understand how it is used.",
        ],
        [
          "Cookies",
          "This website may use essential cookies required for it to function. Where any analytics or non-essential cookies are introduced, this policy will be updated accordingly. You can control cookies through your browser settings.",
        ],
        [
          "Sharing of information",
          "We do not sell your personal information. We may share enquiry details with the relevant subsidiary of The Aseer Group where your enquiry concerns its services, or where required by applicable law.",
        ],
        [
          "Data retention & security",
          "We keep information only for as long as needed for the purposes described above and take reasonable measures to protect it. No method of transmission over the internet is completely secure.",
        ],
        [
          "Third-party websites",
          "This website links to the websites of our subsidiaries and other third parties. Those websites are governed by their own privacy policies.",
        ],
        [
          "Your choices",
          "You may ask us to access, correct or delete the personal information you have submitted by contacting us using the details on our Contact page.",
        ],
        [
          "Changes to this policy",
          "We may update this policy from time to time. The latest version will always be available on this page.",
        ],
      ]}
    />
  ),
});
