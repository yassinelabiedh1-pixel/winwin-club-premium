/** Hidden from people but filled in by spam bots; the server ignores those submissions. */
export function FormHoneypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      className="absolute left-[-9999px] size-px opacity-0"
    />
  );
}
