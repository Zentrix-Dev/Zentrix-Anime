// app/legal/cookie-policy/page.tsx
export default function CookiePolicyPage() {
  return (
    <>
      <h1 className="font-display font-bold text-4xl text-white mb-2">Cookie Policy</h1>
      <p className="text-text-muted text-sm mb-8">Effective Date: May 2026</p>

      <section className="space-y-6 text-text-secondary">
        <p>
          This Cookie Policy explains how ZentrixAnime uses cookies and similar technologies to recognize you 
          when you visit our website. It explains what these technologies are and why we use them, as well as 
          your rights to control our use of them.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">What are cookies?</h2>
        <p>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
          They are widely used by website owners in order to make their websites work, or to work more efficiently, 
          as well as to provide reporting information.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Why do we use cookies?</h2>
        <p>We use first-party and third-party cookies for several reasons:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Essential Cookies:</strong> Required for technical reasons in order for our site to operate (e.g., maintaining your login session).</li>
          <li><strong>Preference Cookies:</strong> Allow us to remember your choices (like dark/light mode or sub/dub preferences).</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how our site is being used so we can improve the experience.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">How can I control cookies?</h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights 
          by setting your preferences in the Cookie Consent Manager that appeared when you first visited our site. 
          If you wish to change these later, you can clear your browser's local storage and refresh the page.
        </p>
      </section>
    </>
  );
}
