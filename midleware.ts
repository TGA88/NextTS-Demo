import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware"

export const config = { matcher: ["/user/user"] }


// export default withAuth(
//   function middleware(req: NextRequest) {
//     // return NextResponse
//     return NextResponse.rewrite(new URL("/index", req.url));
//   },
//   {
//     callbacks: {
//       authorized({ token }) {
//         return token?.userRole === "ADMIN";
//       },
//     },
//   }
// );

