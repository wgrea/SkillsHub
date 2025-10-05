// src/components/TermsAndPrivacy.tsx

export default function TermsAndPrivacy() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-4">Terms & Privacy</h1>
      <p className="mb-4">
        SkillsHub is provided as-is for demonstration and evaluation purposes.
        This version does not collect personal information, track user activity,
        or store data beyond what’s needed to view the site in your browser.
      </p>
      <p>
        For questions or to report an issue, please contact us at{" "}
        <a href="mailto:you@example.com" className="underline text-blue-600">
          you@example.com
        </a>.
      </p>
    </div>
  );
}
