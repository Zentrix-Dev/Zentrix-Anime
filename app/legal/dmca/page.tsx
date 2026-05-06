// app/legal/dmca/page.tsx
export default function DMCAPage() {
  return (
    <>
      <h1 className="font-display font-bold text-4xl text-white mb-2">DMCA Disclaimer</h1>
      <p className="text-text-muted text-sm mb-8">Digital Millennium Copyright Act</p>

      <section className="space-y-6 text-text-secondary">
        <div className="bg-accent-primary/10 border-l-4 border-accent-primary p-4 rounded-r-lg mb-8">
          <p className="text-white font-bold">
            ZentrixAnime does not host any video files on its servers or network.
          </p>
        </div>

        <p>
          ZentrixAnime is an index and aggregator. We function similarly to a search engine, 
          providing an interface that parses and embeds links to content hosted on third-party 
          services (such as VidZen, VixSrc, etc.). 
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Copyright Infringement</h2>
        <p>
          Since we do not host any files, we cannot remove content from the servers where they 
          are actually hosted. If you are a copyright owner and wish to have your content removed, 
          you must contact the third-party video hosting provider directly.
        </p>
        <p>
          If you believe a link on our platform points to infringing content and wish for us to 
          remove the embed link from our database, please send an email to 
          <a href="mailto:dmca@zentrixanime.com" className="text-accent-primary hover:underline ml-1">dmca@zentrixanime.com</a> 
          containing the following information:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>The exact URL on ZentrixAnime where the embed is located.</li>
          <li>Evidence that you are the authorized copyright holder.</li>
          <li>A statement made under penalty of perjury that the information in your notice is accurate.</li>
        </ul>
        
        <p className="text-sm mt-8">
          Please allow up to 72 hours for link removal requests to be processed.
        </p>
      </section>
    </>
  );
}
