export async function addEmailToWaitlist(email: string) {
  await fetch("https://sheetdb.io/api/v1/f3gd2vjvz0qll", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [
        {
          email: email,
          date: new Date().toISOString(),
        },
      ],
    }),
  });
}
