// app/legal/terms-of-service/page.tsx
export default function TermsOfServicePage() {
  return (
    <>
      <h1 className="font-display font-bold text-4xl text-white mb-2">Terms of Service</h1>
      <p className="text-text-muted text-sm mb-8">Effective Date: May 2026</p>

      <section className="space-y-6 text-text-secondary">
        <p>
          By accessing or using ZentrixAnime, you agree to be bound by these Terms of Service. 
          If you disagree with any part of the terms, you may not access the service.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Description of Service</h2>
        <p>
          ZentrixAnime is a media tracking and streaming aggregator platform. We provide an interface 
          to track anime progress via the AniList API and embed video content hosted by third-party 
          servers. We do not host, upload, or manage any of the video files on our own servers.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. User Accounts</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You are responsible for safeguarding the password that you use to access the service.</li>
          <li>You agree not to disclose your password to any third party.</li>
          <li>We reserve the right to terminate accounts that violate our community guidelines or terms.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Intellectual Property</h2>
        <p>
          The original UI, design, and code of ZentrixAnime are the property of ZentrixAnime. 
          Anime metadata, images, and synopses are provided by the AniList API. Video content 
          belongs to their respective copyright holders.
        </p>
      </section>
    </>
  );
}
