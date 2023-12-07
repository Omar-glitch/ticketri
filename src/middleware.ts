import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middelware(req) {
    // console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/tickets", "/users", "/charts"] };
