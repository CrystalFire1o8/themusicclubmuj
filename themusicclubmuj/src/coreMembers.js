export const coreMembersByEmail = {
    "tejasbhadauria312006@gmail.com": {
        name: "Tejas Bhadauria",
        role: "General Secretary",
    },
    "udaybhanusharma13@gmail.com": {
        name: "Uday Bhanu Sharma",
        role: "President",
    },
    "tantedadit@gmail.com": {
        name: "Adit Tanted",
        role: "Vice President",
    },
    "shhoryagarwal@gmail.com": {
        name: "Shhorya Agarwal",
        role: "Treasurer",
    },
    "adityaranjanmuj@gmail.com": {
        name: "Aditya Ranjan",
        role: "Head of Events",
    },
    "agrimadwivedi4@gmail.com": {
        name: "Agrima Dwivedi",
        role: "Head of Promotions",
    },

    "divyansh.dk.kaushal@gmail.com": {
    name: "Divyansh Kaushal",
        role: "Head of Public Relations",
},
};

export function getCoreProfile(user) {
    if (!user?.email) return null;

    const email = user.email.toLowerCase();
    const profile = coreMembersByEmail[email];

    if (!profile) return null;

    return {
        email,
        ...profile,
    };
}