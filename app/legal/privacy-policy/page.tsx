// app/legal/privacy-policy/page.tsx
export default function PrivacyPolicyPage() {
  return (
    <>
      <h1 className="font-display font-bold text-4xl text-white mb-2">Privacy Policy</h1>
      <p className="text-text-muted text-sm mb-8">Last updated: May 6, 2026</p>

      <section className="space-y-6 text-text-secondary">
        <p>
          Welcome to ZentrixAnime. We respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you as to how we look after your personal data when you visit our website 
          and tell you about your privacy rights.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
        <p>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Identity Data:</strong> includes username, and profile picture (if linked via OAuth).</li>
          <li><strong>Contact Data:</strong> includes email address.</li>
          <li><strong>Usage Data:</strong> includes information about how you use our website, such as your watch history and saved lists.</li>
          <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting, and operating system.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Your Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide and maintain our service, including syncing your watch progress across devices.</li>
          <li>To notify you about changes to our service.</li>
          <li>To provide customer support.</li>
          <li>To gather analysis or valuable information so that we can improve our service.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
          used, or accessed in an unauthorized way, altered, or disclosed. Passwords are cryptographically hashed, and 
          sessions are secured via encrypted JWTs.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Third-Party Links</h2>
        <p>
          This website may include links to third-party websites, plug-ins, and applications (such as video embedding servers). 
          Clicking on those links or enabling those connections may allow third parties to collect or share data about you. 
          We do not control these third-party websites and are not responsible for their privacy statements.
        </p>

        <hr className="my-8 border-border-subtle" />

        <p className="text-sm">
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@zentrixanime.com" className="text-accent-primary hover:underline">privacy@zentrixanime.com</a>.
        </p>
      </section>
    </>
  );
}
