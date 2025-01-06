export function AsideLogo() {
  return (
    // Main wrapper for the logo section, using flexbox with a gap of 32px between elements
    <div className="flex items-center gap-32 px-32">
      {/* Flexible container for the logo image and text, with a gap of 16px between items */}
      <div className="flex flex-1 items-center gap-16">
        {/* Logo image */}
        <img
          src="/logo.png" // Path to the logo file
          className="h-[6rem] w-[6rem]" // Logo dimensions (height and width of 6rem)
          alt="Kyros" // Alternative text for the logo
          loading="eager" // Loads the image with high priority
        />
        {/* Logo text with "Town" styled in a different color */}
        <p
          className="font-montserrat text-[3.2rem] font-semibold" // Font style, text size (3.2rem), and bold weight
          style={{ letterSpacing: '0.2rem' }} // Letter spacing set to 0.2rem
        >
          Cryp<span className="text-accent">Town</span>{' '}
          {/* "Town" highlighted with an accent color */}
        </p>
      </div>
    </div>
  )
}
