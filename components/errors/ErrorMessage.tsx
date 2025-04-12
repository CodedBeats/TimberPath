// dependencies
import React, {
    useImperativeHandle,
    forwardRef,
    useState,
    useCallback,
} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


// field props
type ErrorMessageProps = {
    defaultColor?: string;
    defaultFontSize?: number;
};

// func ref props
export type ErrorMessageRef = {
    show: (
        message: string,
        options?: { color?: string; fontSize?: number }
    ) => void;
    hide: () => void;
};


const ErrorMessage = forwardRef<ErrorMessageRef, ErrorMessageProps>(
    ({ defaultColor = "red", defaultFontSize = 14 }, ref) => {
        const [visible, setVisible] = useState(false);
        const [message, setMessage] = useState("");
        const [color, setColor] = useState(defaultColor);
        const [fontSize, setFontSize] = useState(defaultFontSize);

        const show = useCallback(
            (msg: string, options?: { color?: string; fontSize?: number }) => {
                setMessage(msg);
                setColor(options?.color || defaultColor);
                setFontSize(options?.fontSize || defaultFontSize);
                setVisible(true);
            },
            [defaultColor, defaultFontSize]
        );

        const hide = useCallback(() => {
            setVisible(false);
        }, []);

        useImperativeHandle(ref, () => ({ show, hide }));

        if (!visible) return null;

        return (
            <View style={styles.container}>
                <Text style={[styles.message, { color, fontSize }]}>
                    {message}
                </Text>
                <TouchableOpacity onPress={hide}>
                    <Text style={styles.close}>X</Text>
                </TouchableOpacity>
            </View>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#000",
        padding: 10,
        borderRadius: 6,
    },
    message: {
        flex: 1,
        marginRight: 10,
    },
    close: {
        color: "red",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default ErrorMessage;
