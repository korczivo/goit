import passport from "passport";

export default function authMiddleware(req, res, next) {
    passport.authenticate(
        'jwt',
        {
            session: false,
        },
        (err, user) => {
            if(!user || err) {
                return res.status(401).json({ message: "Unauthorized"})
            }
            res.locals.user = user;
            next()
        }
    )(req, res, next)
}

// const foo = a => {
//     return b => {
//         return a*b;
//     }
// }
// console.log(foo(5)(10))