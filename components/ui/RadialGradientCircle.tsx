import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";

const RadialGradientCircle = ({
    radius = screenWidth * 0.4,
    centerX = screenWidth / 2,
    centerY = screenHeight / 2,
    startColor = "#ffffff",
    startOpacity = 1,
    stopOpacity = 0,
    id,
}: {
    radius?: number;
    centerX?: number;
    centerY?: number;
    startColor?: string;
    startOpacity?: number;
    stopOpacity?: number;
    id: string;
}) => {

    return (
        <Svg height="100%" width="100%" style={{ position: "absolute" }}>
            <Defs>
                <RadialGradient
                    id={id}
                    cx="50%"
                    cy="50%"
                    rx="50%"
                    ry="50%"
                    fx="50%"
                    fy="50%"
                >
                    <Stop
                        offset="0%"
                        stopColor={startColor}
                        stopOpacity={startOpacity.toString()}
                    />
                    <Stop
                        offset="100%"
                        stopColor={startColor}
                        stopOpacity={stopOpacity.toString()}
                    />
                </RadialGradient>
            </Defs>
            <Circle cx={centerX} cy={centerY} r={radius} fill={`url(#${id})`} />
        </Svg>
    );
};

export default RadialGradientCircle;
