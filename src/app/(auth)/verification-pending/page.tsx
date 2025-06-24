export default async function VerificationPendingPage({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>;
}) {
  const params = await searchParams;
  const email = params.email;
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <h1 className="text-xl font-bold">
        We sent you a mail at <span className="text-accent-foreground">{email}</span>
      </h1>
      <p>Please check your inbox and verify your account.</p>
    </div>
  );
}
