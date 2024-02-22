export const MENU = {
    type: "four",
    choices: [
        {
            name: "Color",
            sub: {
                type: "four",
                isSub: true,
                choices: [
                    {
                        name: "black",
                    },
                    {
                        name: "red",
                    },
                    {
                        name: "green",
                    },
                    {
                        name: "blue",
                    },
                ]
            }
        },
        {
            name: "Size",
            sub: {
                type: "circular",
            }
        },
        {
            name: "Format",
            sub: {
                type: "four",
                isSub: true,
                choices: [
                    {
                        name: "Bold",
                    },
                    {
                        name: "Italic",
                    },
                    {
                        name: "Underline",
                    },
                    {
                        name: "Strike-through",
                    },
                ]
            }
        },
        {
            name: "Style",
            sub: {
                type: "two",
                choices: [
                    {
                        name: "Title",
                    },
                    {
                        name: "Text",
                    },
                ]
            }
        },
    ]
};