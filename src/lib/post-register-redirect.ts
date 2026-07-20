/** Where new student accounts land after registration (before payment). */
export function resolveStudentEnrollRedirect(callbackUrl: string | null): string {
  if (callbackUrl?.startsWith("/enroll")) {
    const url = new URL(callbackUrl, "http://localhost");
    url.searchParams.set("registered", "1");
    return `${url.pathname}${url.search}`;
  }
  return "/enroll?registered=1";
}

export function resolveStudentLoginFallback(callbackUrl: string | null): string {
  const params = new URLSearchParams({ registered: "1" });
  const destination = resolveStudentEnrollRedirect(callbackUrl);
  params.set("callbackUrl", destination);
  return `/login?${params.toString()}`;
}
