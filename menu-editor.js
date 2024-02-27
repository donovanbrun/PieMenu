export const MENU = {
    name: "Menu",
    type: "four",
    choices: [
        {
            name: "Color",
            sub: {
                name: "Color",
                type: "four",
                isSub: true,
                choices: [
                    {
                        name: "black",
                        action: (element) => {
                            element.style.color = "black";
                        }
                    },
                    {
                        name: "red",
                        action: (element) => {
                            element.style.color = "red";
                        }
                    },
                    {
                        name: "green",
                        action: (element) => {
                            element.style.color = "green";
                        }
                    },
                    {
                        name: "blue",
                        action: (element) => {
                            element.style.color = "blue";
                        }
                    },
                ]
            }
        },
        {
            name: "Size",
            sub: {
                name: "Size",
                type: "circular",
                action: (element, value) => {
                    element.style.fontSize = Math.floor(value / 100 * 50) + "px";
                }
            }
        },
        {
            name: "Format",
            sub: {
                name: "Format",
                type: "four",
                isSub: true,
                choices: [
                    {
                        name: "Bold",
                        action: (element) => {
                            if (element.style.fontWeight == "bold") element.style.fontWeight = "normal";
                            else element.style.fontWeight = "bold";
                        }
                    },
                    {
                        name: "Italic",
                        action: (element) => {
                            if (element.style.fontStyle == "italic") element.style.fontStyle = "normal";
                            else element.style.fontStyle = "italic";
                        }
                    },
                    {
                        name: "Underline",
                        action: (element) => {
                            if (element.style.textDecoration == "underline") element.style.textDecoration = "none";
                            else element.style.textDecoration = "underline";
                        }
                    },
                    {
                        name: "Strike-through",
                        action: (element) => {
                            if (element.style.textDecoration == "line-through") element.style.textDecoration = "none";
                            else element.style.textDecoration = "line-through";
                        }
                    },
                ]
            }
        },
        {
            name: "Style",
            sub: {
                name: "Style",
                type: "two",
                choices: [
                    {
                        name: "Title",
                        action: (element) => {
                            element.style.fontWeight = "bold";
                            element.style.fontSize = "2em";
                        }
                    },
                    {
                        name: "Text",
                        action: (element) => {
                            element.style.fontWeight = "normal";
                            element.style.fontSize = "1em";
                        }
                    },
                ]
            }
        },
    ]
};