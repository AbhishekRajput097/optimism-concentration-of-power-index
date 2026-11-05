import React from "react";

interface AvatarGeneratorProps {
    address: string;
    width?: string | number;
    height?: string | number;
}

const AvatarGenerator: React.FC<AvatarGeneratorProps> = ({ address, width = "30px", height = "30px" }) => {
    const generateColorsFromName = (name: string): [string, string] => {
        const hash = name
            .split("")
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const hue = hash % 360; // Limit to 360 degrees
        return [`hsl(${hue}, 70%, 70%)`, `hsl(${(hue + 60) % 360}, 70%, 70%)`];
    };

    const [color1, color2] = generateColorsFromName(address);

    return (
        <div className="avatar-container">
            <div
                className="avatar"
                style={{
                    background: `linear-gradient(135deg, ${color1}, ${color2})`,
                    width: width,
                    height: height,
                    borderRadius: "100px",
                }}
            ></div>
        </div>
    );
}

export default AvatarGenerator;
