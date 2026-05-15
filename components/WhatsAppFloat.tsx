export default function WhatsAppFloat() {
  const href =
    "https://wa.me/923001491799?text=" +
    encodeURIComponent(
      "Hello Nexus Realty Marketing — I'd like more information about your properties."
    );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] ring-1 ring-white/20 transition-transform duration-300 hover:scale-105 hover:bg-[#1ebe57] md:bottom-6 md:right-6 md:h-16 md:w-16"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
      <svg
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="currentColor"
        className="relative drop-shadow-sm md:h-8 md:w-8"
        aria-hidden="true"
      >
        <path d="M19.11 17.27c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.61-1.47-.83-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.85.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.31zM16.02 5.33c-5.9 0-10.69 4.79-10.69 10.69 0 2.11.62 4.07 1.68 5.72L5 27.33l5.78-1.51a10.65 10.65 0 0 0 5.24 1.37c5.9 0 10.69-4.79 10.69-10.69 0-2.86-1.11-5.54-3.13-7.56a10.61 10.61 0 0 0-7.56-3.11zm0 19.55c-1.66 0-3.28-.45-4.69-1.29l-.34-.2-3.43.9.92-3.35-.22-.34a8.83 8.83 0 0 1-1.36-4.7c0-4.9 4.0-8.88 8.92-8.88 2.38 0 4.62.93 6.3 2.62a8.83 8.83 0 0 1 2.6 6.27c0 4.9-3.99 8.97-8.7 8.97z" />
      </svg>
    </a>
  );
}
