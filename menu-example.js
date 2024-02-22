export const MENU = {
    type: "four",
    choices: [
        {
            name: "a",
        },
        {
            name: "two",
            sub: {
                type: "two",
                choices: [
                    {
                        name: "1",
                    },
                    {
                        name: "2",
                    },
                ]
            }
        },
        {
            name: "sub",
            sub: {
                type: "four",
                isSub: true,
                choices: [
                    {
                        name: "i",
                    },
                    {
                        name: "j",
                    },
                    {
                        name: "k",
                    },
                    {
                        name: "l",
                    },
                ]
            }
        },
        {
            name: "four",
            sub: {
                type: "four",
                choices: [
                    {
                        name: "e",
                    },
                    {
                        name: "f",
                    },
                    {
                        name: "g",
                    },
                    {
                        name: "h",
                    },
                ]
            }
        },
    ]
};