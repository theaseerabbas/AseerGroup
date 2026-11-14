import { createFileRoute } from "@tanstack/react-router";
import { Legal } from "@/components/site/Legal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | The Aseer Group" },
      { name: "description", content: "The terms governing use of The Aseer Group website." },
      { property: "og:title", content: "Terms of Use | The Aseer Group" },
      { property: "og:description", content: "General terms for using this website." },
      { property: "og:url", content: "https://theaseergroup.com/terms" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://theaseergroup.com/terms" }],
  }),
  component: () => (
    <Legal
      title="Terms of Use"
      sections={[
        [
          "Acceptance of terms",
          "By accessing or using this website, you agree to these Terms of Use. If you do not agree, please do not use the website.",
        ],
        [
          "Use of the website",
          "This website is provided for general information about The Aseer Group and its subsidiaries. You agree to use it lawfully and not to interfere with its operation or security.",
        ],
        [
          "Intellectual property",
          "All content on this website, including text, logos, graphics, and images, belongs to The Aseer Group or its licensors, unless otherwise stated. You may not reproduce or distribute it without prior written permission.",
        ],
        [
          "Information accuracy",
          "We aim to keep information accurate and current, but we make no warranties that the content is complete, error-free or up to date. Content may change without notice.",
        ],
        [
          "External websites",
          "This website contains links to the websites of our subsidiaries and third parties. Each subsidiary website is governed by its own terms. We are not responsible for the content or practices of third-party websites.",
        ],
        [
          "Limitation of responsibility",
          "To the extent permitted by law, The Aseer Group is not liable for any loss or damage arising from your use of, or reliance on, this website.",
        ],
        [
          "Enquiries",
          "Submitting an enquiry through this website does not create a contractual relationship. Any services are subject to separate agreements with the relevant business.",
        ],
        ["Governing law", "These terms are governed by the laws of Pakistan."],
        [
          "Changes to these terms",
          "We may revise these terms at any time. Continued use of the website means you accept the updated terms.",
        ],
      ]}
    />
  ),
});
